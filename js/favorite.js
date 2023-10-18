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

const dbCard = ref(database, "/cards/"); // Reference to the root of the database
const dbuser = ref(database, "/users/"); // Reference to the root of the database
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

let body = document.getElementById("body");
function blurBackground() {
  preloader.classList.add("none-preloader");
  blur.classList.add("show-blur");
}

BeforepreloaderPage();
let holderSec = document.querySelector(".fav-container");

auth.onAuthStateChanged(user =>{

        if(user){
                get(ref(database, `/users/${user.uid}`)).then((userData)=>{
                                function createCards(name, pra, src_photo, uid) {
                                        let card_template = `
                                                        <div class="card-container">
                                                        <input type="checkbox" id="${uid}" value="${uid}" class="fav" name="fav"/>
                                                        <label for="${uid}" class="label-${uid}"></label>
                                                        <a href=/user/${uid}/${uid}.html>
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
                        let hasFav = []
                        let user = userData.val().fav
                        get(dbCard).then((snapshot)=>{
                                let snap = snapshot.val();
                                for(let item in user){
                                        let userFav = user[item];
                                        let card;
                                        for(let item in snap){
                                                card = snap[item].uid
                                                let makeCard = snap[item];
                                                if(card == userFav){
                                                        createCards(makeCard.name, makeCard.pra , makeCard.src_photo , makeCard.uid)
                                                }else{
                                                        console.log(false)
                                                }
                                        }
                                }
                                
                        })
                })
        }
})