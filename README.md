# copyTranslations

1. clone the project to the same folder where the root evoplay folder is.
2. cd to project
3. `npm install`

**Copying ALL keys from your own table**
- replace the table in the root folder with your own
- open `copyAllFromTable.js` file
- edit `game`, `vendor`, and `pathToTable` (if needed) variables
- save changes
- run `npm run copyAllFromTable`

**Copying some keys from the main table (containing all general keys)**
- open `copySomeFromTable.js` file
- edit `game`, `vendor`, `keysToCopy` variables
- save changes
- run `npm run copySomeFromTable`

**Copying some keys from another game**
- open `copyFromGame.js` file
- edit `fromGame`, `fromVendor`, `toGame`, `toVendor`, `keysToCopy` variables
- save changes
- run `npm run copyFromGame`

Thank you!
