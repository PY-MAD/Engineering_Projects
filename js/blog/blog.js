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
let getListCheck = document.querySelector(".active-li")
let name = getListCheck.textContent;
let fristid = getListCheck.id
auth.onAuthStateChanged((user)=>{
    let id = user.uid
    get(ref(database, `/users/${id}/admin`)).then((snap)=>{
        let data = snap.val();
        if(!data){
            Add.remove()
        }
    })
})
let sectionId = document.querySelector(".cards")
get(ref(database, `/blog/${name}`)).then((snap)=>{
    let data = snap.val()
    function addCard(title , img , id){
        let q = `
        <div class="card-continer" id="${id}">
            <div class="card-content">
                    <div class="card-img">
                        <img src="${img}" alt="">
                    </div>
                <div class="card-title">${title}</div>
            </div>
        </div>
        `
        return sectionId.innerHTML += q;
    }
    for(let i in data){
        let uid = i;
        let title = data[i].title;
        let url = data[i].imgUrl
        addCard(title , url , uid)
    }

})

liCheck.forEach((item)=>{
    item.addEventListener("click", ()=>{
        let id = item.id
        name = item.textContent;
        let sectionId = document.getElementById(`section${id}`)
        liCheck.forEach((check)=>{
            let holdId = check.id
            let sectionId = document.getElementById(`section${check.id}`)
            if(holdId == id){
                check.classList.add("active-li", "active")
                sectionId = document.getElementById(`section${check.id}`)
                sectionId.classList.add("active-Section")
                sectionId.classList.remove("unactive-Section")
            }else{
                check.classList.remove("active-li", "active")
                sectionId.classList.add("unactive-Section")
                sectionId.classList.remove("active-Section")
            }
        })
        if(sectionId.id != "sectionAdd"){
            sectionId.innerHTML = "";
        }
        get(ref(database, `/blog/${name}`)).then((snap)=>{
            let data = snap.val()
            function addCard(title , img , id){
                let q = `
                <div class="card-continer" id="${id}">
                    <div class="card-content">
                            <div class="card-img">
                                <img src="${img}" alt="">
                            </div>
                        <div class="card-title">${title}</div>
                    </div>
                </div>
                `
                return sectionId.innerHTML += q;
            }
            for(let i in data){
                let uid = i;
                let title = data[i].title;
                let url = data[i].imgUrl
                addCard(title , url , uid)
            }
        })

    })
})
