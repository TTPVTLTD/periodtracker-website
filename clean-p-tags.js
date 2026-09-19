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
    
    // Process <p className="..."> to strip font sizes
    // We want to remove text-xs, text-sm, text-lg, text-xl, etc.
    // but text-base is fine (it is 16px).
    content = content.replace(/<p\s+[^>]*className=(["'{][^>]*["'}])/g, (match) => {
      // We matched the <p opening tag and the className attribute
      let newMatch = match.replace(/\btext-(xs|sm|lg|xl|2xl|3xl|4xl|5xl|6xl)\b/g, '');
      newMatch = newMatch.replace(/\b(sm|md|lg|xl|2xl):text-[a-z0-9]+\b/g, '');
      newMatch = newMatch.replace(/\s{2,}/g, ' ');
      return newMatch;
    });
    
    if(initial !== content) {
      fs.writeFileSync(filePath, content);
      modifiedFiles.push(filePath);
    }
  }
});

console.log('Modified files:', modifiedFiles.length);
modifiedFiles.forEach(f => console.log(' - ' + f));
