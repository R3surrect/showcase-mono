import fs from 'node:fs';
import path from 'node:path';

let cssContent = `/*
    * This file was automatically generated.
    * Any modifications will be lost the next time the file is regenerated.
    * */\n`;

let successCounter = 0;
let failsCounter = 0;

const themesDir = path.resolve('themes');
const outputFile = path.resolve('src/global/styles/_variables.css');

const themeFiles = fs.readdirSync(themesDir);

themeFiles.forEach(file => {
    if (!file.endsWith('.json')) {
        console.log(`${file} skipped`);
        return;
    }
    try {
        const themeName = path.basename(file, '.json');
        const json = JSON.parse(fs.readFileSync(path.join(themesDir, file), 'utf-8'));

        cssContent += `.theme-${themeName} {\n`

        for (const [key, val] of Object.entries(json)) {
            cssContent += `  --theme-${key}: ${val};\n`
        }

        cssContent += `}\n\n`
        successCounter++;
        console.error(`[⛅]: Theme ${file} loaded succesfully;`)
    } catch (e) {
        failsCounter++;
        console.error(`[🌩]: Theme ${file} has wrong syntax;`, e)
    }
});

fs.writeFileSync(outputFile, cssContent, 'utf-8');
if (successCounter > 0) console.log(`\n🎨 [✔]: ${successCounter} themes loaded succesfully!`);
if (failsCounter > 0) console.log(`\n🎨 [⚡]: ${failsCounter} themes doesn't load correctly. Please, check !`);
if (successCounter === 0 && failsCounter === 0) console.log(`\n🎨 [❔]: No themes provided at '${themesDir}' folder`);

/* A.e.:
 * file light.json at folder project/themes/... like 
 * 
 * {
 *  "bg-main": "#121212",
 *  "text-main": "#ffffff",
 *  "accent": "#f59e0b"
 * }
 *
 * or dark.json
 * 
 * {
 *  "bg-main": "#ffffff",
 *  "text-main": "#1a1a1a",
 *  "accent": "#d97706"
 * }
 * 
 * will generate the next content:

/*
    *   This file was automatically generated.
    *   Any modifications will be lost the next time the file is regenerated.
*/

/*
*   .theme-dark {
*     --theme-bg-main: #121212;
*     --theme-text-main: #ffffff;
*     --theme-accent: #f59e0b;
*   }

*   .theme-light {
*     --theme-bg-main: #ffffff;
*     --theme-text-main: #1a1a1a;
*     --theme-accent: #d97706;
*   }
* ******************************/