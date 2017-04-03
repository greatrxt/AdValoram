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
	

	function removeOptions(selectbox){
		var i;
		for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
		{
			selectbox.remove(i);
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
		
		request.open ("GET", "http://173.212.200.188:8080/AdValoramAdmin/location", true);
		request.send();
	}

