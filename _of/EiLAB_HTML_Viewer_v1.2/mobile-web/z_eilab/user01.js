/*
 * 변수명 절대 변경 금지
 * write 변수명은 반드시 0부터 순차적으로 올라가야함
 * writer의 release.writers[n]는 write[n]의 순서와 일치시킬 것
 */
var write1 = {
	writer : ''+release.writers[1]+'', // [writer]
	modify: [
		{
			id: 'pubtest03',
			el: [
				{
					date: '2022-10-11',
					text: '이미지 수정'
				},
			],
		},
	],        
	notice: [
		{
			// 기본
		}
	]
}