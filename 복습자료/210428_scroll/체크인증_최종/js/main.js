/*
query string
url로 요청을 보낼때 문자열 형태ㅔ로 다양한 옵션값을 연결해서 보냄
result.html?name=value&name=value

1. 전송버튼 클릭시 isConfirm = false -- 기본값으로 false로 설정
2. isConfirm==false이면 조건문으로 e.preventDefault();를 호출해서 전송중지
3. isConfirm==true이면 isPwd라는 함수의 리턴값을 대입해서 전송
4. isPwd라는 함수는 비번 인증 성공시 true, 반대는 false 반환

비밀번호 인증처리
1. 비밀번호가 같다면
	1-1 다음 글자 갯수가 5개 이상인지 인증처리
	1-2 숫자가 포함되어 있는지 인증처리
	1-3 문자가 포함되어 있는지 인증처리
	1-4 특수문자가 포함되어 있는지 인증처리
==== 조건 4개를 모두 통과하면 isConfirm = true 값 리턴
*/


$("input[type=submit]").on("click", function(e){
	if(!isPwd("pwd1", "pwd2", 5)) e.preventDefault(); //test가 거짓이라면 이동중지
	if(!isTxt("userid", 5)) e.preventDefault();
	if(!isCheck("gender")) e.preventDefault();
	if(!isSelect("job")) e.preventDefault();
	if(!isTxt("email1") || !isSelect("email2")) e.preventDefault();
	// ||(or) 둘중 하나라도 만족할 경우 이동중지
	// if(!isTxt("email1")) e.preventDefault();
	// if(!isSelect("email2")) e.preventDefault();
	if(!isTxt("comments", 10)) e.preventDefault();
	if(!isCheck("hobby")) e.preventDefault();
});

function isTxt(name, len){
	//최소길이를 함수호출시 적지않는다면 강제로 5라는 값을 len에 넣어준다.
	if(len == undefined) len = 5;
	var txt = $("[name="+name+"]").val();
	var msg = $("[name="+name+"]").attr("placeholder");

	if(txt == ""){
		alert(msg);
		$("[name="+name+"]").addClass("error");
		return false;
	}else{
		if(txt.length < len){
			alert("최소한 "+len+"글자 이상으로 입력해 주세요.");
			$("[name="+name+"]").addClass("error");
			return false;
		}else{
			$("[name="+name+"]").removeClass("error"); //5글자 이상 입력했을 경우
			return true;
		}
	}
}

function isPwd(name1, name2, len){
	var $pwd1 = $("input[name="+name1+"]");
	var $pwd2 = $("input[name="+name2+"]");
	var pwd1 = $pwd1.val();
	var pwd2 = $pwd2.val();
	var isConfirm = false;
	var i = 0;

	var num = /[0-9]/;
	var eng = /[a-zA-Z]/;
	var spc = /[~!@#$%^&*()_=+\[\]-]/;



	if(pwd1 == pwd2){

		 //비밀번호의 길이가 5글자 이상인지 인증처리
		if(pwd1.length >= len){
			i++;  //1
		}else{
			console.log("비밀번호는 "+len+"글자 이상 입력해주세요.");
		}

		//비밀번호에 숫자가 포함되어 있는지 인증처리
		if(num.test(pwd1)){
			i++;
		}else{
			console.log("비밀번호에 숫자를 포함해 주세요.");
		}

		//비밀번호에 문자가 포함되어 있는지 인증처리
		if(eng.test(pwd1)){
			i++;
		}else{
			console.log("비밀번호에 문자를 포함해 주세요.");
		}

		//비밀번호에 특수문자가 포함되어 있는지 인증처리
		if(spc.test(pwd1)){
			i++;
		}else{
			console.log("비밀번호에 특수문자를 포함해 주세요.");
		}

		if(i === 4){
			isConfirm = true;
			return isConfirm; //true
		}else{
			$pwd1.addClass("error");
			$pwd2.addClass("error");
			return isConfirm; //false
		}

		//비밀번호가 같지 않다면
	}else{
		alert("두개의 비밀번호를 동일하게 입력하세요!");
		$pwd1.addClass("error");
		$pwd2.addClass("error");

		return isConfirm; //false
	}
}


//check 인증함수
function isCheck(name){
	//체크박스와 또는 라디오 버튼에 체크되어 있는지 true 또는 false 반환
	var isCheck = $("input[name="+name+"]").is(":checked");

	if(isCheck){
		$("input[name="+name+"]").parent().siblings("p").hide();
		return true;
	}else{
		$("input[name="+name+"]").parent().siblings("p").show();
		return false;
	}
}

function isSelect(name){
	var sel = $("select[name="+name+"]").children("option:selected").val();
	var msg = $("select[name="+name+"]").children("option").eq(0).text();

	if(sel == ""){
		alert(msg);
		$("srlect[name="+name+"]").addClass("error");
		return false;
	}else{
		$("select[name="+name+"]").removeClass("error");
		return true;
	}
}