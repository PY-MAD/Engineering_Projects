  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase, ref,onValue , get, child} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
  import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
  let name = document.getElementById("user-name")
  let avatar = document.getElementById("user-Photo")

  let maleAvatar = "/assets/svg/userAvater/male.svg"
  let femaleAvatar = "/assets/svg/userAvater/female.svg"



  auth.onAuthStateChanged(user =>{


    if(user){
      const dbRef = ref(getDatabase());

      get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        const snap = snapshot.val();
        if (snapshot.exists()) {
          name.innerHTML+= `اهلًا ${snap.username}`
          if(snap.gender == "male")
            avatar.src = maleAvatar;
          else
            avatar.src = femaleAvatar;
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });


    }else{
        console.log("the user not logged in")

    }
  })
  signOutBtn.addEventListener('click', (e)=>{
    signOut(auth).then(() => {
      window.open("/index.html","_self")
    }).catch((error) => {
      alert(error)
    });
  })
// let email = "mad@gmail.com"

// function newEmail(email){
//     let newEmail = "";
//     for(let i = 0; i < email.length; i++){
//         if(email[i] == "@"){
//             newEmail+="#"
//         }else{
//             newEmail+=email[i];
//         }
//     }
//     return newEmail;
// }
// console.log(newEmail(email))


// setTimeout(() => {
//     console.log("this is the first message");
//   }, 5000);
//   setTimeout(() => {
//     console.log("this is the second message");
//   }, 3000);
//   setTimeout(() => {
//     console.log("this is the third message");
//   }, 1000);
  
  // Output:
  
  // this is the third message
  // this is the second message
  // this is the first message
  
// api to get ipAddress
// Function to get the user's IP address using a third-party service

// Call the function to get the user's IP address

