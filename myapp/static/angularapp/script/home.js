var count = 0
function openNav() {
	ans = count%2
	count = count+1
	if (ans == 0){
		document.getElementById("mySidenav").style.width = "250px";
	    document.getElementById("main").style.marginLeft = "250px";
	}
	else {
		document.getElementById("mySidenav").style.width = "0";
	    document.getElementById("main").style.marginLeft= "0";
	}

}
