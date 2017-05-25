$(window).load(function() {
	
	$.ajaxSetup({
		  headers : {
			'Authorization' : 'Bearer ' + localStorage.getItem("token")
		  }
	});
	getProductCategories();
	getClients();
	getNextSalesOrderId();
	getNextPackingListId();
	getProductData();
	getEmployees();
});

var employeeArray;
var customerArray;

function getEmployees(){
		if(document.getElementById('referredByEmployee')!=null){
			//load employee
		 $.getJSON(base_url + "/AdValoramAdmin/common/employee", function(data){
			if(data.result=='error'){
				return;
			}
			
			employeeArray = data.result;
			var employeeSelect = document.getElementById('referredByEmployee');
			removeOptions(employeeSelect);
			for(var i = 0; i < employeeArray.length; i++){
				var employee = employeeArray[i];
					var opt = document.createElement('option');
					opt.value = employee.id;
					opt.innerHTML = employee.firstName + " " + employee.lastName;
					employeeSelect.appendChild(opt);
			}
			employeeSelect.selectedIndex = -1;
		});
	}
}
function print_today() {
  var now = new Date();
  var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
  var today =  months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear()));
  return today;
}

function removeOptions(selectbox){
	var i;
	for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
		{
		selectbox.remove(i);
	}
}

function getNextSalesOrderId(){
	if(document.getElementById('salesOrderId')!=null){
	 $.getJSON(base_url + "/AdValoramAdmin/salesOrder/nextid", function(data){
			 if(data.result=='error'){
				return;
			 }
		document.getElementById('salesOrderId').value = data.result;
		});
	}	
}

function getNextPackingListId(){
	if(document.getElementById('packingListId')!=null){
	 $.getJSON(base_url + "/AdValoramAdmin/packingList/nextid", function(data){
			 if(data.result=='error'){
				return;
			 }
		document.getElementById('packingListId').value = data.result;
		});
	}	
}
	
function getProductCategories(){
	if(document.getElementById('productCategory')!=null){
			//load productCategory
		 $.getJSON(base_url + "/AdValoramAdmin/common/productCategory", function(data){
				if(data.result=='error'){
					return;
				 }
				productCategoryArray = data.result;
				var productCategorySelect = document.getElementById('productCategory');
				removeOptions(productCategorySelect);
				for(var i = 0; i < productCategoryArray.length; i++){
					var productCategory = productCategoryArray[i];
						var opt = document.createElement('option');
						opt.value = productCategory.id;
						opt.innerHTML = productCategory.categoryName;
						productCategorySelect.appendChild(opt);
				}
			});
	}
}
var cstRateApplicableOnSalesOrderDate = -1;
var vatRateApplicableOnSalesOrderDate = -1;
var cstRateAgainstFormCOnSalesOrderDate = -1;
var gstRateApplicableOnSalesOrderDate = -1;
var octroiLbtEntryTaxApplicableOnSalesOrderDate = -1;

var vatTinNumber = null;
var gstNumber = null;
var cstTinNumber = null;
var serviceTaxNumber = null;
var panNumber = null;

var vatIsApplicable = false;
var cstIsApplicable = false;
var gstIsApplicable = false;
var octroiLbtEntryTaxIsApplicable = false;
	
