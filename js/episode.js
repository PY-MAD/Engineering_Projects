import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getDatabase, ref ,onValue, child, get, set,onChildAdded } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

const dbRef = ref(database, '/episode/'); // Reference to the root of the database

get(dbRef).then((snapshot) => {
        let tempEpisodes = document.getElementById("episode-list")

        let tempVideo = document.getElementById("video-side");
    function createEpisode(name, uid){
            
            let episode = `
            <li id="${uid}">
               ${name}
            </li>
                  
            `

            return tempEpisodes.innerHTML += episode;
    }
    function changeVideo(name , src_video){
      let change = `
      <div class="video">
            ${src_video}
          </div>
          <div class="title-video">
            ${name}
          </div>
          <div class="dics">
          </div>
      `
      return tempVideo.innerHTML = change;
    }
    let subjectsCode = tempEpisodes.classList
    onChildAdded(ref(database, `/episode/${subjectsCode}`),(snap)=>{
      let data = snap.val()
      createEpisode(data.title, data.title)
    })
      
    setTimeout(() => {
      let checklist = document.querySelectorAll("#episode-list li")
      console.log(checklist)
      get(ref(database, `/episode/${subjectsCode}`)).then((snap)=>{
        let data = snap.val()
        
        checklist.forEach((item)=>{
          item.addEventListener("click",()=>{
              let videoName = item.id;
              for(let i in data){
                if(data[i].title == videoName){
                  changeVideo(data[i].title, data[i].embed)
                  let a = document.querySelector("#video-side .dics");
                  a.innerHTML = data[i].disc
                  let url = a.textContent;
                  let chek = url.split("\n")
                  for(let i in chek){
                    if(chek[i].startsWith(" http") || chek[i].startsWith("http")){
                      let attrA = chek[i];
                      let findsA = document.querySelectorAll(".dics a");
                      findsA.forEach((item)=>{
                        if(item.textContent == attrA){
                          item.setAttribute("href",attrA);
                          item.setAttribute("target", "_blank")
                        }
                      })
                    }
                  }
                }
              }
          
            })
        })
      })
    }, 600);
  }).catch((error) => {
    console.error('Error fetching data:', error);
  });
