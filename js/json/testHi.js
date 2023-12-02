const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'IS_444.json');

try {
  // Read the JSON file synchronously
  const data = fs.readFileSync(filePath, 'utf8');
  
} catch (error) {
  console.error('Error reading or parsing the file:', error);
}
