const fs = require('fs');
const path = require('path');

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          if (file.includes('node_modules') || file.includes('.git')) {
            if (!--pending) done(null, results);
            return;
          }
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (file.match(/\.(tsx?|html|css|json|md)$/)) {
            results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

walk('.', function(err, results) {
  if (err) throw err;
  results.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Explicit urls
    content = content.replace(/jugarmaspadel\.es/g, 'jugarmaspickleball.es');
    content = content.replace(/jugarmaspadel\.com/g, 'jugarmaspickleball.com');
    // Words
    content = content.replace(/jugarmaspadel/gi, 'jugarmaspickleball');
    
    // App name
    content = content.replace(/Radical Padel/gi, 'APP Radical');
    
    // Padel -> Pickleball
    content = content.replace(/Pádel/g, 'Pickleball');
    content = content.replace(/pádel/g, 'pickleball');
    content = content.replace(/PADEL/g, 'PICKLEBALL');
    content = content.replace(/Padel/g, 'Pickleball');
    content = content.replace(/padel/g, 'pickleball');
    
    // Colors
    content = content.replace(/#CCFF00/gi, '#38BDF8');
    content = content.replace(/#1A2E05/gi, '#0F172A');
    content = content.replace(/#4D6600/gi, '#334155');
    content = content.replace(/#2D3B00/gi, '#1E293B');

    // Remove temp file
    if (!file.includes('temp-replace.js')) {
      fs.writeFileSync(file, content, 'utf8');
    }
  });
  console.log('Replaced in ' + results.length + ' files.');
});
