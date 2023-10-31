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

const dbHW = ref(database, "/quiz/"); // Reference to the root of the database
const auth = getAuth();



auth.onAuthStateChanged((user)=>{
    get(ref(database, `/users/${user.uid}/quiz`)).then((snap)=>{
        let m = moment();
        let date = m.format("YYYY-MM-DD")
        let reset = document.getElementById("reset-homeWork")
        let data = snap.val()
        let idList = null;
        let gradeSec = document.querySelector(".grade")
        let send = document.getElementById("send-homeWork")


        // functions

        function startCountdown(minutes, second) {
            const endTime = moment().add(minutes, 'minutes').add(second, 'seconds');
            const countdownElement = document.getElementById('clock');
        
            function updateCountdown() {
              const currentTime = moment();
              const remainingTime = moment.duration(endTime - currentTime);
              const minutes = remainingTime.minutes();
              const seconds = remainingTime.seconds();
        
        
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

          function Setgrade(grade, totalGrade) {
            let g = `
                            <span id="grade">${grade}/${totalGrade}</span>
            `;
            return (gradeSec.innerHTML = g);
          }



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



            fetchingData()
            setTimeout(() => {
                fetchingDataDone()
                let list = document.querySelectorAll("#subjectsList ul li")
                list.forEach((item)=>{
                    item.addEventListener("click",()=>{
                        idList = item.id;
                        console.log(item)
                        fetchingData()
                                setTimeout(() => {
                                    fetchingDataDone()
                                    let homeWorkList = document.querySelectorAll("#homeWorkList ul li")
                                    homeWorkList.forEach((item)=>{
                                        item.addEventListener("click",()=>{
                                            console.log(item)
                                            let nameQuiz = ""
                                            for(let i in data){
                                                if(i == item.textContent){
                                                    nameQuiz = i;
                                                }
                                            }
                                            get(ref(database, `/users/${user.uid}/quiz/${nameQuiz}`)).then((snap)=>{
                                                let data = snap.val()
                                                console.log(date)
                                                if(date != data.date){
                                                    reset.classList.remove("unactive")
                                                }
                                                reset.addEventListener("click",()=>{
                                                    update(ref(database, `/users/${user.uid}/quiz/${nameQuiz}`),{
                                                        grade:null,
                                                        Answers:[""]
                                                    })
                                                    get(ref(database, `/quiz/${idList}/${nameQuiz}`)).then((snap)=>{
                                                        let data = snap.val()
                                                        startCountdown(data.mins, data.secs)
                                                        grade.style.display="none"
                                                        gradeSec.style.display ="none";
                                                        reset.classList.add("unactive")
                                                        send.style.display ="block"
                                                        console.log(data)
                                                    })
                                                    
                                                })
                                            })
                                            get(ref(database, `/users/${user.uid}/quiz/${nameQuiz}`)).then((snap)=>{
                                                let data = snap.val()
                                                if(data.grade == null){
                                                    reset.classList.add("unactive")
                                                }
                                                send.addEventListener("click",()=>{
                                                    gradeSec.style.display ="block";

                                                })
                                            })

                                        })
                                    })
                                }, 1000);
            
                        
                    })
                })
            }, 1000);
        })
        
})