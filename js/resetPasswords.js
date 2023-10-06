  // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
    import { getDatabase } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
    import { getAuth, sendPasswordResetEmail   } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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


var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var string_length = 8;
var randomstring = '';
for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
}



// function updatePassword(){
//     const auth = getAuth();
//     sendPasswordResetEmail(auth, email)
//       .then(() => {
//         // Password reset email sent!
//         alert("send it !!!!!")
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         alert(errorMessage)
//         alert(email)
//       });
    
// }
resetPassword.addEventListener('click',(e) =>{
    let email = document.getElementById("email").value;
    alert(auth)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        alert("send it !!!!!")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        alert(email)
      });

    // Email.send({
    //     Host : "smtp.elasticemail.com",
    //     Username : "ourclass06@gmail.com",
    //     Password : "A70E2DF54FA750F9F94B2AAF44A5E1B2C80A",
    //     To : `${email}`,
    //     From : "ourclass06@gmail.com",
    //     Subject : "HIII",
    //     Body : `your New Password is ${randomstring}`
    // }).then(
    //   message => alert(message)
    // );
    // alert("send is completed !!!")
    // updatePassword(randomstring);

})

