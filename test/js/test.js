let enable = false;

$(window).on("load", function(){
    if( window.innerWidth > 375 ) {
		enable = true;
		console.log(window.innerWidth);
		console.log(enable);
	}
});

$(window).on("resize", function(){
    console.log(window.innerWidth);
})