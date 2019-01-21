import React, { useState, useEffect } from 'react';

import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

const ProductProvider = ({children}) => {
	let [products, setProducts] = useState([]);
	let [details, setDetails] = useState(detailProduct);

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

	function handleDetail() {
		console.log('hello from detail');
	}

	function addToCart() {
		console.log('hello from add to card');
	}

	return (
		<ProductContext.Provider value={{
			products,
			detailProduct: details,
			handleDetail,
			addToCart
		}}>
			{children}
		</ProductContext.Provider>
	);
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };