import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  set,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPs6u-21i0E9mxGXWhdlFiCKpkuhrPpBc",
  authDomain: "test-ab03a.firebaseapp.com",
  databaseURL:
    "https://test-ab03a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-ab03a",
  storageBucket: "test-ab03a.appspot.com",
  messagingSenderId: "19444872261",
  appId: "1:19444872261:web:69de8c91e006b58aa8df2c",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth();
let container = document.getElementById("container-subjects");
function addSubjects(sub , hour , hourAbsent, hourAbsented){
    let q = `
    <tr id="${sub}">
        <td>${sub}</td>
        <td>${hour}</td>
        <td id="${sub}-abbsent">${hourAbsented}</td>
        <td id="${sub}-accessAbbsent">${hourAbsent}</td>
        <td><button id="pulse-${sub}" class="btn btn-add btn-group btn-light button-pulse">1+</button></td>
        <td class="delete-icon" id="delete-${sub}"><i class="bi bi-x-lg"></i></td>
    </tr>
    `
    return container.innerHTML += q;
}
auth.onAuthStateChanged((user)=>{
    let uid = user.uid;
    let add = document.getElementById("add-subjects-hours");
    add.addEventListener("click",()=>{
        let sub = document.getElementById("get-nameSubjects-hours").value;
        let hour = document.getElementById("get-hours").value;
        set(ref(database, `users/${uid}/subjectsHours/${sub}`),{
            "name":sub,
            "hour":hour,
            "absent":hour*3,
            "absented":0
        })
        addSubjects(sub , hour, hour*3,0);
        sub = ""
        hour = 0;
    })
    // test
    get(ref(database, `users/${uid}/subjectsHours`)).then((snap)=>{
        let data = snap.val()
        for(let i in data){
            addSubjects(data[i].name , data[i].hour, data[i].absent,data[i].absented)
        }
        let buttons_pulse = document.querySelectorAll(".button-pulse");
        buttons_pulse.forEach((item)=>{
            item.addEventListener("click",()=>{
                let preId = item.id;
                let id = preId.split("-")[1];
                let abbsent = document.getElementById(`${id}-abbsent`);
                let accessAbbsent = document.getElementById(`${id}-accessAbbsent`)
                if(accessAbbsent.textContent != "0"){
                    let newHourAbbsent = Number(abbsent.textContent) + 1;
                    let lessAbbsent = Number(accessAbbsent.textContent) - 1;
                    update(ref(database , `users/${uid}/subjectsHours/${id}`),{
                        absented:newHourAbbsent,
                        absent:lessAbbsent
                    });
                    abbsent.innerHTML = newHourAbbsent;
                    accessAbbsent.innerHTML = lessAbbsent;
                }else{
                    Swal.fire({
                        icon: "error",
                        title: `أنتبه من حرمان المادة ${id}!!!`,
                        text: `لقد وصلت للحد الأقصاء من الغيابات ${accessAbbsent.textContent}`,
                      });
                }

            })
        })
        let deleteTable = document.querySelectorAll(".delete-icon");
        deleteTable.forEach((item)=>{
            item.addEventListener("click",()=>{
                let preId = item.id;
                let id = preId.split("-")[1];
                remove(ref(database, `users/${uid}/subjectsHours/${id}`))
                let container = document.getElementById("container-subjects");
                let child = document.getElementById(id)
                container.removeChild(child);
            })
        })

    })

    
})