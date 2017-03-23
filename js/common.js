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
	
	var gendersArray = null;
	var seasonsArray = null;
	var colorsArray = null;
	var sizesArray = null;
	
	$(window).load(function() {
	 // executes when complete page is fully loaded, including all frames, objects and images
	 //alert("window is loaded");
	 
	 if(document.getElementById('availableSizes')!=null){
		 $.getJSON("http://localhost:8080/AdValoramAdmin/size", function(data){
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
		 $.getJSON("http://localhost:8080/AdValoramAdmin/gender", function(data){
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
		 $.getJSON("http://localhost:8080/AdValoramAdmin/common/season", function(data){
			 
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
		 $.getJSON("http://localhost:8080/AdValoramAdmin/common/brand", function(data){
			 if(data.result=='error'){
				return;
			 }
				var brandsArray = data.result;
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
	 $.getJSON("http://localhost:8080/AdValoramAdmin/common/unitOfMeasurement", function(data){
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
		 $.getJSON("http://localhost:8080/AdValoramAdmin/common/product_category", function(data){
				if(data.result=='error'){
					return;
				 }
				var productCategoryArray = data.result;
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
		 $.getJSON("http://localhost:8080/AdValoramAdmin/common/employee", function(data){
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
	
	if(document.getElementById('linkedDistributor')!=null){
			//load distributor
		 $.getJSON("http://localhost:8080/AdValoramAdmin/customer/distributor", function(data){
			 if(data.result=='error'){
				return;
			 }
				var distributorArray = data.result;
				var distributorSelect = document.getElementById('linkedDistributor');
				removeOptions(distributorSelect);
				for(var i = 0; i < distributorArray.length; i++){
					var distributor = distributorArray[i];
						var opt = document.createElement('option');
						opt.value = distributor.id;
						opt.innerHTML = distributor.companyName;
						distributorSelect.appendChild(opt);
				}
			});
	}
	
	if(document.getElementById('linkedBroker')!=null){
			//load broker
		 $.getJSON("http://localhost:8080/AdValoramAdmin/customer/broker", function(data){
			 if(data.result=='error'){
				return;
			 }
				var brokerArray = data.result;
				var brokerSelect = document.getElementById('linkedBroker');
				removeOptions(brokerSelect);
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
		 $.getJSON("http://localhost:8080/AdValoramAdmin/common/transporter", function(data){
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
