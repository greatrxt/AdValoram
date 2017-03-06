	function removeOptions(selectbox){
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
		{
			selectbox.remove(i);
		}
	}

	$(document).ready(function() {
	 // executes when HTML-Document is loaded and DOM is ready
	 //alert("document is ready");
	});
	
	$(window).load(function() {
	 // executes when complete page is fully loaded, including all frames, objects and images
	 //alert("window is loaded");
	 
	 $.getJSON("http://localhost:8080/AdValoramAdmin/size", function(data){
		 	var sizesArray = data.result;
			var container = document.getElementById('availableSizes');
			for(var i = 0; i < sizesArray.length; i++){
				var sizeJson = sizesArray[i];
				var checkbox = document.createElement('input');
				checkbox.type = "checkbox";
				checkbox.name = "productSize";
				checkbox.value = sizeJson.id;
				checkbox.id = "productSize"+sizeJson.sizeCode;
				checkbox.style.margin = "10px";
				var label = document.createElement('label')
				//label.htmlFor = checkbox.id;
				label.appendChild(document.createTextNode(sizeJson.sizeCode));

				container.appendChild(checkbox);
				container.appendChild(label);
			}
	 });
	 	 
	 //load genderCodes
	 $.getJSON("http://localhost:8080/AdValoramAdmin/gender", function(data){
				var gendersArray = data.result;
				var container = document.getElementById('availableGender');
				for(var i = 0; i < gendersArray.length; i++){
					var genderJson = gendersArray[i];
					var checkbox = document.createElement('input');
					checkbox.type = "checkbox";
					checkbox.name = "productGender";
					checkbox.value = genderJson.id;
					checkbox.id = "productGender"+genderJson.genderCode;
					checkbox.style.margin = "10px";
					var label = document.createElement('label')
					//label.htmlFor = checkbox.id;
					label.appendChild(document.createTextNode(genderJson.gender));

					container.appendChild(checkbox);
					container.appendChild(label);
				}
		});
		
	 //load seasons
	 $.getJSON("http://localhost:8080/AdValoramAdmin/common/season", function(data){
			var seasonsArray = data.result;
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
		
	//load Brand
	 $.getJSON("http://localhost:8080/AdValoramAdmin/common/brand", function(data){
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
		
	//load uom
	 $.getJSON("http://localhost:8080/AdValoramAdmin/common/unitOfMeasurement", function(data){
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
		
			//load productCategory
	 $.getJSON("http://localhost:8080/AdValoramAdmin/common/product_category", function(data){
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
	});
