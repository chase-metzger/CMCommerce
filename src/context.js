import React, { useState, useEffect } from 'react';

import { storeProducts } from './data';

const ProductContext = React.createContext();

const ProductProvider = ({children}) => {
	const initialCart = JSON.parse(window.localStorage.getItem('cart'));
	let [products, setProducts] = useState(storeProducts);
	let [cart, setCart] = useState(initialCart ? initialCart : []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	function getItem(id) {
		return products.find(item => item.id === id);
	}

	function addToCart(id) {
		let tempProducts = [...products];
		const index = tempProducts.indexOf(getItem(id));
		const product = tempProducts[index];
		if(isItemInCart(product.id)) return;
		
		product.count = 1;
		product.total = product.price;
		setProducts(tempProducts);
		setCart([...cart, product.id]);
	}

	function isItemInCart(id) {
		return cart.includes(id);
	}

	return (
		<ProductContext.Provider value={{
			products,
			addToCart,
			isItemInCart,
			getItem
		}}>
			{children}
		</ProductContext.Provider>
	);
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };