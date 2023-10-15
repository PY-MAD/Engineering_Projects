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
function AccountMissing(){
  blurBackground()
  return body.innerHTML+=`
      <div class="container-missing-account">
      <div class="card-missing-account">
          <div class="content">
              <div class="missing-account-img">
                  <img src="/assets/svg/missing-account.min.svg" alt="">
              </div>
              <div class="text">
                  <div class="big-font">
                      أهلًا بصديقنا
                  </div>
                  <div class="middle-font">
                              نتوقع أنك مو مسجل دخول في منصتنا <br>الرجاء التسجيل للإستفادة من كامل خدماتنا
                  </div>
                  <a class="link-sign" href="/authentication/login.html">التسجيل</a>
              </div>
          </div>
      </div>
    </div>
  `
}




BeforepreloaderPage();
  auth.onAuthStateChanged(user =>{


    if(user){
      const dbRef = ref(getDatabase());

      get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        const snap = snapshot.val();
        if (snapshot.exists()) {
          
          name.innerHTML+= `اهلًا ${snap.username}`
          if(snap.gender == "male"){
            avatar.src = maleAvatar;
          }else{
            avatar.src = femaleAvatar;
          }
          AfterpreloaderPage()
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }else{
      AccountMissing()
    }
    
  })
  signOutBtn.addEventListener('click', (e)=>{
    signOut(auth).then(() => {
      window.open("/index.html","_self")
    }).catch((error) => {
      alert(error)
    });
  })