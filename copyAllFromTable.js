const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const wb = new ExcelJS.Workbook();

const pathToTable = 'Translations.xlsx';
const game = 'pridefight'
const vendor = 'instant'
const sheetIndex = 2; // insert here the index of the needed sheet starting with 0
const translationsPath = path.join(__dirname, `../evoplay/games/${vendor}/${game}/components/game/resources/translations/`)

wb.xlsx.readFile(pathToTable).then(recordKeys).catch(err => {
    console.log(err.message);
});


function recordKeys() {
    const ws = wb.worksheets[sheetIndex];
    const languagesRow =  ws.getRow(1);
    const keys = {}
    
    ws.eachRow((r, i) => {
      if (!/[A-Z]+_[A-Z]+/.test(r.getCell(1).text)) return;
      let key = '';
      r.eachCell((cell, i) => {
        if (i === 1) {
          keys[cell.text] = {}
          key = cell.text;
        } 
        else {
          let text = cell.text;
          if (typeof text === 'object') {
            text = Object.values(cell.text)[0][0].text
          }
          const lang = languagesRow.getCell(i).text;
          keys[key][lang] = text
        }
      })
    })

    writeKeys(keys)
}

function writeKeys(keys) {
  const trans_files = fs.readdirSync(translationsPath)

  Object.entries(keys).forEach(([key, translations]) => {
    for (const entry of Object.entries(translations)) {
      const [lang, translation] = entry;
      const fileName = trans_files.find(fileName => fileName.match(/_(\w+)\.json/)[1] === lang);
      if (!fileName) return;
      const filePath = path.join(translationsPath, fileName);
      const data = fs.readFileSync(filePath);
      const object = JSON.parse(data, 'utf8');
      object[key] = translation;
      fs.writeFileSync(filePath, JSON.stringify(object, null, 2));
    }
  })
  
}
