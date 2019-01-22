import React, { useState, useEffect } from 'react';

import { storeProducts } from './data';

const ProductContext = React.createContext();

const ProductProvider = ({children}) => {
	let [products, setProducts] = useState([]);

	function copyProducts() {
		let tempProducts = [];
		storeProducts.forEach(product => {
			const singleProduct = {...product};
			tempProducts = [...tempProducts, singleProduct];
		});
		setProducts(tempProducts);
	}

	useEffect(() => {
		copyProducts();
	});

	function getItem(id) {
		return products.find(item => item.id === id);
	}

	function addToCart() {
		console.log('hello from add to card');
	}

	return (
		<ProductContext.Provider value={{
			products,
			addToCart,
			getItem
		}}>
			{children}
		</ProductContext.Provider>
	);
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };