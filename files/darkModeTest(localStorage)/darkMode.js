$('.switch').on('click', () => {

	$('body').toggleClass('dark');

	if($('body').hasClass('dark')){
		activateDarkMode();
		localStorage.setItem('darkMode', 'enabled');
	} else {
		deactivateDarkMode();
		localStorage.setItem('darkMode', 'disabled');
	}
});

let mode = localStorage.getItem('darkMode');

if(mode=='enabled'){
	activateDarkMode();
} else if(mode == 'disabled'){
	deactivateDarkMode();
}

function activateDarkMode(){
	$('body').addClass('dark');
}

function deactivateDarkMode(){
	$('body').removeClass('dark');
}