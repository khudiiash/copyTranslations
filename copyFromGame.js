const fs = require('fs');
const path = require('path');

const fromGame = 'penaltyseries';    // set game to copy from
const toGame = 'pridefight';    // set game to copy into

const fromVendor = 'instant'; //  set the vendor to copy from
const toVendor = 'instant'; //  set the vendor to copy into

const fromPath = path.join(__dirname, `../evoplay/games/${fromVendor}/${fromGame}/components/game/resources/translations/`)
const toPath = path.join(__dirname, `../evoplay/games/${toVendor}/${toGame}/components/game/resources/translations/`)


const keysToCopy = [
  // add your keys
]

function writeKeys() {
  const [fromFiles, toFiles] = [fs.readdirSync(fromPath),fs.readdirSync(toPath)];

  fromFiles.forEach(fileName => {
    const fromFilePath = path.join(fromPath, fileName);
    const fromObject = JSON.parse(fs.readFileSync(fromFilePath, 'utf8'));
    
    const toFile = toFiles.find(file => file === fileName);
    if (!toFile) return;
    const toFilePath = path.join(toPath, fileName);
    const toObject = JSON.parse(fs.readFileSync(toFilePath, 'utf8'));
    
    Object.entries(fromObject).map(([key, value]) => {
      if (!keysToCopy.includes(key)) return;
      toObject[key] = value;
    })

    fs.writeFileSync(toFilePath, JSON.stringify(toObject, '', 2));
  })
}

writeKeys();
