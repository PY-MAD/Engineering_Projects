import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getDatabase, ref ,onValue, child, get, set, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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
const dbRefUser = ref(database , "users/")
const dbRef = ref(database, '/cards/'); // Reference to the root of the database
const auth = getAuth();

let holderSec = document.getElementById("container")

get(dbRef).then((snapshot) =>{
    function createCards(name, pra, src_photo , uid){
                
        let card_template = `
                <div class="card-container">
                <input type="checkbox" id="${uid}" value="${uid}" class="fav" name="fav"/>
                <label for="${uid}"></label>
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
        `

        return holderSec.innerHTML += card_template;
}
if (snapshot.exists()) {
    const data = snapshot.val();
    console.log(data)
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const childData = data[key];

    }
    }
}else {
    console.log('No data available.');
  }
}).catch((error) => {
  console.error('Error fetching data:', error);
});