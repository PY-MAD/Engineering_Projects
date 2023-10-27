import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getDatabase, ref,onValue, child, get, set, update, remove, onChildAdded } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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
const auth = getAuth();
function addEvent(name, description, from, to, color) {
    $('#calendar').evoCalendar('addCalendarEvent', {
        id: new Date().getTime(), // You can use a unique identifier for the event
        name: name,
        date: [from, to], 
        description: description,
        type: "event",
        color: color
    });
}

$(document).ready(function() {
    $('#calendar').evoCalendar({
        theme: 'Royal Navy',
    });
});







let months = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
let month = document.querySelectorAll(".formmonth")
let day = document.querySelectorAll(".formDay")

function addMonth(){
    for(let i = 0; i<day.length; i++){
        let monthInput = month[i]
        for(let j = 0 ; j<months.length; j++){
            let q = `<option>${months[j]}</option>`
            monthInput.innerHTML += q;
        }
    }
}
function addDay(num , FromORto){
    FromORto.innerHTML = " ";
    for(let j =1; j<=num; j++){
        let q = `<option>${j}</option>`
        FromORto.innerHTML += q;
    }
}
addMonth()

month.forEach((item)=>{
    item.addEventListener("click",()=>{
        if(item.value != ""){
            let monthId = item.id;
            let value = item.value;
            let numDays = 0;
            let fromDay = "";
            if(monthId == "Frommonth"){
                fromDay = document.getElementById("Fromday");
                fromDay.removeAttribute("disabled")
            }else{
                fromDay = document.getElementById("Today");
                fromDay.removeAttribute("disabled")
            }
            for(let i = 0 ; i<months.length; i++){
                if(value == months[i]){
                    if(value == "February"){
                        numDays = 28;
                    }else if(i % 2 == 0 ){
                        numDays = 30;
                    }else{
                        numDays = 31
                    }
                }
            }
            addDay(numDays , fromDay)

        }
    })
})

let showEvent = document.getElementById("addEvent")
let fromDate = document.getElementById("formDate")
showEvent.addEventListener("click",()=>{
    if(fromDate.classList.contains("unactive-formDate")){
        fromDate.classList.remove("unactive-formDate")
    }else{
        fromDate.classList.add("unactive-formDate")
    }
})


let year = moment().year();
let from = "";
let to = "";
let add = document.getElementById("AddbtnEvent")
add.addEventListener("click",()=>{
    let titleDate = document.getElementById("titleEvent").value;
    let color = document.getElementById("picker-color").value;
    let praEvent = document.getElementById("praEvent").value
    let from = ""
    for(let i = 0; i<month.length; i++){
        let monthD = month[i].value;
        let dayD = day[i].value
        if(i == 0){
            from+= `${monthD}/${dayD}/${year}`
        }else{
            to+= `${monthD}/${dayD}/${year}`
        }
    }
    
    set(ref(database, `/event/${new Date().getTime()}`),{
        titleDate: titleDate,
        disc : praEvent,
        from:from,
        to:to,
        color:color,
    })
})



onChildAdded(ref(database, `/event/`) , (event)=>{
    let data = event.val()
    addEvent(data.titleDate , data.disc , data.from , data.to , data.color)
})

// addEvent(titleDate , from , to, praEvent, color )