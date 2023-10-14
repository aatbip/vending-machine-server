const fs = require('fs');
const path = require('path');


const sourceDir = path.resolve(__dirname, 'state');
const targetDir = path.resolve(__dirname, 'dist', 'state');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
fs.readdirSync(sourceDir).forEach((file) => {
  const sourceFile = path.join(sourceDir, file);
  const targetFile = path.join(targetDir, file);
  fs.copyFileSync(sourceFile, targetFile);
});



