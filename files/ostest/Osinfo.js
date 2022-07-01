// JavaScript Document
// 만든이 : 다섯방울, THREE™ (http://the3.tistory.com)
// 주소 : http://the3.tistory.com/17
// Data : 2015. 01. 28
// Version : 0.2
// 참조 http://www.openspc2.org/userAgent/
// OS 버전 보기

var uanaVigatorOs = navigator.userAgent;
var AgentUserOs= uanaVigatorOs.replace(/ /g,'');
var Ostxt="";
var OSName="";
var OsVers="";

// This script sets OSName variable as follows:
// "Windows"    for all versions of Windows
// "MacOS"      for all versions of Macintosh OS
// "Linux"      for all versions of Linux
// "UNIX"       for all other UNIX flavors 
// "Unknown OS" indicates failure to detect the OS

new function() {
    var OsNo = navigator.userAgent.toLowerCase(); 

    jQuery.os = {
        Linux: /linux/.test(OsNo),
        Unix: /x11/.test(OsNo),
        Mac: /mac/.test(OsNo),
        Windows: /win/.test(OsNo)
    }
}

function OSInfoDev(){
	
	if($.os.Windows) {
		if(AgentUserOs.indexOf("WindowsCE") != -1) OSName="Windows CE";
		else if(AgentUserOs.indexOf("Windows95") != -1) OSName="Windows 95";
		else if(AgentUserOs.indexOf("Windows98") != -1) {
			if (AgentUserOs.indexOf("Win9x4.90") != -1) OSName="Windows Millennium Edition (Windows Me)" 
				else OSName="Windows 98"; 
		}
		else if(AgentUserOs.indexOf("WindowsNT4.0") != -1) OSName="Microsoft Windows NT 4.0";
		else if(AgentUserOs.indexOf("WindowsNT5.0") != -1) OSName="Windows 2000";
		else if(AgentUserOs.indexOf("WindowsNT5.01") != -1) OSName="Windows 2000, Service Pack 1 (SP1)";
		else if(AgentUserOs.indexOf("WindowsNT5.1") != -1) OSName="Windows XP";
		else if(AgentUserOs.indexOf("WindowsNT5.2") != -1) OSName="Windows 2003";
		else if(AgentUserOs.indexOf("WindowsNT6.0") != -1) OSName="Windows Vista/Server 2008";
		else if(AgentUserOs.indexOf("WindowsNT6.1") != -1) OSName="Windows 7";
		else if(AgentUserOs.indexOf("WindowsNT6.2") != -1) OSName="Windows 8";
		else if(AgentUserOs.indexOf("WindowsNT6.3") != -1) OSName="Windows 8.1";
		else if(AgentUserOs.indexOf("WindowsNT6.4") != -1) OSName="Windows 10";
		else if(AgentUserOs.indexOf("WindowsPhone8.0") != -1) OSName="Windows Phone 8.0";
		else if(AgentUserOs.indexOf("WindowsPhoneOS7.5") != -1) OSName="Windows Phone OS 7.5";
		else if(AgentUserOs.indexOf("Xbox") != -1) OSName="Xbox 360";
		else if(AgentUserOs.indexOf("XboxOne") != -1) OSName="Xbox One";
		else if(AgentUserOs.indexOf("Win16") != -1) OSName="Windows 3.x";
		else if(AgentUserOs.indexOf("ARM") != -1) OSName="Windows RT";
		else OSName="Windows (Unknown)";
	
		if(AgentUserOs.indexOf("WOW64") != -1) OsVers=", WOW64";
		else if(AgentUserOs.indexOf("Win64;x64;") != -1) OsVers=", Win64 on x64";
		else if(AgentUserOs.indexOf("Win16") != -1) OsVers=" 16-bit";
		else OsVers=" on x86";
	
	} else if ($.os.Linux) {
		if(AgentUserOs.indexOf("Android") != -1) { OSName = getAndroidDevName(); }
		else if(AgentUserOs.indexOf("BlackBerry9000") != -1) OSName="BlackBerry9000";
		else if(AgentUserOs.indexOf("BlackBerry9300") != -1) OSName="BlackBerry9300";
		else if(AgentUserOs.indexOf("BlackBerry9700") != -1) OSName="BlackBerry9700";
		else if(AgentUserOs.indexOf("BlackBerry9780") != -1) OSName="BlackBerry9780";
		else if(AgentUserOs.indexOf("BlackBerry9900") != -1) OSName="BlackBerry9900";
		else if(AgentUserOs.indexOf("BlackBerry;Opera Mini") != -1) OSName="Opera/9.80";
		else if(AgentUserOs.indexOf("Symbian/3") != -1) OSName="Symbian OS3";
		else if(AgentUserOs.indexOf("SymbianOS/6") != -1) OSName="Symbian OS6";
		else if(AgentUserOs.indexOf("SymbianOS/9") != -1) OSName="Symbian OS9";
		else if(AgentUserOs.indexOf("Ubuntu") != -1) OSName="Ubuntu";
		else if(AgentUserOs.indexOf("PDA") != -1) OSName="PDA";
		else if(AgentUserOs.indexOf("NintendoWii") != -1) OSName="Nintendo Wii";	
		else if(AgentUserOs.indexOf("PSP") != -1) OSName="PlayStation Portable";
		else if(AgentUserOs.indexOf("PS2;") != -1) OSName="PlayStation 2";
		else if(AgentUserOs.indexOf("PLAYSTATION3") != -1) OSName="PlayStation 3";	
		else OSName="Linux (Unknown)";
	
		if(AgentUserOs.indexOf("x86_64") != -1) OsVers=", x86_64";
		else if(AgentUserOs.indexOf("i686") != -1) OsVers=", i686";
		else if(AgentUserOs.indexOf("i686 on x86_64") != -1) OsVers=", i686 running on x86_64";		
		else if(AgentUserOs.indexOf("armv7l") != -1) OsVers=" Nokia N900 Linux mobile, on the Fennec browser";		
		else if(AgentUserOs.indexOf("IA-32") != -1) OsVers=" 32-bit";
		else OsVers="";
	
	} else if ($.os.Unix) {
		OSName="UNIX";
	} else if ($.os.Mac) {
		if(AgentUserOs.indexOf("iPhoneOS3") != -1) OSName="iPhone OS 3";
		else if(AgentUserOs.indexOf("iPhoneOS4") != -1) OSName="iPhone OS 4";
		else if(AgentUserOs.indexOf("iPhoneOS5") != -1) OSName="iPhone OS 5";
		else if(AgentUserOs.indexOf("iPhoneOS6") != -1) OSName="iPhone OS 6";
		else if(AgentUserOs.indexOf("iPhoneOS7") != -1) OSName="iPhone OS 7";
		else if(AgentUserOs.indexOf("iPhoneOS8") != -1) OSName="iPhone OS 8";				
		else if(AgentUserOs.indexOf("iPad") != -1) OSName="iPad";
		else if((AgentUserOs.indexOf("MacOSX10_1")||AgentUserOs.indexOf("MacOSX10.1")) != -1) OSName="Mac OS X Puma";
		else if((AgentUserOs.indexOf("MacOSX10_2")||AgentUserOs.indexOf("MacOSX10.2")) != -1) OSName="Mac OS X Jaguar";
		else if((AgentUserOs.indexOf("MacOSX10_3")||AgentUserOs.indexOf("MacOSX10.3")) != -1) OSName="Mac OS X Panther";
		else if((AgentUserOs.indexOf("MacOSX10_4")||AgentUserOs.indexOf("MacOSX10.4")) != -1) OSName="Mac OS X Tiger";
		else if((AgentUserOs.indexOf("MacOSX10_5")||AgentUserOs.indexOf("MacOSX10.5")) != -1) OSName="Mac OS X Leopard";
		else if((AgentUserOs.indexOf("MacOSX10_6")||AgentUserOs.indexOf("MacOSX10.6")) != -1) OSName="Mac OS X Snow Leopard";
		else if((AgentUserOs.indexOf("MacOSX10_7")||AgentUserOs.indexOf("MacOSX10.7")) != -1) OSName="Mac OS X Lion";
		else if((AgentUserOs.indexOf("MacOSX10_8")||AgentUserOs.indexOf("MacOSX10.8")) != -1) OSName="Mac OS X Mountain Lion";
		else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.9")) != -1) OSName="Mac OS X Mavericks";
		else if((AgentUserOs.indexOf("MacOSX10_10")||AgentUserOs.indexOf("MacOSX10.10")) != -1) OSName="Mac OS X Yosemite";		
		else OSName="MacOS (Unknown)";
		
		if(AgentUserOs.indexOf("Intel") != -1) OsVers=" on Intel x86 or x86_64";
		else if(AgentUserOs.indexOf("PPC") != -1) OsVers=" on PowerPC";
		else OsVers="";
		
	} else {
		OSName="Unknown OS";
	}
  var OSDev = OSName + OsVers;
  return OSDev;
}

// Android의 단말 이름을 반환
function getAndroidDevName() {
var uaAdata = navigator.userAgent;
var regex = /Android (.*);.*;\s*(.*)\sBuild/;
var match = regex.exec(uaAdata);
	if(match) {
		var ver = match[1];
		var dev_name = match[2];
		return "Android " + ver + " " + dev_name;
	}
return "Android OS";
}

// OSInfoDev() 는 OS이름과 버전 출력하는 함수
// AgentUserOs 는 userAgent 출력