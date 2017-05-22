$(window).load(function() {
	
	$.ajaxSetup({
		  headers : {
			'Authorization' : 'Bearer ' + localStorage.getItem("token")
		  }
	});
	setMonthlySalesWidgetValue();
});

function setMonthlySalesWidgetValue(){
	$('.counter-count').countTo({from: 0, to: 500});
}
