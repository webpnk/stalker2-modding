import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function replaceInFile(filePath, arg1, arg2) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const regex = new RegExp(arg1, 'g');
    const newContent = content.replace(regex, arg2);

    fs.writeFileSync(filePath, newContent, 'utf-8');
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else if (path.extname(f) === '.html' || path.extname(f) === '.js') {
            callback(path.join(dir, f));
        }
    });
}

function main() {
    const [,, arg1, arg2] = process.argv;

    if (!arg1 || !arg2) {
        console.error('Please provide both arguments: urlToReplace and urlReplacement.');
        process.exit(1);
    }

    const directoryToProcess = path.resolve(__dirname, 'dist/'); // Change this to your directory

    walkDir(directoryToProcess, (filePath) => {
        console.log(`Processing file: ${filePath}`);
        replaceInFile(filePath, arg1, arg2);
    });
}

main();
