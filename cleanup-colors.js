const fs = require('fs');
const path = require('path');

const targetDirs = [
  'src/app',
  'src/components'
];

function cleanColors(content) {
  // Regex to match text color utility classes we want to remove from headings
  const toRemove = [
    /\btext-gray-900\b/g,
    /\btext-gray-800\b/g,
    /\btext-brand-dark\b/g,
    /\btext-black\b/g
  ];

  let newContent = content;

  // Only apply to h1..h6 tags
  const tagRegex = /<(h[1-6])\b([^>]*?)className=["']([^"']*)["']([^>]*)>/gi;
  
  newContent = newContent.replace(tagRegex, (match, tag, before, classNames, after) => {
    let newClassNames = classNames;
    toRemove.forEach(regex => {
      newClassNames = newClassNames.replace(regex, '');
    });
    // clean up extra spaces
    newClassNames = newClassNames.replace(/\s+/g, ' ').trim();
    
    return `<${tag}${before}className="${newClassNames}"${after}>`;
  });

  return newContent;
}

function processDir(dir) {
  const fullDir = path.resolve('c:/Users/heman/Desktop/Hemang Projects/periodtracker-website-next-main (1)/periodtracker-website-next-main', dir);
  if (!fs.existsSync(fullDir)) return;
  
  const files = fs.readdirSync(fullDir);
  files.forEach(file => {
    const fullPath = path.join(fullDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(path.join(dir, file));
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const updated = cleanColors(content);
      if (content !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log('Cleaned colors in:', fullPath);
      }
    }
  });
}

targetDirs.forEach(processDir);
console.log('Color cleanup complete.');
