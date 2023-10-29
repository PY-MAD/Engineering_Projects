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
let btnAdd = document.querySelector("#add");
let form = document.querySelector(".form-addEpisode")
let background = document.querySelector(".background-black")
btnAdd.addEventListener("click",()=>{
    form.classList.add("active-form")
    background.classList.add("active-form")

})


function generateEmbedCode(videoUrl) {
    var videoId = getYouTubeVideoId(videoUrl);
    if (videoId) {
        var embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        return embedCode;
    } else {
        alert("Invalid YouTube URL. Please enter a valid YouTube video URL.");
    }
}

function getYouTubeVideoId(url) {
    var videoId = url.match(/(?:\?v=|\/embed\/|\/watch\?v=|\/\d{1,2}x\d{1,2}\/|\/v\/|\/e\/|\?v=|\/(?=\d{11}\z))/);

    if (videoId) {
        return url.split(videoId[0])[1].split(/[?&]/)[0];
    }
    return null;
}

let sendBtn = document.getElementById("send")
sendBtn.addEventListener("click",()=>{
    let title = document.getElementById("title").value
    let url = document.getElementById("url").value
    let embed = generateEmbedCode(url)
    set(ref(database,`/episode/${form.id}/${title}`),{
        title:title,
        url:url,
        embed:embed
    })
    form.classList.remove("active-form")
    background.classList.remove("active-form")
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'success',
        title: 'تم إنشاء المحتوى بنجاح !!!'
    })
    
})