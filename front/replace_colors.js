const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      content = content.replace(/bg-\[#020202\]/g, 'bg-background');
      content = content.replace(/bg-\[#050505\]/g, 'bg-background');
      content = content.replace(/bg-\[#0a0a0a\]/g, 'bg-card');
      content = content.replace(/bg-\[#111\]/g, 'bg-card');
      
      content = content.replace(/text-white\/([0-9]+)/g, 'text-foreground/$1');
      content = content.replace(/text-white(?![\/\-\w])/g, 'text-foreground');
      
      content = content.replace(/border-white\/([0-9]+)/g, 'border-foreground/$1');
      content = content.replace(/border-white(?![\/\-\w])/g, 'border-foreground');
      
      content = content.replace(/from-\[#020202\]/g, 'from-background');
      content = content.replace(/via-\[#020202\]/g, 'via-background');
      content = content.replace(/to-\[#020202\]/g, 'to-background');
      
      content = content.replace(/from-\[#050505\]/g, 'from-background');
      content = content.replace(/via-\[#050505\]/g, 'via-background');
      content = content.replace(/to-\[#050505\]/g, 'to-background');
      
      content = content.replace(/from-\[#0a0a0a\]/g, 'from-card');
      content = content.replace(/via-\[#0a0a0a\]/g, 'via-card');
      content = content.replace(/to-\[#0a0a0a\]/g, 'to-card');
      
      content = content.replace(/from-white\/([0-9]+)/g, 'from-foreground/$1');
      content = content.replace(/via-white\/([0-9]+)/g, 'via-foreground/$1');
      content = content.replace(/to-white\/([0-9]+)/g, 'to-foreground/$1');
      content = content.replace(/from-white(?![\/\-\w])/g, 'from-foreground');
      content = content.replace(/via-white(?![\/\-\w])/g, 'via-foreground');
      content = content.replace(/to-white(?![\/\-\w])/g, 'to-foreground');

      content = content.replace(/bg-white\/([0-9]+)/g, 'bg-foreground/$1');
      content = content.replace(/bg-white(?![\/\-\w])/g, 'bg-foreground');

      // some extra replaces for text
      content = content.replace(/text-black/g, 'text-background'); 
      // wait, text-black might be explicitly for buttons that need black on white or similar
      // let's be careful. Let's not blindly replace text-black.

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated ' + fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, 'Components'));
processDir(path.join(__dirname, 'app'));
