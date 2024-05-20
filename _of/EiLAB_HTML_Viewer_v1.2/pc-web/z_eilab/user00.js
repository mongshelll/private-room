/*
 * 변수명 절대 변경 금지
 * write 변수명은 반드시 0부터 순차적으로 올라가야함
 * writer의 release.writers[n]는 write[n]의 순서와 일치시킬 것
 */
var write0 = {
	writer : ''+release.writers[0]+'',  // [remix] // 직접 입력해도 무방하나 수정하지 말 것을 권장
	modify: [ // 수정내역 작성 // 작성하지 않더라도 modify:[{}]의 기본 형태는 유지할 것
		{
			id: 'pubtest03', // 화면아이디
			el: [
				{
					date: '2022-10-11',
					text: '테이블 수정'
				},
				{
					date: '2022-09-11',
					text: '텍스트 수정'
				},
			],
		},
		{
			id: 'pubtest99', // 화면아이디
			el: [
				{
					date: '2022-10-11',
					text: '수정내역2'
				},
				{
					date: '2022-09-11',
					text: '텍스트 수정2'
				},
			],
		},
	],
	notice: [ // 작성하지 않더라도 [{}]의 기본 형태는 유지할 것
		{
			id: 'pubtest03',
			el: [
				{
					text: '전달사항1'
				},
				{
					text: '전달사항2'
				},
			],
		},
	]
}