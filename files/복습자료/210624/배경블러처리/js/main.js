
//es5
/*
btnToggle.onclick = function(e){
	e.preventDefault();

	nav.classList.toggle("on");
};
*/

//es6
const btnToggle = document.querySelector(".btnToggle");
const nav = document.querySelector("nav");

btnToggle.addEventListener("click", e=>{
	e.preventDefault();

	nav.classList.toggle("on");
});




//Jquery
/*
// var nav = $("nav");

// $(".btnToggle").on("click", function(){
//   nav.toggleClass("on");
// });
*/