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
        function createChat(name, uid){
            let chat =`
                <li id=${uid}>${name}</li>
            `;
            return ulHandler.innerHTML+=chat;
        }
        function createMsg(msg,name){
            let msgChat = `
            <div class="msg-continer">
            <span class="avatar-msg">
                <img src="/assets/svg/userAvater/male.svg" alt="">

                <span class="msg-contaner">
                <div class="name">
                    ${name}
                </div>
                    <span class="msg">
                        ${msg}
                    </span>
                </span>
            </span>
        </div>
            `
            return chatHandler.innerHTML+= msgChat;
        }
        function restiveMsg(msg,name){
            let msgChat = `
            <div class="msg-continer received">
            <span class="avatar-msg received-msg">
                <img src="/assets/svg/userAvater/male.svg" alt="">

                <span class="msg-contaner">
                <div class="name">
                    ${name}
                </div>
                    <span class="msg">
                        ${msg}
                    </span>
                </span>
            </span>
        </div>
            `
            return chatHandler.innerHTML+= msgChat;
        }
        function createChannel(msg , name , id){
            function genRandonString() {
                        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
                        var charLength = 10;
                        var result = '';
                        for ( var i = 0; i < charLength; i++ ) {
                           result += chars.charAt(Math.floor(Math.random() * charLength));
                        }
                        return result;
                     }
            set(ref(database, `/chat/${id}/${genRandonString()}`),{
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
        get(child(databaseRef,`users/${user.uid}`)).then((snapshot)=>{
            let snap = snapshot.val();
            let name = snap.username;
            let allList = document.querySelectorAll("#listChat li");
            allList.forEach((item)=>{
                item.onclick = (e)=>{
                    chatHandler.innerHTML = "";
                    let text = item.textContent
                    let id = item.id;
                    allList.forEach((all)=>{
                        let ides = all.id;
                        if(ides == id){
                            all.classList.add("active-chat");
                        }else{
                            all.classList.remove("active-chat");
                        }
                    })
                    get(ref(database, "/chat/")).then((chatData)=>{
                        let snapChatData =chatData.val()
                        if(snapChatData == null){
                            btnSend.addEventListener("click",()=>{
                                let text = document.getElementById("text").value
                                createChannel(text,name , id)
                                document.getElementById("text").value = ""
                            })
                            document.addEventListener("keydown",(e)=>{
                                let text = document.getElementById("text").value
                                if(e.keyCode == 13){
                                    createChannel(text,name , id)
                                    document.getElementById("text").value = ""
                                }
                            })
                        }else{
                            btnSend.addEventListener("click",()=>{
                                let text = document.getElementById("text").value
                                createChannel(text,name , id)
                                document.getElementById("text").value = ""
                            })
                            document.addEventListener("keydown",(e)=>{
                                let text = document.getElementById("text").value
                                if(e.keyCode == 13){
                                    createChannel(text,name , id)
                                    document.getElementById("text").value = ""
                                }
                            })
                        }
                        onChildAdded(ref(database, `/chat/${id}`), (data)=>{
                            let chatData = data.val();
                            if(chatData.name == name){
                                createMsg(chatData.msg, chatData.name)
                                
                            }else{
                                restiveMsg(chatData.msg, chatData.name) 
                            }
                        })
                    })
                }
            })
        })
    }
})