function getClients(){
	if(document.getElementById('clientName')!=null){
	 $.getJSON(base_url + "/AdValoramAdmin/customer/idNameList", function(data){
			 if(data.result=='error'){
				return;
			 }
			customerArray = data.result;
			var customerSelect = document.getElementById('clientName');
			removeOptions(customerSelect);
			for(var i = 0; i < customerArray.length; i++){
				var customer = customerArray[i];
					var opt = document.createElement('option');
					opt.value = customer.id;
					opt.innerHTML = customer.companyName;
					customerSelect.appendChild(opt);
			}
			var clientNames = document.getElementById("clientName");
			clientNames.selectedIndex = -1;
			clientNames.addEventListener("change", function() {
				var clientId = clientNames.value;
				if(clientId > 0){
					$.getJSON(base_url + "/AdValoramAdmin/common/customer/"+clientId, function(data){
						if(data.result=='error'){
							return;
						}
						document.getElementById('billingAddress').value = data.result[0].billingAddress;
						document.getElementById('deliveryAddress').value = data.result[0].deliveryAddress;
						document.getElementById('city').value = data.result[0].city.cityName;
						document.getElementById('district').value = data.result[0].city.district;
						document.getElementById('state').value = data.result[0].city.state;
						document.getElementById('pinCode').value = data.result[0].pinCode;
						document.getElementById('contactPerson').value = data.result[0].contactPerson;
						document.getElementById('contactNumber').value = data.result[0].contactNumber;
						document.getElementById('emailAddress').value = data.result[0].emailAddress;
						
						document.getElementById('markDown').value = data.result[0].markDown;
						document.getElementById('cashDiscount').value = data.result[0].cashDiscount;
						document.getElementById('promptPaymentDiscount').value = data.result[0].promptPaymentDiscount;
						document.getElementById('specialDiscount').value = data.result[0].specialDiscount;
						
						cstRateApplicableOnSalesOrderDate = data.result[0].cstRateApplicable;
						vatRateApplicableOnSalesOrderDate = data.result[0].vatRateApplicable;
						cstRateAgainstFormCOnSalesOrderDate = data.result[0].cstRateAgainstFormC;
						gstRateApplicableOnSalesOrderDate = data.result[0].gstRateApplicable;
						octroiLbtEntryTaxApplicableOnSalesOrderDate = data.result[0].octroiLbtEntryTaxApplicable;
						
						vatIsApplicable = data.result[0].vatIsApplicable;
						cstIsApplicable = data.result[0].cstIsApplicable;
						gstIsApplicable = data.result[0].gstIsApplicable;
						octroiLbtEntryTaxIsApplicable = data.result[0].octroiLbtEntryTaxIsApplicable;
						
						vatTinNumber = data.result[0].vatTinNumber;
						gstNumber = data.result[0].gstNumber;
						cstTinNumber = data.result[0].cstTinNumber;
						serviceTaxNumber = data.result[0].serviceTaxNumber;
						panNumber = data.result[0].panNumber;
						
					});
				}
			});
				
				
			if(document.getElementById('referredByCustomer')!=null){
				var referredByCustomer = document.getElementById('referredByCustomer');
				removeOptions(referredByCustomer);
				for(var i = 0; i < customerArray.length; i++){
					var customer = customerArray[i];
						var opt = document.createElement('option');
						opt.value = customer.id;
						opt.innerHTML = customer.companyName;
						referredByCustomer.appendChild(opt);
				}
				
				document.getElementById("referredByCustomer").selectedIndex = -1;;
			}
			
			if(document.getElementById('refereePartner')!=null){
				var refereePartner = document.getElementById('refereePartner');
				removeOptions(refereePartner);
				for(var i = 0; i < customerArray.length; i++){
					var customer = customerArray[i];
						var opt = document.createElement('option');
						opt.value = customer.id;
						opt.innerHTML = customer.companyName;
						refereePartner.appendChild(opt);
				}
				document.getElementById("refereePartner").selectedIndex = -1;
			}
		});
	}
}


/*
Adds Product in Sales order
*/
		
