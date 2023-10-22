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



function createNewSubjects(name,uid){
  set(ref(database, `/homework/${uid}`),{
      uid:uid,
      name:name,
      homeworks:[""]
  })
  console.log("added is done !")
}
createNewSubjects("تراكيب البيانات","data-str")
function createNewHomeWork(nameOfQuestion,uid){
      set(ref(database,`/homework/${uid}/homeworks`),{
        name:nameOfQuestion,
        answerAndQ:[""]
      })

}
createNewHomeWork("الواجب الأول : تعريف متغيير","data-str")