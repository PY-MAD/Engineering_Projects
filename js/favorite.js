import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
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
let body = document.getElementById("body");
function blurBackground() {
  preloader.classList.add("none-preloader");
  blur.classList.add("show-blur");
}

BeforepreloaderPage();
let holderSec = document.querySelector(".fav-container");
auth.onAuthStateChanged((user)=>{

        get(ref(database, `users/${user.uid}/fav/`))
        .then((snapshot) => {

        function sorry(statue){
                if(statue){
                        let sorryCompunines = `
                        <div class="sorry">
                        <img src="/assets/svg/Big Shoes - Torso.svg" alt="لا يوجد بيانات">
                        <h1 class="sorry-text">نعتذر منك لا يوجد بيانات </h1>
                </div>
                `
                holderSec.innerHTML += sorryCompunines;
                }
        }
          function createCards(name, pra, src_photo, uid) {
            let card_template = `
                              <div id="${uid}-card-container" class="card-container">
                              <div class="favBtn-container">
                              <input type="checkbox" id="${uid}" value="${uid}" class="fav fav-clicked" name="fav"/>
                              <label for="${uid}" class="label-${uid} ${uid}"></label>
                              </div>
                              <a href=/user/coursesPath/${uid}.html>
                              <div class="card-content">
                              <div class="img-card">
                                      <img src="${src_photo}" alt="">
                              </div>
                              <div class="card-title">
                                      ${name}
                              </div>
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
                get(dbRef).then((cards)=>{
                        let card = cards.val();
                        let userFav = snapshot.val()
                        let favdb = []
                        let hasFav = []

                        for(let item in userFav){
                                let idUserFav = userFav[item]
                                fetchingData()
                                setTimeout(()=>{
                                        fetchingDataDone()
                                        for(let item in card){
                                                let uidCard = card[item];
                                                if(idUserFav == uidCard.uid){
                                                        createCards(uidCard.name,uidCard.pra,uidCard.src_photo,uidCard.uid)
                                                }
                                        }
                                },1000)
                        }
                })
            }

            auth.onAuthStateChanged((user) => {
              if (user) {
                fetchingData();
                setTimeout(()=>{
                        const db = ref(database);
                        const userUid = `users/${user.uid}`;
                        const pushData = ref(database, `users/${user.uid}/fav/`);
                        get(child(db, userUid)).then((snapshot) => {
                          if (snapshot.exists()) {
                            let allFav = document.querySelectorAll(".favBtn-container");
                            let AlldeletedCard = document.querySelectorAll(".card-container")
                            let snap = snapshot.val().fav;
                            let favArray = [];
                            let favdb = [];
                            let favkey = [];
                            let counter = 0;
                            if(AlldeletedCard.length == 0){
                                        sorry(true)
                                        fetchingDataDone();

                                }else{
                                        
                                        sorry(false)
                                        fetchingDataDone();
                                }
                            allFav.forEach((item) => {
                              let fav = item.querySelector(".fav");
                              favArray.push(fav.id);
                            });
                            allFav.forEach((item) => {


                              let fav = item.querySelector(".fav");
                              let favLabel = item.querySelector(`.label-${fav.id}`);
                              let CheckClass = favLabel.classList.contains(`${fav.id}`);
                              let deleteCard = document.getElementById(`${fav.id}-card-container`)
                              item.addEventListener("click", () => {
                                if (fav.checked) {
                                        
                                  fetchingData();
                                  get(ref(database, `users/${user.uid}/fav/`)).then(
                                    (snapshot) => {
                                      let snap = snapshot.val();
              
                                      setTimeout(function () {
                                        fetchingDataDone();
                                        for (let item in snap) {
                                          favdb.push(snap[item]);
                                          favkey.push(item);
                                        }
                                        counter = favArray.length;
                                        
                                        for (let i = 0; i < favdb.length; i++) {
                                          for (let j = 0; j < favArray.length; j++) {
                                            if (favdb[i] == fav.id) {
                                                let id = favkey[i]
                                                deleteCard.remove()
                                                Swal.fire(
                                                        'success',
                                                        'تم الحذف بنجاح',
                                                        'error'
                                                      )
                                              remove(
                                                      ref(database, `users/${user.uid}/fav/${id}`),
                                                    );
                                                    console.log("deleted is done !")
                                                    
                                                    counter--;
                                              break;
                                            }

                                          }
                                        }
                                        if(counter <=0){
                                                sorry(true)
                                            }
                                      }, 2000);
                                    }
                                  );
                                }
                              });
                            });
                          }
                        });
                },1500)
              }
            });
        })
})