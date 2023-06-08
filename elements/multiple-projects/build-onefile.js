const fs = require('fs');
const concat = require('concat');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const appName = argv.app;
const destinationDir = '../../front/src/elements';
(async function build() {
    const files = [
        `./dist/${appName}/runtime.js`,
        `./dist/${appName}/main.js`
    ]
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir);
    }
    await concat(files, `${destinationDir}/${appName}.js`);

})(() => true, () => true)
