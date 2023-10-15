import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getDatabase, ref ,onValue, child, get, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

const dbRef = ref(database, '/cards/'); // Reference to the root of the database


let preloader = document.getElementById("preloader");
let blur = document.getElementById("blur");
function BeforepreloaderPage(){
  preloader.classList.add("show-preloader");
  blur.classList.add("show-blur")
}

function AfterpreloaderPage(){
  preloader.classList.add("none-preloader");
  blur.classList.add("none-blur")
}



let body = document.getElementById("body");
function blurBackground(){
preloader.classList.add("none-preloader");
blur.classList.add("show-blur")
}

BeforepreloaderPage();
let holderSec = document.querySelector(".container")
get(dbRef).then((snapshot) => {
        function createCards(name, pra, src_photo , uid){
                
                let card_template = `
                        <div class="card-container">
                        <button id="${uid}" onclick="getID(this)"  class="fav"><img id=${"img_"+uid} class="fav-img" src="/assets/svg/star.svg" alt=""></button>
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
                </div>
                `

                return holderSec.innerHTML += card_template;
        }

        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              const childData = data[key];
              createCards(childData.name,childData.pra,childData.src_photo,childData.uid)
            }
          }
        } else {
          console.log('No data available.');
        }
      }).catch((error) => {
        console.error('Error fetching data:', error);
      });
function Cards_courses(name , pra , src_photo,uid){
        set(ref(database,"cards/"+uid),{
                name:name,
                pra:pra,
                src_photo:src_photo,
                uid:uid
        })
        alert("added done !")
}


// Cards_courses("جافا 1","هنا يتم تدريس جافا 1 جامعة الامام محمد بن سعود الإسلامية","/assets/svg/images/courses-templete/java.svg","java_1")
// Cards_courses("جافا 2","هنا يتم تدريس جافا 2 جامعة الامام محمد بن سعود الإسلامية","/assets/svg/images/courses-templete/java.svg","java_2")
// Cards_courses("تراكيب البيانات","هنا يتم شرح مادة تراكيب البيانات","/assets/svg/images/courses-templete/java.svg","data_str")

