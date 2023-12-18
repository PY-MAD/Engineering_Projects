  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAPs6u-21i0E9mxGXWhdlFiCKpkuhrPpBc",
    authDomain: "test-ab03a.firebaseapp.com",
    databaseURL: "https://test-ab03a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-ab03a",
    storageBucket: "test-ab03a.appspot.com",
    messagingSenderId: "19444872261",
    appId: "1:19444872261:web:69de8c91e006b58aa8df2c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app)
  const auth = getAuth();

// get Ip to open سيشن

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
function deleteCookies() {
  var Cookies = document.cookie.split(';');

  // set 1 Jan, 1970 expiry for every cookies
  for (var i = 0; i < Cookies.length; i++)
    document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
  console.log("clear cookies !!!")
}

  //get email
  function newEmail(email){
    let newEmail = "";
    for(let i = 0; i < email.length; i++){
        if(email[i] == "."){
            continue;
        }else{
            newEmail+=email[i];
        }
    }
    return newEmail;
}
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("name").value;
    let accountCreated = document.querySelector(".Account-created");

    function getRadioValue(){
      let gender = document.getElementsByName("gender");
      for(let i = 0; i<gender.length; i++){
        if(gender[i].checked)
          return(gender[i].value);
      }
    }
  signUpNew.addEventListener('click', (e) =>{

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("name").value;
    let majorSelect = document.querySelector("#major");
    let major = majorSelect.options[majorSelect.selectedIndex].value;
    let accountCreated = document.querySelector(".Account-created");
    let signUpDate = moment().format()
    function getRadioValue(){
      let gender = document.getElementsByName("gender");
      for(let i = 0; i<gender.length; i++){
        if(gender[i].checked)
          return(gender[i].value);
      }
    }
    let getStartCode = document.getElementById("startCode").value
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 

                const user = userCredential.user;
                set(ref(database, 'users/'+user.uid),{
                    username: username,
                    password: password,
                    gender:getRadioValue(),
                    email:email,
                    fav:[""],
                    signUpDate : signUpDate,
                    major: major,
                    score: 0,
                    startCode:getStartCode
                });
                Swal.fire("تم تسجيل حسابك بنجاح","تقدر الان تسوي تسجيل دخول","success")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // ..
            });
  })

// log in user
// Listen for the "keypress" event on the document
document.addEventListener("keypress", (key) => {
  BeforepreloaderPage();

  if (key.keyCode == 13) {
    const email = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const signInTime = moment().format();

        // Update the user's last_login timestamp in the database
        const userRef = ref(database, 'users/' + user.uid);
        update(userRef, {
          last_login: signInTime,
        });
        deleteCookies()
        setTimeout(() => {
          window.open("/user/home.html", "_self");
        }, 700);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }
});

// Assuming you have an HTML element with id "loginExistAccount"
const loginExistAccount = document.getElementById("loginExistAccount");

loginExistAccount.addEventListener('click', (e) => {
  const email = document.getElementById("email1").value;
  const password = document.getElementById("password1").value;
  const signInTime = moment().format();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // Update the user's last_login timestamp in the database
      const userRef = ref(database, 'users/' + user.uid);
      update(userRef, {
        last_login: signInTime,
      });
      deleteCookies()
      setTimeout(() => {
        window.open("/user/home.html", "_self");
      }, 700);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
