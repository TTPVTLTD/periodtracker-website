const fs = require('fs');
const path = require('path');

const targetDirs = [
  'src/app',
  'src/components'
];

function cleanClasses(content) {
  const toRemove = [
    /\b(!)?text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)\b/g,
    /\bsm:text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)\b/g,
    /\bmd:text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)\b/g,
    /\blg:text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)\b/g,
    /\bfont-(bold|black|semibold|normal)\b/g,
    /\btracking-(tight|wide|wider|normal)\b/g,
    /\bfont-heading\b/g,
    /\bfont-sans\b/g,
  ];

  let newContent = content;

  // This regex matches <h1...h6 and <p elements that have a className attribute.
  // It captures the parts of the className string.
  // Since JSX can have className={...} or className="...", we'll handle standard string classNames.
  const tagRegex = /<(h[1-6]|p)\b([^>]*?)className=["']([^"']*)["']([^>]*)>/gi;
  
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
      const updated = cleanClasses(content);
      if (content !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log('Cleaned:', fullPath);
      }
    }
  });
}

targetDirs.forEach(processDir);
console.log('Cleanup complete.');
