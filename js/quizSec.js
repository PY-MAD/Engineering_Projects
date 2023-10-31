import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  set,
  update,
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
const dbHW = ref(database, "/quiz/"); // Reference to the root of the database
const auth = getAuth();

let preloader = document.getElementById("preloader");
let blur = document.getElementById("blur");
function fetchingData() {
  preloader.classList.add("show-preloader");
  blur.classList.add("show-blur");
  preloader.classList.remove("none-preloader");
  blur.classList.remove("none-blur");
}
function fetchingDataDone() {
  preloader.classList.remove("show-preloader");
  blur.classList.remove("show-blur");
  preloader.classList.add("none-preloader");
  blur.classList.add("none-blur");
}
auth.onAuthStateChanged((user) => {
  const subjectListHandling = document.querySelector("#subjectsList ul");
  let titleOfPage = document.getElementById("title");
  let uidUser = user.uid;
  let checkAdmin = null;
  let idSubjects = null;
  let nameOfQuestions = [];
  const homeworkListHandling = document.querySelector("#homeWorkList ul");
  const homeWorkHandling = document.querySelector(
    ".sectionHomeWork #componentHomeWork .homeWork"
  );
  let send = document.getElementById("send-homeWork");
  let counetQ = [];
  let titleQ = null;
  let nameOfhomeWork = null;
  let top = document.querySelector(".top");
  let titleHandling = document.querySelector(".top #title");
  let sendsButton = document.querySelector(".btn-submit");
  let gradeHandling = document.querySelector(".grade");
  let grade = 0;
  let body = document.getElementById("body");
  let btnAddHW = document.getElementById("btn");
  let Btnclose = document.getElementById("close");
  let m = moment()
  let timer = document.getElementById("timer")
  let doneQuiz = []
  get(ref(database, `/users/${user.uid}`)).then((snapshot)=>{
    let data = snapshot.val()
    let quiz = data.quiz
    if(data.admin == null){
      document.getElementById("btn-addHomeWork").remove()
    }
    for(let i in quiz){
      doneQuiz.push(i)
    }
  })
  function AddAdminQ(){
    let q = `
    <div id="btn-addHomeWork">
      <button id="btn">إضافة واجب</button>
    </div>
    `
    return document.getElementById("sec").innerHTML += q;
  }
  function createNewListHomeWork(nameOfQuestion, uid, mins, secs) {
    // Check if nameOfQuestion is not empty or a comment
    if (nameOfQuestion.trim() !== "") {
      set(ref(database, `/quiz/${uid}/${nameOfQuestion}`), {
        name: nameOfQuestion,
        mins : mins,
        secs: secs
      });
      console.log("push is done!!!");
    }
  }

  function createQuestion(nameOfQuestion,uid,titleQ,correctAnswer,A,B,C,D) {
    // Check if nameOfQuestion is not empty or a comment
    if (nameOfQuestion.trim() !== "") {
      set(ref(database, `/quiz/${uid}/${nameOfQuestion}/${titleQ}`), {
        titleQ: titleQ,
        option: { A: A, B: B, C: C, D: D },
        correctAnswer: correctAnswer,
      });

    }
  }
  function AddQuestion(nameOfQuestion,uid,titleQ,correctAnswer,A,B,C,D) {
    // Check if nameOfQuestion is not empty or a comment
    if (nameOfQuestion.trim() !== "") {
      get(ref(database, `/quiz/${uid}/${nameOfQuestion}/${titleQ}`)).then(()=>{
        set(ref(database, `/quiz/${uid}/${nameOfQuestion}/${titleQ}`), {
          titleQ: titleQ,
          option: { A: A, B: B, C: C, D: D },
          correctAnswer: correctAnswer,
        });
      })


    }
  }

  function addSubjects(name, uid) {
    let sub = `
    <li id="${uid}" class="subjects" >${name}</li>  
    `;
    return (subjectListHandling.innerHTML += sub);
  }
  function addHomeWork(name) {
    let homeWork = `
      <li class="homeWork">${name}</li>
    `;
    homeworkListHandling.classList.add("activeHomeWork");
    return (homeworkListHandling.innerHTML += homeWork);
  }
  function createQ(titleQ, A, B, C, D, counter) {
    let q = `
    <div class="q">
        <div class="qus">
          ${titleQ}
        </div>
        <div class="option">
            <div>
                <input type="radio" name="${titleQ}" id="${counter}-q1" value="A">
                <label for="${counter}-q1">
                    <div class="optionValue">
                        ${A}
                    </div>
                    <div id="A" class="option-q">
                        A
                    </div>
                </label>
            </div>
            <div>
                <input type="radio" name="${titleQ}" id="${counter}-q2" value="B">
                <label for="${counter}-q2">
                    <div class="optionValue">
                        ${B}
                    </div>
                    <div id="B" class="option-q">
                        B
                    </div>
                </label>
            </div>
            <div>
                <input type="radio" name="${titleQ}" id="${counter}-q3" value="C">
                <label for="${counter}-q3">
                    <div class="optionValue">
                        ${C}
                    </div>
                    <div id="C" class="option-q">
                        C
                    </div>
                </span></label>
            </div>
            <div>
                <input type="radio" name="${titleQ}" id="${counter}-q4" value="D">
                <label for="${counter}-q4">
                    <div class="optionValue">
                        ${D}
                    </div>
                    <div id="D" class="option-q">
                        D
                    </div>
                </label>
            </div>
        </div>
    
    `;
    return (homeWorkHandling.innerHTML += q);
  }
  function setGrade(grade, totalGrade) {
    let g = `
                    <span id="grade">${grade}/${totalGrade}</span>
    `;
    return (gradeHandling.innerHTML = g);
  }
  function setNameOfHomework(name) {
    let nameHomeWork = `<div id="title">${name}</div>`;
    return (titleHandling.innerHTML = nameHomeWork);
  }
  function saveGrade(uidUser , nameOfhomeWork , grade , totalGrade , answers, date, hour) {
    set(ref(database, `users/${uidUser}/quiz/${nameOfhomeWork}`), {
      nameHomeWork: nameOfhomeWork,
      grade: grade,
      totalGrade: totalGrade,
      Answers:answers,
      date:date,
      hour:hour
    }).then(() => {
      alert("Done");
    })
    .catch((error) => {
      alert("Error writing data to Firebase:", error);
    });
  }
  function AddNewHomeWork() {
    let show = `
          <div class="add-homework">
          <form class=" form-container">
              <div class="background">
              <div class="close">
                <button id="close"><img src="/assets/svg/icons8-close.svg" alt="closeSVG"></img></button>
              </div>
                      <div class="content" id="form-addQ">
                          <div id="option" class=" d-flex w-100">
                          <div class="title-option justify-content-end">
                              الرجاء أختيار المادة
                          </div>
                          <select class=" form-select" name="" id="optionSubjects">
                              <option value="" disabled selected>الرجاء الاختيار</option>
                          </select>
                              
                          </div>
                          <div class="q d-flex flex-column w-100">
                              <input name="titleHomeWork"class="titleHomeWork input-group form-control" id="nameOfHomework" placeholder="أدخل أسم الواجب" />
                              <div id="timerValue" class="d-flex justify-content-around">
                              <select class="w-25 form-select" id="mins">
                                <option class="" disabled selected>أختر كم دقيقة</option>
                              </select>
                              <select class="w-25 form-select" id="sec">
                                <option class="" disabled selected>أختر كم ثانية</option>
                              </select>
                              </div>  
                              </div>
                          <div id="AddQ" class="w-100"></div>
                          <div class=" btn-group  d-flex w-100">
                              <div class="btn btn-primary justify-content-around" id="add-Q">إضافة سؤال</div>
                              <div class="btn  btn-danger justify-content-around" id="submit-to-database">إنشاء</div>
                          </div>
                      </div>
          </div>
          </form>
          
    </div>
      `;
    return (body.innerHTML += show);
  }
  function addQ(i) {
    let q = `
        <div class="addQ w-100 bg-Q rounded-3 p-4" id="Q${i}">
        <input type="text" name="titleHomeWork"class="titleHomeWork input-group form-control mb-5 " id="EnterQ${i}" placeholder="أدخل السؤال">
        <div class="divOption w-75" id="${i}">
            <input type="text" name="titleHomeWork"class="titleHomeWork input-group form-control mb-3" id="A${i}" class="A EnterQ" placeholder="أدخل الخيار الاول">
            <input type="text" name="titleHomeWork"class="titleHomeWork input-group form-control mb-3" id="B${i}" class="B EnterQ" placeholder="أدخل الثاني">
            <input type="text" name="titleHomeWork"class="titleHomeWork input-group form-control mb-3" id="C${i}" class="C EnterQ" placeholder="أدخل الثالث">
            <input type="text" name="titleHomeWork"class="titleHomeWork input-group form-control mb-3" id="D${i}" class="D EnterQ" placeholder="أدخل الرابع">
            <select class=" form-select" name="" id="coreectAnswer">
                <option value="" disabled selected>الرجاء إختيار الإجابة الصحيحة</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
        </div>
    </div>
    `;
    let newQuestionDiv = document.createElement("div");
    newQuestionDiv.innerHTML = q;
    return document.getElementById("AddQ").appendChild(newQuestionDiv);
  }
  function CloseNewHomeWork() {
    return document.querySelector(".add-homework").remove();
  }
  function addTimeOption(i, id){
    let q = `
        <option>${i}</option>
    `
    return id.innerHTML+=q;
  }

    function startCountdown(minutes, second) {
    const endTime = moment().add(minutes, 'minutes').add(second, 'seconds');
    const countdownElement = document.getElementById('clock');

    function updateCountdown() {
      const currentTime = moment();
      const remainingTime = moment.duration(endTime - currentTime);
      const minutes = remainingTime.minutes();
      const seconds = remainingTime.seconds();

      countdownElement.textContent = `${minutes} : ${seconds}`;

      if (minutes === 0 && seconds === 0) {
        countdownElement.textContent = 'Timer expired!';
        send.style.display ="none"
      }
    }

    updateCountdown(); // Initial call to display the countdown
    setInterval(updateCountdown, 1000); // Update the countdown every second
  }
  function setTimer(mins , secs){
      let q = `
      <div class="clock" id="clock">
                    ${mins}:${secs}    
      </div>
      `
      return timer.innerHTML = q;
  }

  get(dbRef)
    .then((snapshot) => {
      let snap = snapshot.val();
      for (let item in snap) {
        let name = snap[item].name;
        let id = snap[item].uid;
        addSubjects(name, id);
      }
    })
    .catch((error) => {
      console.error("Error getting data:", error);
    });
  


  setTimeout(() => {
    

    get(dbRef).then((snap) => {
      let data = snap.val();
      let ArrayOfName = [];
      let ArrayOfId = [];
  
      for (let i in data) {
        let name = data[i].name;
        let id = data[i].uid;
        ArrayOfName.push(name);
        ArrayOfId.push(id);
      }
      btnAddHW.addEventListener("click", () => {
        let i = 0;
        AddNewHomeWork();
        let idMin = document.getElementById("mins");
        let idSec = document.getElementById("sec");
        for(let i = 0 ; i<60; i++){
            if(i != 0 && i>= 1){
              addTimeOption(i , idMin)
            }
            addTimeOption(i , idSec)
            
        }
      
        let submit = document.getElementById("submit-to-database");
        let optionQ = document.getElementById("optionSubjects");
        function listAddHomeworkSubjects(name, id) {
          let q = `
                <option value="${name}" id="${id}">${name}</option>
                `;
          return (optionQ.innerHTML += q);
        }
  
        for (let i = 0; i < ArrayOfName.length; i++) {
          listAddHomeworkSubjects(ArrayOfName[i], ArrayOfId[i]);
        }
        let BtnaddQ = document.getElementById("add-Q");
        
        BtnaddQ.addEventListener("click", () => {
          ++i;
          let mins = idMin.value
          let secs =  idSec.value
          addQ(i);
          let nameOfSubjects = document.getElementById("optionSubjects");
          let idSub = nameOfSubjects.options[nameOfSubjects.selectedIndex];
          let id = idSub.id;
          let nameOfHomework = document.getElementById("nameOfHomework").value;
          let create = document.getElementById("submit-to-database");
          let allInput = document.querySelectorAll(".titleHomeWork");
          let timer = document.getElementById("timer")
          submit.addEventListener("click", () => {
            for (let j = 1; j <= i; j++) {
              let holderAll = document.querySelector(`#Q${j}`);
              let nameQ = document.querySelector(`#Q${j} #EnterQ${j}`).value;
              let qa = document.querySelector(`#Q${j} #A${j}`).value;
              let qb = document.querySelector(`#Q${j} #B${j}`).value;
              let qc = document.querySelector(`#Q${j} #C${j}`).value;
              let qd = document.querySelector(`#Q${j} #D${j}`).value;
              let coreectAnswer = document.querySelector(`#Q${j} #coreectAnswer`).value;
              if(j == 1){
                createNewListHomeWork(nameOfHomework, id, mins , secs);
                createQuestion(nameOfHomework,id,nameQ,coreectAnswer,qa,qb,qc,qd);
              }else{
                  AddQuestion(nameOfHomework,id,nameQ,coreectAnswer,qa,qb,qc,qd)
              }
            }
            CloseNewHomeWork();
          });
        });
        Btnclose.addEventListener("click", () => {
          CloseNewHomeWork();
        });
      });
    });


    let allTheListSubjects = document.querySelectorAll("#subjectsList ul li");
    allTheListSubjects.forEach((item) => {
      item.addEventListener("click", () => {
        homeWorkHandling.innerHTML = "";
        setNameOfHomework("");
        sendsButton.classList.add("display_none");
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
        get(ref(database, `/quiz/${idSubjects}`))
          .then((snapshot) => {
            let snap = snapshot.val();
            let name = "";
            for (let item in snap) {
              let name = snap[item].name;
              addHomeWork(name);
            }
            let allListHomeWork = document.querySelectorAll(
              "#homeWorkList ul li"
            );
            
            allListHomeWork.forEach((item) => {
                for(let i in doneQuiz){
                  if(doneQuiz[i] == item.textContent){
                    item.classList.add("done-Quiz")
                  }
                }
                setTimeout(() => {
                  item.addEventListener("click", () => {
                    let grade = document.getElementById("grade");
                    if(grade != null){
                      grade.remove();
                    }
                    sendsButton.classList.add("display_none");
                    homeWorkHandling.innerHTML = "";
                    nameOfhomeWork = item.textContent;
                    get(ref(database, `/users/${uidUser}/quiz/${nameOfhomeWork}`)).then(
                      (snap) => {
                        let data = snap.val();
                      
                        if(data != null)
                        if (data.grade != null) {
                          setGrade(data.grade, data.totalGrade);
                          setTimeout(() => {
                            if(data.Answers[0] !== ""){
                              for(let i in data.Answers){
                                  document.querySelector(`#${data.Answers[i]}`).checked = true;
                                  
                                }
                                  send.style.display = "none"
                                  clock.style.display="none"
                            }
                          }, 700);

                        }
                      }
                    );
                    allListHomeWork.forEach((all) => {
                      let ides = all.textContent;
                      if (ides == nameOfhomeWork) {
                        all.classList.add("activeList");
                      } else {
                        all.classList.remove("activeList");
                      }
                    });
                    get(ref(database, `/quiz/${idSubjects}/${nameOfhomeWork}`)).then((snapshot) => {
                      let snap = snapshot.val();
                      let counter = 0;
                      let mins = snap.mins
                      let sec = snap.secs;
                      setTimer(mins , sec);
                      startCountdown(mins , sec)
                      for (let item in snap) {
                        if (item != "name" && item != "mins" && item != "secs") {
                          titleQ = item;
                          get(ref(database,`/quiz/${idSubjects}/${nameOfhomeWork}/${titleQ}`)).then((snapshot) => {
                            let snap = snapshot.val();
                            let q = snap.titleQ;
                            nameOfQuestions.push(q);
                            let correctAnswer = snap.correctAnswer;
                            let A = null;
                            let B = null;
                            let C = null;
                            let D = null;
                            let option = snap.option;
                            for (let item in option) {
                              switch (item) {
                                case "A":
                                  A = option[item];
                                case "B":
                                  B = option[item];
                                case "C":
                                  C = option[item];
                                case "D":
                                  D = option[item];
                              }
                            }
                            counter++;
                            let counterQ = `Q${counter}`;
                            createQ(q, A, B, C, D, counterQ);
                            setNameOfHomework(nameOfhomeWork);
                          });
                          sendsButton.classList.remove("display_none");
                          
                        }
                      }
                    });
                  });
                  
                }, 2000);
            });
            
            setTimeout(() => {
              
              send.addEventListener("click", () => {
                let allRadio = document.querySelectorAll("input");
                let ArrayOfQ = [];
                let ArrayOfChoose = [];
                let ArrayOfChooseId = [];
                let q = [];
                let correctAnswer = [];
                grade = 0;
                allRadio.forEach((item) => {
                  if (item.checked) {
                    ArrayOfChooseId.push(item.id)
                    ArrayOfChoose.push(item.value);
                  }
                });
                let gradeSec = document.querySelector("span #grade");
                get(ref(database, `/quiz/${idSubjects}/${nameOfhomeWork}`)).then((snapshot) => {
                  let snap = snapshot.val();

                  for (let i in snap) {
                    if (i != "name" && i != "mins" && i != "secs") {
                      q.push(i);
                      let correct = snap[i].correctAnswer;
                      correctAnswer.push(correct);
                    }
                  }
                  let totalGrade = q.length;
                  for (let i = 0; i < q.length; i++) {
                    let nameq = q[i];
                    let nameOfQ = nameOfQuestions[i];
                    if (nameq == nameOfQ) {
                      if (ArrayOfChoose[i] == correctAnswer[i]) {
                        grade++;
                      }
                    }
                  }
                  let date = moment();
                  let tomorrow = date.format("YYYY-MM-DD")
                  let hour = m.hour();
                  setGrade(grade, totalGrade);
                  setNameOfHomework(nameOfhomeWork);
                  saveGrade(uidUser , nameOfhomeWork, grade, totalGrade , ArrayOfChooseId, tomorrow, hour)
                  send.style.display="none"
                  clock.style.display="none"
                });
              });
            }, 1000);
          })
          .catch((error) => {
            console.error("Error getting data:", error);
          });
      });
    });
  }, 1000);
});