function getProductData(){

	if(document.getElementById('productStyleCodes')!=null){
		if(document.getElementsByClassName('postServerRequest')!=null){
			$(".postServerRequest").hide(0);
		}
		//populate style code
		 $.getJSON(base_url + "/AdValoramAdmin/product/style", function(data){
			if(data.result=='error'){
				return;
			}
			var styleCodes = data.result;
			var searchStyleCodeBox = document.getElementById('productStyleCodes');
			var options = '';
			for(var i = 0; i < styleCodes.length; i++){
				var styleJson = styleCodes[i];
				 options += '<option value="' + styleJson.styleCode + '" id = "' + styleJson.id + '"/>';
			}
			
			document.getElementById('styleCodes').innerHTML = options;
			
			//What happens after user selects a style code -
			//http://stackoverflow.com/questions/30151633/jquery-event-for-html5-datalist-when-item-is-selected-or-typed-input-match-with
			$("#productStyleCodes").on('input', function () {
				var val = this.value;
				if($('#styleCodes option').filter(function(){
					return this.value === val;        
				}).length) {
					//send ajax request
					//alert(this.value);
					selectedStyleCode = this.value;
					for(var i = 0; i < styleCodes.length; i++){
						var styleJson = styleCodes[i];
						if(styleJson.styleCode == this.value){
																
							$.getJSON(base_url + "/AdValoramAdmin/common/product/"+styleJson.id, function(data){
								if(data.result=='error'){
									return;
								}
								//populate colors
								var colorsJsonArray = data.result[0].colors;
				 				var dropDownColorCode = document.getElementById('dropDownColorCode');
								removeOptions(dropDownColorCode);
								for(var i = 0; i < colorsJsonArray.length; i++){
									var colorJson = colorsJsonArray[i];
									for(var color in colorJson){
										var opt = document.createElement('option');
										opt.value = color;
										opt.innerHTML = color;
										dropDownColorCode.appendChild(opt);
									}
								}
								
								//populate gender
								var genderJsonArray = data.result[0].genderCodes;
				 				var dropDownGender = document.getElementById('dropDownGender');
								removeOptions(dropDownGender);
								for(var i = 0; i < genderJsonArray.length; i++){
									var genderJson = genderJsonArray[i];
									var opt = document.createElement('option');
									opt.value = genderJson.genderCode;
									opt.setAttribute('genderCode', genderJson.genderCode);
									opt.innerHTML = genderJson.gender;
									dropDownGender.appendChild(opt);								
								}
								
								document.getElementById('textMrp').value = data.result[0].mrp;
								
								function populateSizeTable(){
									$(".postServerRequest").show(100);
									var tbody = '';
									var sizeCodesArray = JSON.parse(JSON.stringify(data.result[0].sizeCodes));
									var prefix = document.getElementById('dropDownColorCode').value + styleJson.styleCode;
									var postfix = dropDownGender.options[dropDownGender.selectedIndex].getAttribute('genderCode');

									var n = 0;
									var indexOfItemsAddedToTable = [];
									//sort available sizes
									while(n < sizeCodesArray.length){

										var lowestSizeIndex = 0;
										var lowestSize = sizeCodesArray[0].sizeCode;
										
										//ensure indexOfItemsAddedToTable does not contain 0. If yes, move to next index. If that index is also already present in indexOfItemsAddedToTable then move to next
										while(indexOfItemsAddedToTable.indexOf(lowestSizeIndex) > -1){
											lowestSizeIndex++;
											lowestSize = sizeCodesArray[lowestSizeIndex].sizeCode;
										}

										for (var i = 0; i < sizeCodesArray.length; i++) {
											if(!(indexOfItemsAddedToTable.indexOf(i) > -1)){
												if(sizeCodesArray[i].sizeCode < lowestSize){
													lowestSize = sizeCodesArray[i].sizeCode;
													lowestSizeIndex = i;
												}
											}
										}
										
										tbody +=  "<tr>" +
													"<td class='tg-yw4l'><span>"+sizeCodesArray[lowestSizeIndex].sizeCode+"</span></td>"+
													"<td class='tg-yw42'><span>" + prefix + sizeCodesArray[lowestSizeIndex].sizeCode + postfix + "</span></td>"+
													"<td class='tg-yw4l'><input id = 'quantityForSize" + sizeCodesArray[lowestSizeIndex].sizeCode + "' type = 'number' min='0' onkeypress='return event.charCode >= 48 && event.charCode <= 57' value = '0'></td>" + 
												"</tr>";
										
										indexOfItemsAddedToTable.push(lowestSizeIndex);
										n++;
									}
									
									$('#sizeTable').html(tbody);
								}
								
								populateSizeTable();
								
								dropDownColorCode.addEventListener(
									 'change',
									 function() { populateSizeTable(); },
									 false
								);
								
								dropDownGender.addEventListener(
									 'change',
									 function() { populateSizeTable(); },
									 false
								);
							});
						
						}
					}
				}
			});
		 });
	}
}