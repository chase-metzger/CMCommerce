import React, { useState, useEffect } from 'react';

import { storeProducts } from './data';

const ProductContext = React.createContext();

const ProductProvider = ({children}) => {
	//POSSIBLE TODO(?): USE REDUCERS AND ACTIONS INSTEAD
	const initialCart = JSON.parse(window.localStorage.getItem('cart'));
	let [products, setProducts] = useState(storeProducts);
	let [cart, setCart] = useState(initialCart ? initialCart : {
		items: [],
		subtotal: 0,
		tax: 0,
		total: 0
	});
	let [modalData, setModalData] = useState({
		isOpen: false,
		itemId: -1
	});

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
		setCart({
			...cart,
			items: [...cart.items, product.id]
			///TODO CALCULATE TOTALS
		});
	}

	function isItemInCart(id) {
		return cart.items.includes(id);
	}

	function openModal(id) {
		setModalData({
			isOpen: true,
			itemId: id
		})
	}

	function closeModal() {
		setModalData({
			isOpen: false
		});
	}

	return (
		<ProductContext.Provider value={{
			products,
			getItem,
			addToCart,
			isItemInCart,
			modal: modalData,
			openModal,
			closeModal
		}}>
			{children}
		</ProductContext.Provider>
	);
};

const ProductConsumer = ProductContext.Consumer;

export { ProductContext, ProductProvider, ProductConsumer };