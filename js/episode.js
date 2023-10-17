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

const dbRef = ref(database, '/episode/'); // Reference to the root of the database

get(dbRef).then((snapshot) => {
        let tempEpisodes = document.getElementById("episode-list")

        let tempVideo = document.getElementById("video-side");
    function createEpisode(name, uid){
            
            let episode = `
            <li class="${uid}">
               ${name}
        </li>
                  
            `

            return tempEpisodes.innerHTML += episode;
    }
    function changeVideo(name , src_video , url){
      let change = `
      <div class="video">
            ${src_video}
          </div>
          <div class="title-video">
            ${name}
          </div>
          <div class="urls">
            <a href="${url}">لتحميل الملفات أضغط هنا</a>
          </div>
      `
      return tempVideo.innerHTML += change;
    }
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const key in data) {
        
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const childData = data[key];
          createEpisode(childData.name,childData.uid)
          let checkName = childData.name;
          let listItems = document.querySelectorAll("li");
          listItems.forEach(function(item) {
            item.onclick = function(e) {
              // continue here
              for(let key in data){
              let liChecked = this.innerText;
              console.log(liChecked)
              if(liChecked == childData.name){
                changeVideo(childData.name , childData.src_video , childData.url)
              }
            }
            }
          });

        }
      }
    } else {
      console.log('No data available.');
    }

 


  }).catch((error) => {
    console.error('Error fetching data:', error);
  });

function newEpisode(name,uid, src_video,url){
    set(ref(database,"episode/"+uid),{
            name:name,
            uid:uid,
            src_video: src_video,
            url: url
    })
    alert("added done !")
}



// newEpisode("أساسيات جافا 1 : المصفوفات | arrays","arrays", `<iframe width="1257" height="707" src="https://www.youtube.com/embed/ido9UlVCsVQ" title="طلال مداح | انتهينا .. وجفت الدمعة الحزينة ( خلصت القصة ) ! HQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`, "#")
// newEpisode("أساسيات جافا 1 : أنواع البيانات | data type","data-type", `<iframe width="1257" height="707" src="https://www.youtube.com/embed/WQ7mvQFSmYc" title="Primitives Data Types In Java - All the Primitives And What They Do" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`, "#")
// newEpisode("أساسيات جافا 1 : أنواع dsadasd | data type","data-type", `<iframe width="1257" height="707" src="https://www.youtube.com/embed/WQ7mvQFSmYc" title="Primitives Data Types In Java - All the Primitives And What They Do" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`, "#")
