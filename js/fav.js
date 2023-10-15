function getID(button){
    let btnID = button.id;
    console.log(btnID)
    
    
    let img = document.getElementById("img_"+`${btnID}`);
    
    let star = "http://127.0.0.1:3000/assets/svg/star.svg";
    let fullStar = "http://127.0.0.1:3000/assets/svg/starFill.svg";
    if(img.src == star){
            img.src = fullStar;
    }else{
            img.src = star
    }
    const userId = auth.currentUser.uid;
    writeUserData(userId, btnID)
}

function writeUserData(userId, getID) {
    set(ref(dbRef, 'users/' + userId), {
        fav:[].push(getID(getID))
    });
    alert("added !!!!")
  }