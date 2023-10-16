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
    function getId() {
            let nameFav = document.querySelector(".fav");

            for(let i = 0; i< nameFav.length; i++){
                    if(nameFav[i].checked){
                            console.log(nameFav[i])
                    }
            }
    }
    function createEpisode(name, src, uid){
            
            let episode = `
            <li>
            <a href="${src}" id="${uid}">
               ${name}
            </a>
        </li>
                  
            `

            return tempEpisodes.innerHTML += episode;
    }
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const childData = data[key];
          createEpisode(childData.name,childData.src,childData.uid)
        }
      }
    } else {
      console.log('No data available.');
    }
  }).catch((error) => {
    console.error('Error fetching data:', error);
  });

function newEpisode(name , src ,uid){
    set(ref(database,"episode/"+uid),{
            name:name,
            src:src,
            uid:uid
    })
    alert("added done !")
}
// newEpisode("أساسيات جافا 1 : المصفوفات | arrays","/user/java-1/arrays.html","arrays")