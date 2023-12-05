import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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


get(ref(database,"/schedule/")).then((snap)=>{
  let ul = document.querySelector("table")
  function addList(title , code , source_code , date ,free, teacher){
    let q = `
        <td>${title}</td>
        <td>${code}</td>
        <td>${source_code}</td>
        <td>${date}</td>
        <td>${free}</td>
        <td>${teacher}</td>
    `
    return ul.innerHTML += q;
  }
  let data = snap.val();
  let newData = ["مشروع تخرج "]
  for(let i in data){
    let title = data[i].title 
    let newTitle = title.replace("\nنظري - محاضرة"," ");
    for(let j = 0; j<newData.length; j++){
      if(newTitle == newData[j]){
        console.log(newTitle,"\n",data[i].source_code)
        addList(newTitle, data[i].code , data[i].source_code, data[i].date, data[i].free , data[i].teacher)
      }
    }


  }
})