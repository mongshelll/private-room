
counter("h1", 100, 2000);
counter("h2", 300, 7000);


function counter(el, num, time){
	var item = $(el);
	var current_num = item.text(); //25
	var counter_num = num - current_num;
	var interval = time / counter_num;

	var timer = setInterval(function(){
		current_num++;

		if(current_num == num){
			clearInterval(timer);
		}
		item.text(current_num);
	}, interval)
}