// 진척률 계산 기준일
var release = {
	'date': '2023-04-10',
	'ver' : '1.0', // null일 시 버전 영역 사라짐
	'writers' : ['준성', 'writer', 'tester' ], // 수정이력&화면별 공지사항 작성자 이름or아이디 / 사용하지 않을 시 null or undifined
}
// 키워드 관리
var keywords = {
	noCalc : [ '가이드', '퍼블리싱안함', '공통화면', 'default' ], // 진척률에 포함시키지 않는 state keywords
	tags : [ // 화면 구분 tag 추가
		{
			class: 'common',
			name: '공통'
		},
		{
			class: 'alert',
			name: '얼럿'
		},
		{
			class: 'modal',
			name: '모달'
		},
		{
			class: 'full',
			name: '풀모달'
		},
		{
			class: 'bottom',
			name: '바텀모달'
		},
		{
			class: 'layer',
			name: '레이어'
		},
		{
			class: 'tab',
			name: '탭'
		},
	]
}