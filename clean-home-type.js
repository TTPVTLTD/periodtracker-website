const fs = require('fs');
const files = [
  'src/components/home/WhatYouCanDo.jsx',
  'src/components/home/WhyChooseUs.jsx',
  'src/components/home/MissionBanner.jsx',
  'src/components/home/Testimonials.jsx',
  'src/components/home/ExpertAnswers.jsx',
  'src/components/Hero.jsx'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    const initial = content;
    
    // Process only className="..."
    content = content.replace(/className="([^"]+)"/g, (match, classes) => {
      let updated = classes.replace(/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)\b/g, '');
      updated = updated.replace(/\bsm:text-[a-z0-9]+\b/g, '');
      updated = updated.replace(/\bmd:text-[a-z0-9]+\b/g, '');
      updated = updated.replace(/\blg:text-[a-z0-9]+\b/g, '');
      updated = updated.replace(/\bxl:text-[a-z0-9]+\b/g, '');
      updated = updated.replace(/\s{2,}/g, ' ').trim();
      return `className="${updated}"`;
    });
    
    if(initial !== content) {
      fs.writeFileSync(f, content);
      console.log('Cleaned', f);
    }
  }
});
