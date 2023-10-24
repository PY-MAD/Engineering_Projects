import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyAPs6u-21i0E9mxGXWhdlFiCKpkuhrPpBc",
  authDomain: "test-ab03a.firebaseapp.com",
  databaseURL:
    "https://test-ab03a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-ab03a",
  storageBucket: "test-ab03a.appspot.com",
  messagingSenderId: "19444872261",
  appId: "1:19444872261:web:69de8c91e006b58aa8df2c",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbRef = ref(database, "/cards/"); // Reference to the root of the database// Reference to the root of the database
const auth = getAuth();

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
function fetchingData(){
  preloader.classList.add("show-preloader");
  blur.classList.add("show-blur");
  preloader.classList.remove("none-preloader");
  blur.classList.remove("none-blur");
}
function fetchingDataDone(){
  preloader.classList.remove("show-preloader");
  blur.classList.remove("show-blur");
  preloader.classList.add("none-preloader");
  blur.classList.add("none-blur");
}
let body = document.getElementById("body");
function blurBackground() {
  preloader.classList.add("none-preloader");
  blur.classList.add("show-blur");
}


auth.onAuthStateChanged((user)=>{
    if(user){
        let ulHandler = document.getElementById("listChat")
        let chatHandler = document.getElementById("chat")
        let btnSend = document.querySelector("#send")
        let text = document.getElementById("text").value
        let name = "";
        get(ref(database, "users/"+user.uid)).then((userData)=>{
            let data = userData.val()
            name = data.username;
        let currentId = null;
        function createChat(name, uid){
            let chat =`
                <li id=${uid}>${name}</li>
            `;
            return ulHandler.innerHTML+=chat;
        }
        function createMsg(msg,name){
            let msgChat = `
            <div class="msg-continer">
            <div class="avatar-msg">
                <img src="/assets/svg/userAvater/male.svg" alt="">

                <div class="msg-contaner">
                <div class="name">
                    ${name}
                </div>
                    <div class="msg">
                        ${msg}
                    </div>
                </div>
            </div>
        </div>
            `
            return chatHandler.innerHTML+= msgChat;
        }
        function restiveMsg(msg,name){
            let msgChat = `
            <div class="msg-continer received">
            <div class="avatar-msg received-msg">
                <img src="/assets/svg/userAvater/male.svg" alt="">

                <div class="msg-contaner">
                <div class="name">
                    ${name}
                </div>
                    <div class="msg">
                        ${msg}
                    </div>
                </div>
            </div>
        </div>
            `
            return chatHandler.innerHTML+= msgChat;
        }
        function createChannel(msg , name , id){
            let nowDate = Date.now();
            set(ref(database, `/chat/${id}/${nowDate}`),{
                name:name,
                msg:msg,
            })
        }
        
    
        
        let databaseRef = ref(getDatabase())
        get(ref(database, "/cards/")).then((cardData)=>{
                let card = cardData.val();
                for(let i in card){
                    let name = card[i].name;
                    let id = card[i].uid;
                    createChat(name,id);
                }
            })
            fetchingData()
            setTimeout(()=>{
                let allList = document.querySelectorAll("#listChat li")
                console.log(allList)

                    setTimeout(()=>{


                        fetchingDataDone()
                        allList.forEach((item) => {

                            item.addEventListener("click", (e) => {
                                chatHandler.innerText = ""
                                // Update the currentId when a list item is clicked
                                currentId = item.id;
                                console.log(currentId)
                                // Highlight the selected list item
                                allList.forEach((all) => {
                                    let ides = all.id;
                                    if (ides == currentId) {
                                        all.classList.add("active-chat");
                                    } else {
                                        all.classList.remove("active-chat");
                                    }
                                });
                                onChildAdded(ref(database, `/chat/${currentId}`), (data) => {
                                    let chatData = data.val();
                                    console.log(chatData)
                                    if (chatData.name == name) {
                                        createMsg(chatData.msg, chatData.name);
                                    } else {
                                        restiveMsg(chatData.msg, chatData.name);
                                    }
                                }); 
                            
                            
                            });




                        });
                                
                        
                                // Rest of your code to handle the chat for the selected item
                                get(ref(database, "/chat/")).then((chatData) => {
                                    let snapChatData = chatData.val();
                                    btnSend.addEventListener("click", () => {
                                        let text = document.getElementById("text").value;
                                        if (currentId) {
                                            createChannel(text, name, currentId);
                                        }
                                        document.getElementById("text").value = "";
                                    });
                                    
                                    document.addEventListener("keydown", (e) => {
                                        let text = document.getElementById("text").value;
                                        if (e.keyCode == 13) {
                                            if (currentId) {
                                                createChannel(text, name, currentId);
                                            }
                                            document.getElementById("text").value = "";
                                        }
                                    });

                                });

                    },2000)


            },1000)



        // end of fetch userData
        })







        // end of auth user
    }
})