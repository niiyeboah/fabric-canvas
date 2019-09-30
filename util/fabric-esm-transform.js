const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const fabricPath = path.resolve(__dirname, '../node_modules/fabric/dist/', 'fabric.js');
const outputPath = path.resolve(__dirname, '../src/lib/', 'fabric.esm.js');
let fabricString = readFileSync(fabricPath, 'utf8');
[
  /if \(typeof exports.*(if \(document.*?window;).*DOMParser;\n}/s,
  /\(function\(global\)/g,
  /\}\)\(typeof.*this/g,
  /if \(typeof.*?exports.fabric.*?}/s,
  /window.fabric = fabric;/s,
  /global \|\|/,
  /fabric.*?= global\.fabric.*?,\n?/g,
  /var fabric = global\.fabric.*;/g,
  /if \(!global.fabric\) {.*?return;.*?}/s
].forEach((regex, i) => {
  switch (i) {
    case 0: {
      const matches = regex.exec(fabricString);
      fabricString = fabricString.replace(matches[0], matches[1]);
      break;
    }
    case 1:
      replace(regex, 'global', 'fabric');
      break;
    case 2:
      replace(regex, /typeof.*this/, 'fabric');
      break;
    default:
      replace(regex, regex, '');
      break;
  }
});

fabricString += 'export default fabric;\n';

writeFileSync(outputPath, fabricString);

function replace(regex, oldVal, newVal) {
  let matches;
  while ((matches = regex.exec(fabricString)) !== null) {
    fabricString = fabricString.replace(matches[0], matches[0].replace(oldVal, newVal));
  }
}
