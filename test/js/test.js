let enable = false;

$(window).on("load", function(){
    if( window.innerWidth > 375 ) {
		enable = true;
		console.log(window.innerWidth + "px (화면넓이)");
		console.log(enable);
	}
});

$(window).on("resize", function(){
    console.log(window.innerWidth + "px (화면넓이)");
});
