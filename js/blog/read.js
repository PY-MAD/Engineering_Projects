import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getDatabase,onValue, child, get, set, update, remove, onChildAdded,ref } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
let liCheck = document.querySelectorAll("aside div")
let name = "جافا 1";
let id = "java-1"
let section = document.querySelectorAll(`#section${id} .card-continer`);
let title = document.querySelector("#title")
let pra = document.querySelector("#pra")
liCheck.forEach((item)=>{
    item.addEventListener("click", ()=>{
                id = item.id
                name = item.textContent;
                item.classList.remove("unactive-Section")
                document.querySelector("#sectionContent").classList.add("unactive-Section")
    })
})
setInterval(() => {
    section = document.querySelectorAll(`#section${id} .card-continer`)
    section.forEach((item)=>{
        item.addEventListener("click",()=>{
            let idCard = item.id;
            get(ref(database,`/blog/${name}/${idCard}`)).then((snap)=>{
                    let data = snap.val();
                    let titleDb = data.title;
                    let praDb = data.pra
                    let section = document.querySelector("#sectionContent")
                    section.classList.remove("unactive-Section")
                    document.querySelector(`#section${id}`).classList.add("unactive-Section")
                    title.innerHTML = titleDb
                    pra.innerHTML = praDb
                })

            })
        })
}, 100);