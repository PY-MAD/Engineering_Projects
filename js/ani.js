import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
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
const auth = getAuth();

let preloader = document.getElementById("preloader");
let blur = document.getElementById("blur");
function BeforepreloaderPage() {
  preloader.classList.add("show-preloader");
  blur.classList.add("show-blur");
}

function AfterpreloaderPage() {
  preloader.classList.add("none-preloader");
  blur.classList.add("none-blur");
}
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
function blurBackground() {
  preloader.classList.add("none-preloader");
  blur.classList.add("show-blur");
}

BeforepreloaderPage();
let holderSec = document.querySelector(".container");
get(dbRef)
  .then((snapshot) => {
    function getId() {
      let nameFav = document.querySelector(".fav");

      for (let i = 0; i < nameFav.length; i++) {
        if (nameFav[i].checked) {
          console.log(nameFav[i]);
        }
      }
    }
    function createCards(name, pra, src_photo, uid) {
      let card_template = `
                      <div class="card-container">
                        <div class="favBtn-container">
                        <input type="checkbox" id="${uid}" value="${uid}" class="fav" name="fav"/>
                        <label for="${uid}" class="label-${uid} ${uid}"></label>
                        </div>
                        <a href=/user/coursesPath/${uid}.html>
                        <div class="card-content">
                        <div class="img-card">
                                <img src="${src_photo}" alt="">
                        </div>
                        <div class="card-title">${name}</div>
                        <div class="card-pra">
                                ${pra}
                        </div>
                        </div>
                        </a>
                      </div>
                `;

      return (holderSec.innerHTML += card_template);
    }
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const childData = data[key];
          createCards(
            childData.name,
            childData.pra,
            childData.src_photo,
            childData.uid
          );
        }
      }
      auth.onAuthStateChanged((user) => {
        if (user) {
          const db = ref(database);
          const userUid = `users/${user.uid}`;
          const pushData = ref(database, `users/${user.uid}/fav/`);
          get(child(db, userUid)).then((snapshot) => {
            if (snapshot.exists()) {
              let allFav = document.querySelectorAll(".favBtn-container");
              let snap = snapshot.val().fav;
              let favArray = []
              let favdb = []

              allFav.forEach((item) =>{
                let fav = item.querySelector(".fav")
                favArray.push(fav.id)
              })

              allFav.forEach((item)=>{
                let fav = item.querySelector(".fav")
                let favLabel = item.querySelector(`.label-${fav.id}`)
                let CheckClass = favLabel.classList.contains(`${fav.id}`)

                item.addEventListener("click", ()=>{
                  if(fav.checked){
                    fetchingData()
                    get( ref(database, `users/${user.uid}/fav/`)).then((snapshot) => {
                      let snap = snapshot.val()
                      let add = true
                      
                      setTimeout(function() {
                        fetchingDataDone()
                        for(let item in snap){
                          favdb.push(snap[item])
                        }
                        for(let i = 0; i<favdb.length ; i++){
                          for(let j = 0 ; j< favArray.length; j++){
                            if(favdb[i] == fav.id){
                              
                              Swal.fire(
                                'Cancelled',
                                'تم وضع هذا المقرر في المفضلة بالفعل',
                                'error'
                              )
                              add = false;
                              break;
                            }
                          }
                        }
                        if(add){
                          push(ref(database, `users/${user.uid}/fav/`), fav.id)
                          
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'تم إضافته في المفضلة بنجاح ',
                            showConfirmButton: false,
                            timer: 1500
                          })
                        }
                      }, 1000);
                      
                    })

                    
                  }
                })

              })
            }
          });
		  
        }
      });
    } else {
      console.log("No data available.");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
function Cards_courses(name, pra, src_photo, uid, src) {
  set(ref(database, "cards/" + uid), {
    name: name,
    pra: pra,
    src_photo: src_photo,
    uid: uid,
  });
  alert("added done !");
}

// Cards_courses("جافا 1","هنا يتم تدريس جافا 1 جامعة الامام محمد بن سعود الإسلامية","/assets/svg/images/courses-templete/java.svg","java_1")
// Cards_courses("جافا 2","هنا يتم تدريس جافا 2 جامعة الامام محمد بن سعود الإسلامية","/assets/svg/images/courses-templete/java.svg","java_2")
// Cards_courses("تراكيب البيانات","هنا يتم شرح مادة تراكيب البيانات","/assets/svg/images/courses-templete/java.svg","data_str")
