    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

    import { getDatabase, ref,onValue, child, get, set, update, remove, onChildAdded,push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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
get(ref(database, "roadmap/")).then((snap)=>{
    let data = snap.val();
    let getMajor = document.getElementById("getMajor")
    let checkMajor = getMajor.value
    let sub = ""
    let hour = "";
    let code = ""
    let level = ""
    let container = document.querySelector(".container-levels")
    function addLevel(e){
        let q =
        `
        <div class="level d-flex align-items-center mb-5" id="${e}"></div>
        `
        return container.innerHTML += q;
    }
    function addSubjects(s,c,ho , h){
        let q = `
            <div class="subjects_box d-flex flex-column active_orange ${h}" id="${c}">
                <span class="pd-top-bottom">${s}</span>
                <span>${c}</span>
                <span class="pd-bottom">${ho}</span>
            </div>
        `
        return document.getElementById(h).innerHTML += q;
    }
    function addLevelCont(e, h){
        let q = `
            <div class="level_box ml-2 ${h}">المستوى ${e}</div>
            `
        return document.getElementById(h).innerHTML += q;
    }
    let currentLevel = document.getElementById("current_level")
    function addCureentSub(s,c,ho , h){
        let q = `
        <div class="subjects_box d-flex flex-column active_orange ${h}" id="current_${c}">
            <span class="pd-top-bottom">${s}</span>
            <span>${c}</span>
            <span class="pd-bottom">${ho}</span>
        </div>
        `
        return currentLevel.innerHTML += q;
    }
    var
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
    fixNumbers = function (str)
    {
    if(typeof str === 'string')
    {
        for(var i=0; i<10; i++)
        {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    return str;
    };
    auth.onAuthStateChanged((user)=>{
        let uid = user.uid;
        get(ref(database, `users/${uid}`)).then((snap)=>{
            let data = snap.val();
            let major = data.major
            let startCode = data.startCode;
            let shortCutMajor = ""
            let getMajor = document.getElementById("getMajor")
            if(major == "علوم الحاسب"){
                shortCutMajor = "CS_"+startCode
            }
            else if(major == "نظم المعلومات"){
                shortCutMajor = "IS_"+startCode
            }
            else if(major == "تقنية المعلومات"){
                shortCutMajor = "IT_"+startCode
            }
            let options = getMajor.options;
            for(let i in options){
                if(options[i].value == shortCutMajor){
                    options[i].selected  = true;
                    checkMajor = shortCutMajor
                    break;
                }
            }
            get(ref(database, "roadmap")).then((snap)=>{
                let data = snap.val();
                for(let i in data){
                    if(i == shortCutMajor){
                        console.log("hi")
                        document.querySelector(".container-levels").innerHTML = ""
                        get(ref(database, `roadmap/${i}`)).then((snap)=>{
                            let data = snap.val();
                            let arrayToSorted = []
                            for(let i in data){
                                arrayToSorted.push(i)
                            }
                            arrayToSorted.sort(function(a, b) {
                                var numA = parseInt(a.match(/\d+/)[0], 10); // Extract numeric part and convert to integer
                                var numB = parseInt(b.match(/\d+/)[0], 10);
                            
                                return numA - numB;
                            });
                            for(let i in arrayToSorted){
                                let j = arrayToSorted[i]
                                addLevel(j);
                            }
                            for(let i in data){
                                level = i;
                                let num = "";
                                for(let i in level){
                                    if(level[i] == "_" && !level.includes("option")){
                                        for(let j = ++i; j<level.length; j++){
                                        num += level[j]
                                        }
                                        addLevelCont(num, level)
                                    }
                                }
                                if(level.includes("option")){
                                    let num = ""
                                    let splitLv = level.split("_")
                                    for(let i = 0; i<splitLv.length; i++){
                                        let check = Number(splitLv[i])
                                        if(!isNaN(check)){
                                            num = splitLv[i]
                                            num+= " إختياري"
                                            addLevelCont(num, level)
                                        }
    
                                    }
                                }
                                for(let i in data[level]){
                                    sub = data[level][i].sub
                                    code = data[level][i].code
                                    hour = data[level][i].hour
                                    addSubjects(sub , code , hour , level)
                                }
                                let lv = document.querySelectorAll(`#${level} .subjects_box`)
                                for(let i = 0; i<lv.length; i++){
                                        lv[0].classList.add("start")
                                        let q = lv.length - 1
                                        lv[q].classList.add("subjects_box_end")
                                        lv[q].classList.add("active_orange")
                                }
                            }
                            let lvLevel = document.querySelectorAll(`.level .level_box`);
                            lvLevel.forEach((item)=>{
                                item.addEventListener("click",()=>{
                                    let classLists = item.classList;
                                    let len = classLists.length;
                                    let id = classLists[len-1]
                                    let subjects = document.querySelectorAll(`#${id} .subjects_box`)
                                    let orange = [];
                                    let green = []
                                    subjects.forEach((item)=>{
                                        if(item.classList.contains("active_orange")){
                                            orange.push(item.id);
                                        }else if(item.classList.contains("active_green")){
                                            green.push(item.id);
                                        }
                                    })
                                    if(subjects.length == green.length){
                                        subjects.forEach((item)=>{
                                            item.classList.remove("active_green")
                                            item.classList.add("active_orange")
                                            let totalHourDone = document.getElementById("total-hours-done")
                                            let child = item.children
                                            let hour = child[2].textContent
                                            let fixHour = fixNumbers(hour)
                                            totalHourDone.innerHTML = Number(totalHourDone.textContent) - Number(fixHour)
                                            auth.onAuthStateChanged((user)=>{
                                                let uid = user.uid;
                                                get(ref(database, `users/${uid}/SubjectsDone`)).then((snap)=>{
                                                    let data = snap.val();
                                                    for(let i in data){
                                                        if(data[i] == item.id)
                                                            remove(ref(database, `users/${uid}/SubjectsDone/${i}`))
                                                    }
                                                })
                                            })
                                        })
                                    }else{
                                        subjects.forEach((item)=>{
                                            if(item.classList.contains("active_red")){
                                                item.classList.remove("active_red")
                                                auth.onAuthStateChanged((user)=>{
                                                    let uid = user.uid;
                                                    get(ref(database, `users/${uid}/SubjectsDone`)).then((snap)=>{
                                                        let data = snap.val();
                                                        for(let i in data){
                                                            if(data[i] == item.id)
                                                                remove(ref(database, `users/${uid}/nextSemester/${i}`))
                                                        }
                                                    })
                                                })
                                            }
                                            item.classList.add("active_green")
                                            let totalHourDone = document.getElementById("total-hours-done")
                                            let child = item.children
                                            let hour = child[2].textContent
                                            let fixHour = fixNumbers(hour)
                                            totalHourDone.innerHTML = Number(totalHourDone.textContent) + Number(fixHour)
                                            item.classList.remove("active_orange")
                                            auth.onAuthStateChanged((user)=>{
                                                let uid = user.uid;
                                                push(ref(database, `users/${uid}/SubjectsDone/`),item.id)
                                            })
                                        })
                                    }
                                    
                                })
                            })
                            auth.onAuthStateChanged((user)=>{
                                let uid = user.uid;
                                let lv = document.querySelectorAll(`.level div`);
                                get(ref(database, `users/${uid}/SubjectsDone`)).then((snap)=>{
                                    let data = snap.val();
                                    for(let i in data){
                                        lv.forEach((item)=>{
                                            if(data[i] == item.id){
                                                item.classList.remove("active_orange")
                                                item.classList.add("active_green")
                                                let totalHourDone = document.getElementById("total-hours-done")
                                                let child = item.children
                                                let hour = child[2].textContent
                                                let fixHour = fixNumbers(hour)
                                                totalHourDone.innerHTML = Number(totalHourDone.textContent) + Number(fixHour)
                                            }
                                        })
                                    }
                                })
                                get(ref(database, `users/${uid}/nextSemester`)).then((snap)=>{
                                    let data = snap.val();
                                    for(let i in data){
                                        lv.forEach((item)=>{
                                            if(data[i] == item.id){
                                                item.classList.remove("active_orange")
                                                item.classList.add("active_red")
                                                let child = item.children
                                                let sub = child[0].textContent
                                                let code = child[1].textContent
                                                let hour = child[2].textContent
                                                let totalHour = document.getElementById("total-hours-update");
                                                let fixHour = fixNumbers(hour)
                                                if((Number(totalHour.textContent) + Number(fixHour)) <= 16){
                                                        item.classList.remove("active_orange")
                                                        item.classList.add("active_red")
                                                        addCureentSub(sub,code,hour,"current_level")
                                                        totalHour.innerHTML = Number(totalHour.textContent) + Number(fixHour);
                                                }
                                            }
                                        })
                                    }
                                })
                            })
                            let lv = document.querySelectorAll(`.level div`)
                            lv.forEach((item)=>{
                                item.addEventListener("click",()=>{
                                    let currentLevel = document.getElementById("current_level")
                                    if(!item.classList.contains("level_box")){
                                        if(item.classList.contains("active_green")){
                                            item.classList.remove("active_green");
                                            item.classList.add("active_orange");

                                            let totalHourDone = document.getElementById("total-hours-done")
                                            let child = item.children
                                            let hour = child[2].textContent
                                            let fixHour = fixNumbers(hour)
                                            totalHourDone.innerHTML = Number(totalHourDone.textContent) - Number(fixHour)


                                            let id = item.id;
                                            auth.onAuthStateChanged((user)=>{
                                                let uid = user.uid;
                                                get(ref(database, `users/${uid}/SubjectsDone`)).then((snap)=>{
                                                    let data = snap.val();
                                                    for(let i in data){
                                                        if(data[i] == id){
                                                            remove(ref(database, `users/${uid}/SubjectsDone/${i}`));
                                                            remove(ref(database, `users/${uid}/nextSemester/${i}`));
                                                        }
                                                    }
                                                })
                                            })
                                        }
                                        else if(item.classList.contains("active_red")){
                                            item.classList.remove("active_red")
                                            item.classList.add("active_green")
                                            let child = item.children
                                            let hour = child[2].textContent
                                            let id = item.id;
                                            let childNode = document.getElementById(`current_${id}`)
                                            let totalHour = document.getElementById("total-hours-update");
                                            let fixHour = fixNumbers(hour)
                                            totalHour.innerHTML = Number(totalHour.textContent) - Number(fixHour)
                                            currentLevel.removeChild(childNode)

                                            let totalHourDone = document.getElementById("total-hours-done")
                                            totalHourDone.innerHTML = Number(totalHourDone.textContent) + Number(fixHour)

                                            auth.onAuthStateChanged((user)=>{
                                                let uid = user.uid
                                                push(ref(database, `users/${uid}/SubjectsDone`),id);
                                                get(ref(database, `users/${uid}/nextSemester`)).then((snap)=>{
                                                    let data = snap.val();
                                                    for(let i in data){
                                                        if(data[i] == id){
                                                            remove(ref(database, `users/${uid}/nextSemester/${i}`));
                                                        }
                                                    }
                                                })
                                            })
                                        }
                                        else if(item.classList.contains("active_orange")){
                                            let child = item.children
                                            let sub = child[0].textContent
                                            let code = child[1].textContent
                                            let hour = child[2].textContent
                                            let totalHour = document.getElementById("total-hours-update");
                                            let fixHour = fixNumbers(hour)
                                            if((Number(totalHour.textContent) + Number(fixHour)) <= 16){
                                                    item.classList.remove("active_orange")
                                                    item.classList.add("active_red")
                                                    addCureentSub(sub,code,hour,"current_level")
                                                    totalHour.innerHTML = Number(totalHour.textContent) + Number(fixHour);
                                                    push(ref(database, `users/${uid}/nextSemester`),code)
                                            }else{
                                                const Toast = Swal.mixin({
                                                    toast: true,
                                                    position: "top-end",
                                                    showConfirmButton: false,
                                                    timer: 3000,
                                                    timerProgressBar: true,
                                                    didOpen: (toast) => {
                                                        toast.onmouseenter = Swal.stopTimer;
                                                        toast.onmouseleave = Swal.resumeTimer;
                                                    }
                                                });
                                                Toast.fire({
                                                    icon: "error",
                                                    title: "الساعات تعدت الحد المسموح ولا يمكن إضافة هذي المادة"
                                                });
                                            }
    
                                        }
                                    }
    
                                })
                            })
                        })
                    }
                }
            })
        })
    })
    getMajor.addEventListener("click",()=>{
        if(getMajor.value != checkMajor){
            console.log(getMajor.value)
            checkMajor = getMajor.value;
            for(let i in data){
                if(i == checkMajor){
                    document.querySelector(".container-levels").innerHTML = ""
                    get(ref(database, `roadmap/${i}`)).then((snap)=>{
                        let data = snap.val();
                        let arrayToSorted = []
                        for(let i in data){
                            arrayToSorted.push(i)
                        }
                        arrayToSorted.sort(function(a, b) {
                            var numA = parseInt(a.match(/\d+/)[0], 10); // Extract numeric part and convert to integer
                            var numB = parseInt(b.match(/\d+/)[0], 10);
                        
                            return numA - numB;
                        });
                        for(let i in arrayToSorted){
                            let j = arrayToSorted[i]
                            addLevel(j);
                        }
                        for(let i in data){
                            level = i;
                            let num = "";
                            for(let i in level){
                                if(level[i] == "_" && !level.includes("option")){
                                    for(let j = ++i; j<level.length; j++){
                                    num += level[j]
                                    }
                                    addLevelCont(num, level)
                                }
                            }
                            if(level.includes("option")){
                                let num = ""
                                let splitLv = level.split("_")
                                for(let i = 0; i<splitLv.length; i++){
                                    let check = Number(splitLv[i])
                                    if(!isNaN(check)){
                                        num = splitLv[i]
                                        num+= " إختياري"
                                        addLevelCont(num, level)
                                    }

                                }
                            }
                            for(let i in data[level]){
                                sub = data[level][i].sub
                                code = data[level][i].code
                                hour = data[level][i].hour
                                addSubjects(sub , code , hour , level)
                            }
                            let lv = document.querySelectorAll(`#${level} .subjects_box`)
                            for(let i = 0; i<lv.length; i++){
                                    lv[0].classList.add("start")
                                    let q = lv.length - 1
                                    lv[q].classList.add("subjects_box_end")
                                    lv[q].classList.add("active_orange")
                            }
                        }
                        let lvLevel = document.querySelectorAll(`.level .level_box`);
                        lvLevel.forEach((item)=>{
                            item.addEventListener("click",()=>{
                                let classLists = item.classList;
                                let len = classLists.length;
                                let id = classLists[len-1]
                                let subjects = document.querySelectorAll(`#${id} .subjects_box`)
                                let orange = [];
                                let green = []
                                subjects.forEach((item)=>{
                                    if(item.classList.contains("active_orange")){
                                        orange.push(item.id);
                                    }else if(item.classList.contains("active_green")){
                                        green.push(item.id);
                                    }
                                })
                                if(subjects.length == green.length){
                                    subjects.forEach((item)=>{
                                        item.classList.remove("active_green")
                                        item.classList.add("active_orange")
                                        let totalHourDone = document.getElementById("total-hours-done")
                                        let child = item.children
                                        let hour = child[2].textContent
                                        let fixHour = fixNumbers(hour)
                                        totalHourDone.innerHTML = Number(totalHourDone.textContent) - Number(fixHour)
                                        auth.onAuthStateChanged((user)=>{
                                            let uid = user.uid;
                                            get(ref(database, `users/${uid}/SubjectsDone`)).then((snap)=>{
                                                let data = snap.val();
                                                for(let i in data){
                                                    if(data[i] == item.id)
                                                        remove(ref(database, `users/${uid}/SubjectsDone/${i}`))
                                                }
                                            })
                                        })
                                    })
                                }else{
                                    subjects.forEach((item)=>{
                                        if(item.classList.contains("active_red")){
                                            item.classList.remove("active_red")
                                            auth.onAuthStateChanged((user)=>{
                                                let uid = user.uid;
                                                get(ref(database, `users/${uid}/SubjectsDone`)).then((snap)=>{
                                                    let data = snap.val();
                                                    for(let i in data){
                                                        if(data[i] == item.id)
                                                            remove(ref(database, `users/${uid}/nextSemester/${i}`))
                                                    }
                                                })
                                            })
                                        }
                                        item.classList.add("active_green")
                                        item.classList.remove("active_orange")
                                        auth.onAuthStateChanged((user)=>{
                                            let uid = user.uid;
                                            push(ref(database, `users/${uid}/SubjectsDone/`),item.id)
                                        })
                                    })
                                }
                                
                            })
                        })
                        auth.onAuthStateChanged((user)=>{
                            let uid = user.uid;
                            let lv = document.querySelectorAll(`.level div`);
                            get(ref(database, `users/${uid}/SubjectsDone`)).then((snap)=>{
                                let data = snap.val();
                                for(let i in data){
                                    lv.forEach((item)=>{
                                        if(data[i] == item.id){
                                            item.classList.remove("active_orange")
                                            item.classList.add("active_green")
                                        }
                                    })
                                }
                            })
                        })
                        let lv = document.querySelectorAll(`.level div`)
                        lv.forEach((item)=>{
                            item.addEventListener("click",()=>{
                                let currentLevel = document.getElementById("current_level")
                                if(!item.classList.contains("level_box")){
                                    if(item.classList.contains("active_green")){
                                        item.classList.remove("active_green");
                                        item.classList.add("active_orange");

                                        let totalHourDone = document.getElementById("total-hours-done")
                                        let child = item.children
                                        let hour = child[2].textContent
                                        let fixHour = fixNumbers(hour)
                                        totalHourDone.innerHTML = Number(totalHourDone.textContent) - Number(fixHour)



                                        let id = item.id;
                                        auth.onAuthStateChanged((user)=>{
                                            let uid = user.uid;
                                            get(ref(database, `users/${uid}/SubjectsDone`)).then((snap)=>{
                                                let data = snap.val();
                                                for(let i in data){
                                                    if(data[i] == id){
                                                        remove(ref(database, `users/${uid}/SubjectsDone/${i}`));
                                                        remove(ref(database, `users/${uid}/nextSemester/${i}`));
                                                    }
                                                }
                                            })
                                        })
                                    }
                                    else if(item.classList.contains("active_red")){
                                        item.classList.remove("active_red")
                                        item.classList.add("active_green")
                                        let child = item.children
                                        let hour = child[2].textContent
                                        let id = item.id;
                                        let childNode = document.getElementById(`current_${id}`)
                                        let totalHour = document.getElementById("total-hours-update");
                                        let fixHour = fixNumbers(hour)
                                        totalHour.innerHTML = Number(totalHour.textContent) - Number(fixHour)
                                        let totalHourDone = document.getElementById("total-hours-done")
                                        totalHourDone.innerHTML = Number(totalHourDone.textContent) + Number(fixHour)
                                        currentLevel.removeChild(childNode)
                                        auth.onAuthStateChanged((user)=>{
                                            let uid = user.uid
                                            push(ref(database, `users/${uid}/SubjectsDone`),id);
                                            remove(ref(database, `users/${uid}/nextSemester/${i}`));
                                        })
                                    }
                                    else if(item.classList.contains("active_orange")){
                                        let child = item.children
                                        let sub = child[0].textContent
                                        let code = child[1].textContent
                                        let hour = child[2].textContent
                                        let id = item.id
                                        let totalHour = document.getElementById("total-hours-update");
                                        let fixHour = fixNumbers(hour)
                                        if((Number(totalHour.textContent) + Number(fixHour)) <= 16){
                                                item.classList.remove("active_orange")
                                                item.classList.add("active_red")
                                                addCureentSub(sub,code,hour,"current_level")
                                                totalHour.innerHTML = Number(totalHour.textContent) + Number(fixHour);
                                                auth.onAuthStateChanged((user)=>{
                                                     let uid = user.uid;
                                                     push(ref(database, `users/${uid}/nextSemester`),id);
                                                })
                                        }else{
                                            const Toast = Swal.mixin({
                                                toast: true,
                                                position: "top-end",
                                                showConfirmButton: false,
                                                timer: 3000,
                                                timerProgressBar: true,
                                                didOpen: (toast) => {
                                                    toast.onmouseenter = Swal.stopTimer;
                                                    toast.onmouseleave = Swal.resumeTimer;
                                                }
                                            });
                                            Toast.fire({
                                                icon: "error",
                                                title: "الساعات تعدت الحد المسموح ولا يمكن إضافة هذي المادة"
                                            });
                                        }

                                    }
                                }

                            })
                        })

                    })
                    
                }
            }
        }
        
    })
})