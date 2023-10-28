function search(){
    let title = document.querySelectorAll(".card-title")
    let cards = document.querySelectorAll(".card-container")
    let search = document.getElementById("search").value
    for(let i =0; i<title.length; i++){
        if(title[i].innerHTML.indexOf(search) >=0){
            console.log(title[i])
            cards[i].style.display =""
        }else{
            cards[i].style.display ="none"
        }
    }
}