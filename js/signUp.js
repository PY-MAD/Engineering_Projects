  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
  signUpNew.addEventListener('click', (e) =>{

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("name").value;
    function getRadioValue(){
      let gender = document.getElementsByName("gender");
      for(let i = 0; i<gender.length; i++){
        if(gender[i].checked)
          return(gender[i].value);
      }
    }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                set(ref(database, 'users/'+username),{
                    email: email,
                    password: password,
                    gender:getRadioValue()
                });
                alert("Account created !")
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
  loginExistAccount.addEventListener('click',(e) =>{

    let email = document.getElementById("email1").value;
    let password = document.getElementById("password1").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      let dt = new Date();
      update(ref(database, 'users/'+user.uid),{
        last_login : dt,
    });
    alert("User logged in!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
  })