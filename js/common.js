
	
	//var base_url = "http://173.212.200.188:8080";
	//var base_url = "http://advaloram.1qubit.com";
	var base_url = "http://localhost:8080";
	// DEFINE ALL GLOBAL VARIABLES HERE	
	var gendersArray = null;
	var seasonsArray = null;
	var colorsArray = null;
	var sizesArray = null;
	var productCategoryArray = null;
	var brandsArray = null;
	var selectedStyleCode = '';
	
	
	function sendSignoutRequest(){
		NProgress.start();
		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			NProgress.inc();
			if(request.readyState == 4){
				NProgress.done();
				window.location = "index.html";
			}
		};
		
		request.open ("POST", base_url + "/AdValoramAdmin/authentication/logout", true);
		request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
		request.send();
	}
	
	function removeOptions(selectbox){
		var i;
		for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
			{
			selectbox.remove(i);
		}
	}
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function getParameterByName(name, url) {
		if (!url) {
		  url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function isEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}

	$(document).ready(function() {
	 // executes when HTML-Document is loaded and DOM is ready
	 //alert("document is ready");
	});

	var createCookie = function(name, value, days) {
		var expires;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		}
		else {
			expires = "";
		}
		//document.cookie = name + "=" + value + expires + "; path=/";
		document.cookie = name + "=" + value + expires + "; path=/";
	}

	function getCookie(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	}
	
	function setHeader(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer' + localStorage.setItem("token"));
        xhr.setRequestHeader('passkey', 'Bar');
    }
	function truncateDecimals (num, digits) {
		var numS = num.toString(),
			decPos = numS.indexOf('.'),
			substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
			trimmedResult = numS.substr(0, substrLength),
			finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

		return parseFloat(finalResult);
	}
	$(window).load(function() {
		// Form Validation
		if($('#form-validation')!=null){
			$('#form-validation').validate({
			submit: {
				settings: {
					inputContainer: '.form-group',
					errorListClass: 'form-control-error',
					errorClass: 'has-danger'
					}
				}
			});
		}
		if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "index.html")
			return;
		
		if(localStorage.getItem("token") == ""){
			window.location = "index.html";
		} else {	
			var request = new XMLHttpRequest();
			request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status != 200){
					window.location = "index.html";
				}
			};
			request.open ("GET", base_url + "/AdValoramAdmin/authentication", true);				
			request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
			request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
			request.send();
		}
		 // executes when complete page is fully loaded, including all frames, objects and images
		 //alert("window is loaded");
		var currentTabIndex = 0;
		$("#btnBack").click(function(){
			var currentTab = $("#homeTabs li a.nav-link.active");
			currentTabIndex = parseInt(currentTab[0].id);
			$('.nav-tabs-horizontal li:eq('+(currentTabIndex - 1)+') a').tab('show'); 				//http://getbootstrap.com/javascript/#tabs
			if(currentTabIndex > 0){
				currentTabIndex = currentTabIndex - 1;
			}
			tabFunction(currentTabIndex);
		});
		
		
		$("#btnNext").click(function(){
			var currentTab = $("#homeTabs li a.nav-link.active");
			currentTabIndex = parseInt(currentTab[0].id);
			$('.nav-tabs-horizontal li:eq('+(currentTabIndex + 1)+') a').tab('show'); 				//http://getbootstrap.com/javascript/#tabs
			if(currentTabIndex < ($('.nav-tabs-horizontal >ul >li').length - 1)){
				currentTabIndex = currentTabIndex + 1;
			}
			tabFunction(currentTabIndex);
		});	
	});
