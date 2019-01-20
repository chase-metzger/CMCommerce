import React, { useState } from 'react';

import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

const ProductProvider = ({children}) => {
	let [products, setProducts] = useState(storeProducts);
	let [details, setDetails] = useState(detailProduct);

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