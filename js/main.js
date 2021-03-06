// Utility Functions //

function log(value) {
	if (typeof console == 'undefined') {
		return false;
	}
	console.log(value)
}


function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + exdate.toUTCString()) +
		";path=/";
}

function getCookie(c_name) {
	
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return false;
}

// End of Utility Functions //


const BasketManager = new function(){
	
	this.items = new Array();
	
	this.addItem = function(item){
		
		const existingItem = this.getItemByProductId(item.product_id);
		// If the item is already added, just increment the quantity
		if(existingItem){
			
			existingItem.quantity++;
		}
		// if not then add it in.
		else {
			item.quantity = 1;
			this.items.push(item);
		}
		
		
	}	
		
	this.getItemByProductId = function(product_id){
		var item = false;	
		// iterate through the array to find it
		if (!Array.prototype.find) {
			for(x=0, max = this.items.length; x < max; x++){
				if(this.items[x].product_id == product_id){
					item = this.items[x];
				}
			}
		}
		// or use .find in newer browsers
		else {			
			item = this.items.find(item => item.product_id === product_id);
		}		
		return item;
	}

	this.removeItemById = function(product_id){		
		const item = this.getItemByProductId(product_id);
		
		// if there's no item at all just return
		if(!item)return false; 
		
		// if there's more than one, take away one
		if(item && item.quantity > 1){
			item.quantity--;
		}
		
		// if there's just one, remove the item entirely
		else if(item) {
			for(x=0, max = this.items.length; x < max; x++){
				if(this.items[x] && this.items[x].product_id == product_id){
					this.items.splice(x,1);					
				}
			}
		}
		return;
	}
	
	this.getItems = function(){
		return this.items;
	}
	
	this.getTotalPrice = function(){	
		
		const total_price = this.items.reduce((total, item) => (parseFloat(item.price) * item.quantity) + total, 0).toFixed(2);
		
		return total_price;
	}

	this.getData = function(){
		return JSON.stringify(this.items);
	}

	this.setData = function(data){
		this.items = JSON.parse(data);
	}
	
	this.emptyBasket = function(){
		this.items.length = 0;
	}

}
function toggleNav(){
	this.classList.toggle('active');
}

function addItemToBasket(){	
	const newItem = {
		title: this.dataset.title,
		price: this.dataset.price,
		product_id: this.dataset.product_id
	}	
	BasketManager.addItem(newItem);
	setCookie('shopping_basket_contents', BasketManager.getData(), 1);
	updateBasketDisplay();
}

function removeItemFromBasket(){	
	BasketManager.removeItemById(this.dataset.product_id);
	setCookie('shopping_basket_contents', BasketManager.getData(), 1);	
	updateBasketDisplay();
}


function emptyBasket(){
	BasketManager.emptyBasket();
	setCookie('shopping_basket_contents', BasketManager.getData(), 1);	
	updateBasketDisplay();
}


function updateBasketDisplay(){
	
	const items = BasketManager.getItems();
	// if there are items to display
	if(items.length){
		
		// template table row for new basket items
		const basketRowTemplate = document.querySelector('#basketItems thead > .template');
		const itemRows = [];
		
		// remove the items currently shown
		document.querySelectorAll('#basketItems tbody .item')
			.forEach(function(node){
				node.parentNode.removeChild(node);
			});
		
		// create a new table row for each item
		items.forEach(function(item){
			newRow = basketRowTemplate.cloneNode(true);
			newRow.classList.remove('template');
			newRow.classList.add('item');
			newRow.querySelector('[data-hook="title"]').innerHTML = item.title;
			newRow.querySelector('[data-hook="quantity"]').innerHTML = item.quantity;
			newRow.querySelector('[data-hook="price"]').innerHTML = item.price;
			itemRows.push(newRow.outerHTML);
		});
		// insert the rows into the basket display table
		document.querySelector('#basketItems tbody').innerHTML = itemRows.join('');
		
		// show and hide GUI elements
		document.querySelector('[data-hook="basket_notice"]').classList.add('hidden');
		document.querySelector('#basketItems').classList.remove('hidden');
		document.querySelector('[data-hook="empty_basket"]').classList.remove('hidden');
		
		const totalPriceContainer = document.querySelector('[data-hook="total_price"]');
		totalPriceContainer.innerHTML = BasketManager.getTotalPrice();
		
		//Doesn't seem right, but Lea Verou does it this way!
		totalPriceContainer.classList.remove('pulse');
		totalPriceContainer.style.webkitAnimation = 'none'		
		setTimeout(function() {
			totalPriceContainer.style.webkitAnimation = ''	
		}, 10);
	}
	// if there aren't then reset the basket
	else {
		
		// remove the items currently shown
		document.querySelectorAll('#basketItems tbody .item')
			.forEach(function(node){
				node.parentNode.removeChild(node);
			});
			
		// show and hide GUI elements
		document.querySelector('[data-hook="basket_notice"]').classList.remove('hidden');
		document.querySelector('#basketItems').classList.add('hidden');
		document.querySelector('[data-hook="empty_basket"]').classList.add('hidden');
	}
	
}

const navToggler = document.querySelector('[data-hook="nav-toggler"]');
navToggler.addEventListener('mousedown', toggleNav);

const addToBasketCTAs = document.querySelectorAll('[data-hook="add_to_basket"]');
const removeFromBasketCTAs = document.querySelectorAll('[data-hook="remove_from_basket"]');
const emptyBasketCTA = document.querySelector('[data-hook="empty_basket"]');

if(addToBasketCTAs){
	addToBasketCTAs.forEach(cta => cta.addEventListener('mousedown', addItemToBasket));
}


if(removeFromBasketCTAs){
	removeFromBasketCTAs.forEach(cta => cta.addEventListener('mousedown', removeItemFromBasket));
}

if(emptyBasketCTA){
	emptyBasketCTA.addEventListener('mousedown', emptyBasket);
}

if(getCookie('shopping_basket_contents')){
	BasketManager.setData(getCookie('shopping_basket_contents'));
	updateBasketDisplay();
}
