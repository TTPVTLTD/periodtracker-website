const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedFiles = [];

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    const initial = content;
    
    // Process only className="..."
    content = content.replace(/className="([^"]+)"/g, (match, classes) => {
      // Remove large text sizes that override headings
      let updated = classes.replace(/\btext-(2xl|3xl|4xl|5xl|6xl|7xl|8xl)\b/g, '');
      updated = updated.replace(/\b(sm|md|lg|xl|2xl):text-[a-z0-9]+\b/g, '');
      
      // We deliberately preserve text-sm, text-base, text-lg if they don't have a breakpoint prefix
      // because we used text-sm for card descriptions and text-base for legal pages.

      // Clean up extra spaces
      updated = updated.replace(/\s{2,}/g, ' ').trim();
      return `className="${updated}"`;
    });
    
    if(initial !== content) {
      fs.writeFileSync(filePath, content);
      modifiedFiles.push(filePath);
    }
  }
});

console.log('Modified files:', modifiedFiles.length);
modifiedFiles.forEach(f => console.log(' - ' + f));
