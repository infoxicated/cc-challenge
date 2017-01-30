<!DOCTYPE html>
<html lang="en">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
	<meta charset="utf-8" />
	<title>CC Shopping Basket</title>
	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<meta name="robots" content="index,follow" />
	<meta name="MSSmartTagsPreventParsing" content="true" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
	<header>
		<div class="page_container">			
			<div id="branding"><a href="index.php" title="Home">CC Shop</a></div>
			<button data-hook="nav-toggler"><svg width="40" height="40">
				<line x1="0" y1="6" x2="40" y2="6" style="stroke-width:5" />
				<line x1="0" y1="18" x2="40" y2="18" style="stroke-width:5" />
				<line x1="0" y1="30" x2="40" y2="30" style="stroke-width:5" />
			</svg></button>
			<nav>
				<ul>
					<li><a href="#" class="current">Products</a></li>
					<li><a href="#">My basket</a></li>		
				</ul>	
			</nav>
		</div>
	</header>
<main> 
	<div class="page_container">
		<h1>Welcome to the CC Shop</h1>
		<div id="content">
			<div class="two_blocks">
				<div role="main">
					<h2>Products</h2>
					<ul class="product_list">
						<li>
							<h3>Bronze Widget</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, ad, minima quisquam aspernatur recusandae repellendus sint hic corporis nemo mollitia! Eligendi fuga atque sit maiores quo nam dolore iure nobis.</p>
							<button data-product_id="10001" data-price="9.99" data-title="Bronze Widget" data-hook="add_to_basket">Add to Basket</button><button data-product_id="10001" data-hook="remove_from_basket">Remove from Basket</button>
						</li>
						<li>
							<h3>Silver Widget</h3>
							<p>Eligendi fuga atque sit maiores quo nam dolore iure nobis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, ad, minima quisquam aspernatur recusandae repellendus sint hic corporis nemo mollitia! </p>
							<button data-product_id="10002" data-price="11.99" data-title="Silver Widget" data-hook="add_to_basket">Add to Basket</button><button data-product_id="10002" data-hook="remove_from_basket">Remove from Basket</button>
						</li>
						<li>
							<h3>Gold Widget</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, ad, minima quisquam aspernatur recusandae repellendus sint hic corporis nemo mollitia! Eligendi fuga atque sit maiores quo nam dolore iure nobis.</p>
							<button data-product_id="10003" data-price="12.99" data-title="Gold Widget" data-hook="add_to_basket">Add to Basket</button><button data-product_id="10003" data-hook="remove_from_basket">Remove from Basket</button>
						</li>
						<li>
							<h3>Platinum Widget</h3>
							<p>Eligendi fuga atque sit maiores quo nam dolore iure nobis. Eligendi fuga atque sit maiores quo nam dolore iure nobis. Eligendi fuga atque sit maiores quo nam dolore iure nobis.</p>
							<button data-product_id="10004" data-price="19.99" data-title="Platinum Widget" data-hook="add_to_basket">Add to Basket</button><button data-product_id="10004" data-hook="remove_from_basket">Remove from Basket</button>
						</li>
					</ul>
				</div><div role="complimentary">	
					<h2>My Basket</h2>
						<table id="basketItems" class="visually_hidden nicetable">
							<thead>
								<tr>
									<th scope="col">Item</th><th scope="col">Qty</th><th scope="col">Price</th>
								</tr>
								<tr class="template" data-hook="product_id">	
									<td data-hook="title"></td>
									<td data-hook="quantity" class="text_right"></td>
									<td data-hook="price" class="text_right price"></td>
								</tr>
							</thead>
							<tbody>
								
							</tbody>
							<tfoot>
								<th colspan="2" scope="row" class="text_right">Total Price: </th>
								<td data-hook="total_price" class="text_right price"></td>
							</tfoot>
						</table>
						<p class="notice" data-hook="basket_notice">No items in basket</p>
						
				</div>
			</div>
		</div><!-- closes content -->
	</div><!-- closes page_container -->
</main>

<footer>
	<div class="page_container">	
	
	
	</div>
</footer>
<script type="text/javascript" src="js/main.js"></script>


</body>

</html>