/*
 * 변수명 절대 변경 금지
 * write 변수명은 반드시 0부터 순차적으로 올라가야함
 * writer의 release.writers[n]는 write[n]의 순서와 일치시킬 것
 */
var write2 = {
	writer : ''+release.writers[2]+'', // [tester]
	modify: [
		{
			// 기본
			// 작성하지 않더라도 modify:[{}]의 기본 형태는 유지할 것
		},
	],        
	notice: [ //
		{
			// 기본
			// 작성하지 않더라도 notice:[{}]의 기본 형태는 유지할 것
		}
	]
}