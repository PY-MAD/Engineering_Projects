import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getDatabase,onValue, child, get, set, update, remove, onChildAdded, ref } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth,onAuthStateChanged,signOut,} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getStorage, uploadBytes , getDownloadURL , ref as refStroage } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

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
const database = getDatabase(app);
const auth = getAuth();
const storage = getStorage(app);
get(ref(database, "/cards/")).then((snap)=>{
    let select = document.getElementById("subjects")
    function addSubjects(name , uid){
        let q = `
            <option class="${uid}">${name}</option>
        `
        return select.innerHTML += q;
    }
    let data = snap.val()
    for(let i in data){
        let name = data[i].name;
        let id = data[i].uid;
        addSubjects(name , id)
    }
})

get(ref(database, "/blog/")).then((snap)=>{
    let data = snap.val()
    let send = document.getElementById("send-blog");
    send.addEventListener("click",()=>{
        const file = document.querySelector("#photo").files[0];
        const name = +new Date() + "-" + file.name;
        const metadata = {
            contentType: file.type
        };
        const storageRef = refStroage(storage, name);

        uploadBytes(storageRef, file, metadata)
            .then(uploadTaskSnapshot => getDownloadURL(uploadTaskSnapshot.ref))
            .then(url => {
                let title = document.querySelector("#sectionAdd .title");
                let pra = document.querySelector("#sectionAdd .pra");
                let uniqeId = new Date().getTime();
                let getSub = document.getElementById("subjects").value;
        
                set(ref(database,`/blog/${getSub}/${uniqeId}`),{
                    title:title.value,
                    pra:pra.value,
                    imgUrl: url
                })

                title.value = ""
                pra.value = ""
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
            .catch(error => {
                console.error(error);
                errorMsgElement.textContent = 'Error uploading image.';
            });

    })

})