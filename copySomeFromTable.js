const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const wb = new ExcelJS.Workbook();

const pathToTable = 'Localization.xlsx';
const game = 'magicchests';    // set your game name
const vendor = 'instant'; //  set the vendor

const translationsPath = path.join(__dirname, `../evoplay/games/${vendor}/${game}/components/game/resources/translations/`)

wb.xlsx.readFile(pathToTable).then(recordKeys).catch(err => {
  console.log(err.message);
});

const keysToCopy = [
  // add your keys
  'GAME_VERSION_TXT',
  'PLAY_TXT'

]

function recordKeys() {
    const ws = wb.worksheets[0];
    const keysCol = ws.getColumn(1);
    const languagesRow =  ws.getRow(1);
    const langs = []
    const keys = {}

    languagesRow.eachCell(cell=> {
      if (!cell.value || cell.value === 'Key') return;
      keys[cell.value] = {}
      langs.push(cell.value)
    })

    keysCol.eachCell((cell, r) => {
      if (cell.value && keysToCopy.includes(cell.value)) {
        const languagesRow = ws.getRow(r);
        const key = cell.value;

        keys[key] = {}
        languagesRow.eachCell((cell, c) => {
          if (c === 1 || !cell.value) return;
          keys[langs[c - 3]][key] = cell.value;
        })
      }
    }); 
    writeKeys(keys)
}

function writeKeys(keys) {
  const trans_files = fs.readdirSync(translationsPath)

  trans_files.forEach(fileName => {
    const filePath = path.join(translationsPath, fileName);
    
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      
      const lang = fileName.match(/_(\w+)\.json/)[1];
      const object = JSON.parse(data, 'utf8');
      
      if (lang in keys) {
        Object.entries(keys[lang]).forEach(([key, value]) => {
          object[key] = value;
        })
      }

      fs.writeFileSync(filePath, JSON.stringify(object, '', 2));
    });
  })
  
}