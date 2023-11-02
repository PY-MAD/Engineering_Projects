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
get(ref(database, "/blog/")).then((snap)=>{
        let data = snap.val()
        let cards = document.querySelectorAll(".container-section")
        let name = "جافا 1";
        liCheck.forEach((item)=>{
            item.addEventListener("click", ()=>{
                let id = item.id
                name = item.textContent;
                item.classList.remove("unactive-Section")
                document.querySelector("#sectionContent").classList.add("unactive-Section")
            })
        })

        cards.forEach((itemCards)=>{
            itemCards.addEventListener("click",()=>{
                let id = itemCards.id
                let cards = document.querySelectorAll(`#${id} .card-continer`)

                cards.forEach((item)=>{
                    itemCards.classList.add("unactive-Section")
                    document.querySelector("#sectionContent").classList.remove("unactive-Section")
                    let id = item.id
                    get(ref(database, `/blog/${name}/${id}`)).then((snap)=>{
                        let data = snap.val()
                        let title = document.querySelector("#sectionContent .title")
                        let pra = document.querySelector("#sectionContent .pra")
                        title.innerHTML = " ";
                        pra.innerHTML = " ";
                        let textPra = data.pra;
                        let split = textPra.split(" ")
                        let textNotHtml = "";
                        title.innerHTML = data.title;
                        for(let i = 0; i<split.length; i++){
                            if(split[i].includes("<code>")){
                                pra.innerHTML+=" "+split[i]
                                i++;
                                while(!split[i].includes("</code>")){
                                    textNotHtml+= " "+split[i];
                                    i++;
                                }
                            }
                            pra.innerHTML+=" "+split[i]
                        }
                    })
                })
            })
        })
    
})