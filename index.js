let navBtn = document.getElementById("navbar-toggler")
navBtn.addEventListener("click",()=>{
  let navSide = document.querySelector(".nav-side")
  if(navSide.classList.contains("unactive-nav")){
    navSide.classList.add("active-nav")
    navSide.classList.remove("unactive-nav")
  }
})
let closeNav = document.getElementById("close")
closeNav.addEventListener("click",()=>{
console.log(closeNav)
let navSide = document.querySelector(".nav-side")
if(navSide.classList.contains("active-nav")){
  navSide.classList.remove("active-nav")
  navSide.classList.add("unactive-nav")
}
})