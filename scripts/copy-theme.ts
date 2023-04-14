import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const { THEME } = process.env;

const themeFile = `${THEME}.scss`;

const THEME_FOLDER = path.resolve(__dirname, '../src/styles');

const SOURCE_THEME = `${THEME_FOLDER}/${themeFile}`;
const DESTINATION_THEME = `${THEME_FOLDER}/theme.scss`;

const copyTheme = async () => {
  if (!THEME) {
    console.error('THEME environment variable is not set');
    return;
  }
  fs.copyFile(SOURCE_THEME, DESTINATION_THEME, err => {
    if (err) throw err;
    console.log(`Theme ${THEME} copied ok.`);
  });
};

copyTheme();
