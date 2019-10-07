/* eslint-disable max-len */
const { execSync } = require('child_process');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

const version = process.argv[2];
const semverRegex = /(?<=^[Vv]|^)(?:(?<major>(?:0|[1-9](?:(?:0|[1-9])+)*))[.](?<minor>(?:0|[1-9](?:(?:0|[1-9])+)*))[.](?<patch>(?:0|[1-9](?:(?:0|[1-9])+)*))(?:-(?<prerelease>(?:(?:(?:[A-Za-z]|-)(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)?|(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)(?:[A-Za-z]|-)(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)?)|(?:0|[1-9](?:(?:0|[1-9])+)*))(?:[.](?:(?:(?:[A-Za-z]|-)(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)?|(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)(?:[A-Za-z]|-)(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)?)|(?:0|[1-9](?:(?:0|[1-9])+)*)))*))?(?:[+](?<build>(?:(?:(?:[A-Za-z]|-)(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)?|(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)(?:[A-Za-z]|-)(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)?)|(?:(?:0|[1-9])+))(?:[.](?:(?:(?:[A-Za-z]|-)(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)?|(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)(?:[A-Za-z]|-)(?:(?:(?:0|[1-9])|(?:[A-Za-z]|-))+)?)|(?:(?:0|[1-9])+)))*))?)$/;

if (!version) {
  process.exit();
}

if (!version.match(semverRegex)) {
  console.error('Please enter a semantic version (e.g. 1.0.0).');
  process.exit();
}

const srcPath = path.resolve(__dirname, '../src/', 'fabric-canvas-mixin.js');
let srcString = readFileSync(srcPath, 'utf8');
const replaceRegex = /get version.*?'(\d.\d.\d)';/s;
const matches = replaceRegex.exec(srcString);
srcString = srcString.replace(matches[0], matches[0].replace(matches[1], version));
writeFileSync(srcPath, srcString);

execSync(`git commit -a -m "Update src version: ${matches[1]} -> ${version}"`);
execSync(`npm version ${version}`);
execSync('git push');
execSync('npm publish --access public');
