import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getDatabase,onValue, child, get, set, update, remove, onChildAdded } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getStorage, ref, uploadBytes , getDownloadURL } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

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
const auth = getAuth();
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.getElementById("upload");
    const errorMsgElement = document.getElementById('errorMsg');

    uploadButton.addEventListener("click", () => {
        const file = document.querySelector("#photo").files[0];
        const name = +new Date() + "-" + file.name;
        const metadata = {
            contentType: file.type
        };
        const storageRef = ref(storage, name);

        uploadBytes(storageRef, file, metadata)
            .then(uploadTaskSnapshot => getDownloadURL(uploadTaskSnapshot.ref))
            .then(url => {
                console.log(url);
                alert('Image uploaded successfully');
                document.querySelector("#image").src = url;
            })
            .catch(error => {
                console.error(error);
                errorMsgElement.textContent = 'Error uploading image.';
            });
    });
});