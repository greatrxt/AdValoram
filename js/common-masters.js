$(window).ready(function() {
	NProgress.start();
	$.ajaxSetup({
		  headers : {
			'Authorization' : 'Bearer ' + localStorage.getItem("token")
		  }
	});
	
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
	
	NProgress.inc();
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
	NProgress.inc();
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
	NProgress.inc();
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
	NProgress.inc();
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
	NProgress.inc();
	if(document.getElementById('unitOfMeasurement')!=null){
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
	NProgress.inc();
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
	NProgress.inc();
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
			distributorSelect.selectedIndex = -1;
			});
			
			
	}
	NProgress.inc();
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
			brokerSelect.selectedIndex = -1;
		});
	}
	NProgress.inc();
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
				transporterSelect.selectedIndex = -1;
			});
	}
	
	NProgress.done();
	});

	var locationsArray = null;
	function refreshLocationDistrictAndState(){
		if(document.getElementById('city') == null || document.getElementById('state') == null
			|| document.getElementById('district') == null)
			return;
		var district = document.getElementById('district');
		var state = document.getElementById('state');
		var city = document.getElementById('city');
		if(locationsArray!=null){
			for(var i = 0; i < locationsArray.length; i++){
				var location = locationsArray[i];
				if(city.options[city.selectedIndex].text.localeCompare(location.cityName) == 0){
					district.value = location.district;
					state.value = location.state;
				}
			}
		}
	}

	
	function fetchLocations(){
		if(document.getElementById('city') == null)
			return;
		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status == 200){
				locationsArray = JSON.parse(request.responseText).result;
				var city = document.getElementById('city');
				removeOptions(city);
				for(var i = 0; i < locationsArray.length; i++){
					var location = locationsArray[i];
						var opt = document.createElement('option');
						opt.value = location.id;
						opt.innerHTML = location.cityName;
						city.appendChild(opt);
				}
				refreshLocationDistrictAndState();
			}
		};
		request.open ("GET", base_url + "/AdValoramAdmin/location", true);
		request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
		request.send();
	}
