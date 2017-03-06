	var transportersArray = null;
	
	function removeOptions(selectbox){
    var i;
		for(i = selectbox.options.length - 1 ; i >= 0 ; i--){
			selectbox.remove(i);
		}
	}
	
	function fetchTransporters(){							
		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status == 200){
				transportersArray = JSON.parse(request.responseText).result;
				var linkedTransporter = document.getElementById('linkedTransporter');
				removeOptions(linkedTransporter);
				for(var i = 0; i < transportersArray.length; i++){
					var transporter = transportersArray[i];
						var opt = document.createElement('option');
						opt.value = transporter.id;
						opt.innerHTML = transporter.companyName;
						linkedTransporter.appendChild(opt);
				}
			}
		};
		
		request.open ("GET", "http://localhost:8080/AdValoramAdmin/transporter", true);
		request.send();
	}