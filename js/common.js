
	
	//var base_url = http://173.212.200.188:8080;
	// DEFINE ALL GLOBAL VARIABLES HERE	
	var gendersArray = null;
	var seasonsArray = null;
	var colorsArray = null;
	var sizesArray = null;
	var productCategoryArray = null;
	var brandsArray = null;
	var selectedStyleCode = null;
	var base_url = "http://localhost:8080";
	
	function removeOptions(selectbox){
		var i;
		for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
			{
			selectbox.remove(i);
		}
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

	$(document).ready(function() {
	 // executes when HTML-Document is loaded and DOM is ready
	 //alert("document is ready");
	});

	
	$(window).load(function() {
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
    });
	
	
	$("#btnNext").click(function(){
		var currentTab = $("#homeTabs li a.nav-link.active");
		currentTabIndex = parseInt(currentTab[0].id);
        $('.nav-tabs-horizontal li:eq('+(currentTabIndex + 1)+') a').tab('show'); 				//http://getbootstrap.com/javascript/#tabs
		if(currentTabIndex < ($('.nav-tabs-horizontal >ul >li').length - 1)){
			currentTabIndex = currentTabIndex + 1;
		}
    });
	
	/*
	Adds Product in Sales order
	*/
	
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
									opt.value = genderJson.id;
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
	
	if(document.getElementById('availableSizes')!=null){
		 $.getJSON(base_url + "/AdValoramAdmin/size", function(data){
			 if(data.result=='error'){
				return;
			 }
			sizesArray = data.result;
			var container = document.getElementById('availableSizes');
			for(var i = 0; i < sizesArray.length; i++){
				var sizeJson = sizesArray[i];
				var checkbox = document.createElement('input');
				checkbox.type = "checkbox";
				checkbox.name = "productSize";
				checkbox.value = sizeJson.id;
				checkbox.id = "productSize"+sizeJson.sizeCode;
				checkbox.style.margin = "10px";
				var label = document.createElement('label');
				//label.htmlFor = checkbox.id;
				label.appendChild(document.createTextNode(sizeJson.sizeCode));

				container.appendChild(checkbox);
				container.appendChild(label);
			}
		 });
	 }
	
	
	if(document.getElementById('availableGender')!=null){
		 //load genderCodes
		 $.getJSON(base_url + "/AdValoramAdmin/gender", function(data){
			 if(data.result=='error'){
				return;
			 }
				gendersArray = data.result;
				var container = document.getElementById('availableGender');
				for(var i = 0; i < gendersArray.length; i++){
					var genderJson = gendersArray[i];
					var checkbox = document.createElement('input');
					checkbox.type = "checkbox";
					checkbox.name = "productGender";
					checkbox.value = genderJson.id;
					checkbox.id = "productGender"+genderJson.genderCode;
					checkbox.style.margin = "10px";
					var label = document.createElement('label');
					//label.htmlFor = checkbox.id;
					label.appendChild(document.createTextNode(genderJson.gender));

					container.appendChild(checkbox);
					container.appendChild(label);
				}
		});
	}

	if(document.getElementById('season')!=null){
		 //load seasons
		 $.getJSON(base_url + "/AdValoramAdmin/common/season", function(data){
			 
			 if(data.result=='error'){
				return;
			 }
				seasonsArray = data.result;
				var seasonSelect = document.getElementById('season');
				removeOptions(seasonSelect);
				for(var i = 0; i < seasonsArray.length; i++){
					var season = seasonsArray[i];
						var opt = document.createElement('option');
						opt.value = season.id;
						opt.innerHTML = season.season;
						seasonSelect.appendChild(opt);
				}
			});
	}
	
	if(document.getElementById('brand')!=null){
		//load Brand
		 $.getJSON(base_url + "/AdValoramAdmin/common/brand", function(data){
			 if(data.result=='error'){
				return;
			 }
				brandsArray = data.result;
				var brandSelect = document.getElementById('brand');
				removeOptions(brandSelect);
				for(var i = 0; i < brandsArray.length; i++){
					var brand = brandsArray[i];
						var opt = document.createElement('option');
						opt.value = brand.id;
						opt.innerHTML = brand.brandName;
						brandSelect.appendChild(opt);
				}
			});
	}
	
	if(document.getElementById('unitOfMeasurement')!=null){
	//load uom
	 $.getJSON(base_url + "/AdValoramAdmin/common/unitOfMeasurement", function(data){
			 if(data.result=='error'){
				return;
			 }
			var uomArray = data.result;
			var uomSelect = document.getElementById('unitOfMeasurement');
			removeOptions(uomSelect);
			for(var i = 0; i < uomArray.length; i++){
				var uom = uomArray[i];
					var opt = document.createElement('option');
					opt.value = uom.id;
					opt.innerHTML = uom.description;
					uomSelect.appendChild(opt);
			}
		});
	}
	
	if(document.getElementById('unitOfMeasurement')!=null){
			//load productCategory
		 $.getJSON(base_url + "/AdValoramAdmin/common/product_category", function(data){
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
	
	if(document.getElementById('reportingTo')!=null 
			|| document.getElementById('linkedEmployee')!=null){
			//load employee
		 $.getJSON(base_url + "/AdValoramAdmin/common/employee", function(data){
			 if(data.result=='error'){
				return;
			 }
				var employeeArray = data.result;
				var employeeSelect = document.getElementById('reportingTo') == null ? document.getElementById('linkedEmployee') : document.getElementById('reportingTo');
				removeOptions(employeeSelect);
				for(var i = 0; i < employeeArray.length; i++){
					var employee = employeeArray[i];
						var opt = document.createElement('option');
						opt.value = employee.id;
						opt.innerHTML = employee.firstName + " " + employee.lastName;
						employeeSelect.appendChild(opt);
				}
			});
	}
	
	var distributorArray = null;
	if(document.getElementById('linkedDistributor')!=null){
			//load distributor
		 $.getJSON(base_url + "/AdValoramAdmin/customer/distributor", function(data){
			var distributorSelect = document.getElementById('linkedDistributor');
			removeOptions(distributorSelect);
			if(distributorSelect!=null) distributorSelect.disabled = true;
			if(data.result=='error'){
				return;
			}
			
			distributorArray = data.result;
						
			for(var i = 0; i < distributorArray.length; i++){
				var distributor = distributorArray[i];
					var opt = document.createElement('option');
					opt.value = distributor.id;
					opt.innerHTML = distributor.companyName;
					distributorSelect.appendChild(opt);
			}
			});
	}
	
	var brokerArray = null;
	if(document.getElementById('linkedBroker')!=null){
			//load broker
		 $.getJSON(base_url + "/AdValoramAdmin/customer/broker", function(data){
			var brokerSelect = document.getElementById('linkedBroker');			
			removeOptions(brokerSelect);
			if(brokerSelect!=null) brokerSelect.disabled = true;
			if(data.result=='error'){
				return;
			}
			
			brokerArray = data.result;
			if(brokerArray.length > 0){
				brokerSelect.disabled = false;
			}			

			for(var i = 0; i < brokerArray.length; i++){
				var broker = brokerArray[i];
				var opt = document.createElement('option');
				opt.value = broker.id;
				opt.innerHTML = broker.companyName;
				brokerSelect.appendChild(opt);
			}
		});
	}
	
	if(document.getElementById('linkedTransporter')!=null){
			//load transporter
		 $.getJSON(base_url + "/AdValoramAdmin/common/transporter", function(data){
			 if(data.result=='error'){
				return;
			 }
				var transporterArray = data.result;
				var transporterSelect = document.getElementById('linkedTransporter');
				removeOptions(transporterSelect);
				for(var i = 0; i < transporterArray.length; i++){
					var transporter = transporterArray[i];
						var opt = document.createElement('option');
						opt.value = transporter.id;
						opt.innerHTML = transporter.companyName;
						transporterSelect.appendChild(opt);
				}
			});
	}
	});
