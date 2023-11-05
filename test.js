import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { readFile } from 'fs/promises'; // Use 'fs/promises' for asynchronous file operations

const firebaseConfig = {
  apiKey: "AIzaSyAPs6u-21i0E9mxGXWhdlFiCKpkuhrPpBc",
  authDomain: "test-ab03a.firebaseapp.com",
  databaseURL: "https://test-ab03a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-ab03a",
  storageBucket: "test-ab03a.appspot.com",
  messagingSenderId: "19444872261",
  appId: "1:19444872261:web:69de8c91e006b58aa8df2c"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function readAndWriteData() {
  try {
    const data = await readFile('./course_data.json', 'utf8');
    const jsonData = JSON.parse(data);

    for (const item of jsonData) {
      const title = item.title.replace("\nنظري - محاضرة", " ");
      const source_code = item.source_code;
      const code = item.code;
      const teacher = item.teacher;
      const free = item.free;

      await set(ref(database, `/schedule/${source_code}`), {
        title: title,
        source_code: source_code,
        code: code,
        teacher: teacher,
        free: free,
      });
    }

    console.log("done !!!");
  } catch (err) {
    console.error('Error reading or writing data:', err);
  }
}

readAndWriteData();
