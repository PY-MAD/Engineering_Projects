import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getDatabase, ref,onValue, child, get, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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
const database = getDatabase(app)
const auth = getAuth();
auth.onAuthStateChanged((user)=>{
    let userUid = user.uid;
    let getDataUser = ref(database, `/users/${userUid}`)
    let queryDataUser = document.querySelector(".data-detail");
    let liCheck = document.querySelectorAll("aside div")
    let dataSec = document.getElementById("sectionData")
    let LeaderSec = document.getElementById("sectionLeader")
    function setProfile(name , email, rank , lastLogin , signUpDate){
        let q = `
        <div class="name">${name}</div>
        <div class="email">الأيميل : ${email}</div>
        <div class="rank">
            مرتبتك : ${rank}
        </div>
        <div class="date">
            <div class="date-of-signUp">تاريخ تسجيل الحساب : ${signUpDate}</div>
            <div class="date-of-signIn">أخر تسجيل دخول : ${lastLogin}</div>
        </div>
        <div class="btn-edit">
            <button id="edit">تعديل للبيانات</button>
        </div>
        `
        return queryDataUser.innerHTML += q;
    }
    get(getDataUser).then((dataUser)=>{
        let data = dataUser.val();
        let name = data.username;
        let email = data.email;
        let lastLoginFromDB = data.last_login;
        let last_login = "";
        for(let i = 0; i<lastLoginFromDB.length; i++){
            if(lastLoginFromDB[i] == 'T'){
                break;
            }else if(lastLoginFromDB[i] == '-'){
                let char = lastLoginFromDB[i];
                char = '/'
                last_login+=char;
            }else{
                last_login+=lastLoginFromDB[i];
            }
        }
        setProfile(name , email, 12 , last_login, "12/12/1424")
    })
    liCheck.forEach((item)=>{
        item.addEventListener("click", ()=>{
            let id = item.id
            console.log(id)
            if(id == "user-data"){
                LeaderSec.classList.add("unactive-Section")
                dataSec.classList.remove("unactive-Section")
                dataSec.classList.add("active-Section")
            }else{
                dataSec.classList.add("unactive-Section")
                LeaderSec.classList.remove("unactive-Section")
                LeaderSec.classList.add("active-Section")
            }
            liCheck.forEach((check)=>{
                let holdId = check.id
                if(holdId == id){
                    check.classList.add("active-li", "active")
                }else{
                    check.classList.remove("active-li", "active")
                }
            })

        })
    })
})

