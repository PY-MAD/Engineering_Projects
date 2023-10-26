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
get(ref(database, "/users/")).then((users)=>{
    let userTable = document.getElementById("user-table")
    const data = users.val()
    function addUser(email , name , major , gender , last_login , counter, id){
        let q = `
        <tr>
                <td class="border-right-counter">
                    ${counter}
                </td>
                <td>
                    ${email}
                </td>
                <td>
                    ${name}
                </td>
                <td>
                    ${major}
                </td>
                <td>
                    ${gender}
                </td>
                <td>
                    ${last_login}
                </td>
                <td ><button class="delete" id="${id}"><i class="bi bi-x-lg"></i></button></td>
        </tr>
        `
        return userTable.innerHTML += q;
    }
    let counter = 0
    for(let i in data){
        let id = i
        let email = data[i].email;
        let name = data[i].username;
        let lastSignIn = data[i].last_login;
        let signIn = ""
        for(let i in lastSignIn){
            if(lastSignIn[i] == "T"){
                break
            }else{
                signIn+= lastSignIn[i]
            }
        }
        let gender = data[i].gender;
        if(gender == "female"){
            gender = "F"
        }else{
            gender = "M"
        }
        let major = data[i].major;
        counter++;
        addUser(email , name , major , gender , signIn , counter, id)
    }
})