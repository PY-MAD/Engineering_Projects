import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
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

const dbRef = ref(database, "/cards/"); // Reference to the root of the database
const dbHW = ref(database, "/homework/"); // Reference to the root of the database
const auth = getAuth();

let preloader = document.getElementById("preloader");
let blur = document.getElementById("blur");
function fetchingData(){
  preloader.classList.add("show-preloader");
  blur.classList.add("show-blur");
  preloader.classList.remove("none-preloader");
  blur.classList.remove("none-blur");
}
function fetchingDataDone(){
  preloader.classList.remove("show-preloader");
  blur.classList.remove("show-blur");
  preloader.classList.add("none-preloader");
  blur.classList.add("none-blur");
}
let body = document.getElementById("body");
auth.onAuthStateChanged((user)=>{
  const subjectListHandling = document.querySelector("#subjectsList ul")
  let titleOfPage = document.getElementById("title")
  let uidUser = user.uid;
  let idSubjects = null;
  let nameOfSubjects = null;
  const homeworkListHandling = document.querySelector("#homeWorkList ul")
  const homeWorkHandling = document.querySelector(".sectionHomeWork #componentHomeWork .homeWork")
  function createNewListHomeWork(nameOfQuestion, uid ) {
    // Check if nameOfQuestion is not empty or a comment
    if (nameOfQuestion.trim() !== "") {
      set(ref(database, `/homework/${uid}/${nameOfQuestion}`), {
        name: nameOfQuestion,
        questions: [""],
      });
      console.log("push is done!!!");
    }
  }

  function createQuestion(nameOfQuestion,uid,titleQ, correctAnswer, A , B , C ,D) {
    // Check if nameOfQuestion is not empty or a comment
    if (nameOfQuestion.trim() !== "") {
      set(ref(database, `/homework/${uid}/${nameOfQuestion}/${titleQ}`), {
        titleQ:titleQ,
        option:          
          {"A":A,
          "B":B,
          "C":C,
          "D":D,
        },
        correctAnswer : correctAnswer
      });
      console.log("push is done!!!");
    }
  }
  
  
  function addSubjects(name , uid){
    
    let sub =`
    <li id="${uid}" class="subjects" >${name}</li>  
    `
    return subjectListHandling.innerHTML += sub
  }
  function addHomeWork(name){
    let homeWork = `
      <li class="homeWork">${name}</li>
    `
    homeworkListHandling.classList.add("activeHomeWork");
    return homeworkListHandling.innerHTML += homeWork
    
  }
  function createQ(titleQ , A , B , C ,D ){
    let q = `
    <div class="q">
        <div class="qus">
          ${titleQ}
        </div>
        <div class="option">
            <div>
                <input type="radio" name="q1" id="q1">
                <label for="q1">
                    <div class="optionValue">
                        ${A}
                    </div>
                    <div id="A" class="option-q">
                        A
                    </div>
                </label>
            </div>
            <div>
                <input type="radio" name="q1" id="q2">
                <label for="q2">
                    <div class="optionValue">
                        ${B}
                    </div>
                    <div id="B" class="option-q">
                        B
                    </div>
                </label>
            </div>
            <div>
                <input type="radio" name="q1" id="q3">
                <label for="q3">
                    <div class="optionValue">
                        ${C}
                    </div>
                    <div id="C" class="option-q">
                        C
                    </div>
                </span></label>
            </div>
            <div>
                <input type="radio" name="q1" id="q4">
                <label for="q4">
                    <div class="optionValue">
                        ${D}
                    </div>
                    <div id="D" class="option-q">
                        D
                    </div>
                </label>
            </div>
        </div>
    
    `
    return homeWorkHandling.innerHTML += q
  }
  
    get(dbRef).then((snapshot)=>{
      let snap = snapshot.val();
      for(let item in snap){
        let name = snap[item].name;
        let id = snap[item].uid;
        addSubjects(name , id)
      }
    })
    .catch((error) => {
      console.error("Error getting data:", error);
    });
    
    setTimeout(() => {
      let allTheListSubjects = document.querySelectorAll("#subjectsList ul li");
      allTheListSubjects.forEach((item) => {
        item.addEventListener("click", () => 
        {
          let idSubjects = item.id;
          let nameOfSubjects = item.textContent;
          homeworkListHandling.innerHTML = "";
          allTheListSubjects.forEach((all) => {
            let ides = all.id;
            if (ides == idSubjects) {
                all.classList.add("activeList");
            } else {
                all.classList.remove("activeList");
            }
        });

        
          get(ref(database, `/homework/${idSubjects}`)).then((snapshot) => {
            // let q = prompt("did you want to add homeWork here ?")
            // console.log(q)
            // if(q == "yes"){
            //   let name = prompt("what the name ?")
            //   createNewListHomeWork(name, idSubjects)
            // }
            let snap = snapshot.val()
            let name = "";
            for(let item in snap){
              let name = snap[item].name;
              addHomeWork(name)
            }
            let allListHomeWork = document.querySelectorAll("#homeWorkList ul li")
            allListHomeWork.forEach((item)=>{
              item.addEventListener("click",()=>{
                let nameOfhomeWork = item.textContent;
                allListHomeWork.forEach((all) => {
                  let ides = all.textContent;
                  if (ides == nameOfhomeWork) {
                      all.classList.add("activeList");
                  } else {
                      all.classList.remove("activeList");
                  }
              });
              get(ref(database, `/homework/${idSubjects}/${nameOfhomeWork}`)).then((snapshot)=>{
                let snap = snapshot.val();
                // createQuestion(nameOfhomeWork,idSubjects,"كيف تعرف متغيير ؟","C", "A","B","C","D")
                for(let item in snap){
                  if(item != "name"){
                    let titleQ = item;
                    get(ref(database, `/homework/${idSubjects}/${nameOfhomeWork}/${titleQ}`)).then((snapshot)=>{
                      let snap = snapshot.val();
                      createQ(titleQ, "String str = Mohammed;",`String str = "Mohammed"; `,"String = Mohammed","str = Mohammed");
                    })
                  }
                }
              })
              })
            })
          }).catch((error) => {
            console.error("Error getting data:", error);
          });
        });


      });
    }, 1000);
    

})