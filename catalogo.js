var script = document.createElement('script');
script.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
document.getElementsByTagName('head')[0].appendChild(script);
window.X = function (json) {
	
	var reference = json.data.reference.item;
	var products = json.data.recommendation;

	var showReference = function(){
		var product = createProduct();
		
		var div = document.createElement("div");
		product.appendChild(div);
		
		var list = document.createElement("ul");
		div.appendChild(list);
		
		list.appendChild(generateLine(reference.name));
		list.appendChild(generateLine("<a href='http:"+reference.detailUrl+"'>Ver na loja</a>"));
		list.appendChild(generateLine("de "+reference.oldPrice));
		list.appendChild(generateLine("<span id='newPrice'>por "+reference.price+"</span>"));
		list.appendChild(generateLine(reference.productInfo.paymentConditions));
	}
	function createProduct(){
		var product = document.getElementById("reference");
		var div = document.createElement("div");
		div.innerHTML = "<p>cód "+reference.businessId+"</p><br><img src='http:"+reference.imageName+"'/>";
		product.appendChild(div);
		return product;
	}
	var generateLine = function(data){
		var line = document.createElement("li");
		line.innerHTML = data;
		return line;
	}
	var generateDiv = function(data){
		var div = document.createElement("div");
		div.innerHTML = data;
		return div;
	}
		
	var listAll = function(){
		var body = document.createElement("ul");

		for(var i = 0; i < products.length; i++){
			var line = document.createElement("li");
			body.appendChild(line);
					
			line.appendChild(generateDiv("<img src='http:"+products[i].imageName+"'/>"));
			line.appendChild(generateDiv(products[i].name));
			line.appendChild(generateDiv("<a href='http:"+products[i].detailUrl+"'>Ver na loja</a>"));
						
			if(products[i].oldPrice === null){
				line.appendChild(generateDiv(""));
			}else{
				line.appendChild(generateDiv("<span id='oldPrice'>de "+products[i].oldPrice+"</span>"));
			}
			
			line.appendChild(generateDiv("<span id='newPrice'>por "+products[i].price+"</span>"));
			line.appendChild(generateDiv(products[i].productInfo.paymentConditions));
			line.appendChild(generateDiv("cód "+products[i].businessId));
	}	 	  	
		return body;
	}

	$(document).ready(function(){
		var choice = showReference();
		var body = listAll();
		var container = document.getElementById("container");
		container.innerHTML = "";
		container.appendChild(body);
	});

	$("#searchButton").click(function search(){
		var searchInput = $("#searchInput").val().toLowerCase();
		products = json.data.recommendation;
		
		if(searchInput === ""){
			searchList();
			return;
		}else{
			products = findProducts(searchInput);
			if(products.length === 0){
				alert("Nenhum resultado encontrado.");
				products = json.data.recommendation;
			}
		}
		searchList();
	});

	var findProducts = function(searchInput){
		var found = [];
		for(i=0; i< products.length; i++){
				var product = products[i];
				var text = product.name;
				var words = text.split(" ");
				
				for(j=0; j < words.length; j++){
					if(searchInput === words[j].toLowerCase()){
						found.push(product);
						break;
					}
				}
			}
			return found;
	}

	var searchList = function(){
		var body = listAll();
		var container = document.getElementById("container");
		container.innerHTML = "";
		container.appendChild(body);
	}	
};
