const fs = require('fs');
const path = require('path');

function listDirectory(dirPath, level = 0) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    files.forEach(file => {
        let prefix = ' '.repeat(level * 4); // Indentation for readability
        if (file.isDirectory() && file.name !== '.next' && file.name !== 'example' && file.name !== 'node_modules' && file.name !== '.git' && file.name !== 'etc') {
            console.log(`${prefix}+ ${file.name}/`);
            listDirectory(path.join(dirPath, file.name), level + 1);
        } else if (!file.isDirectory()) {
            console.log(`${prefix}- ${file.name}`);
        }
    });
}

// Replace this with the path to your 'scripts-kroma' directory
const repoPath = '/Users/abito/Documents/GitHub/scripts-kroma';
listDirectory(repoPath);
