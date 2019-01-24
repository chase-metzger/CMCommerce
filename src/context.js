import React, { useState, useEffect } from 'react';

import { storeProducts } from './data';

const ProductContext = React.createContext();

const ProductProvider = ({children}) => {
	const initialCart = JSON.parse(window.localStorage.getItem('cart'));
	let [products, setProducts] = useState(storeProducts);
	let [cart, setCart] = useState(initialCart ? initialCart : []);
	let [modalData, setModalData] = useState({
		isOpen: true,
		itemId: 1
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
		setCart([...cart, product.id]);
	}

	function isItemInCart(id) {
		return cart.includes(id);
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
			openModal,
			closeModal
		}}>
			{children}
		</ProductContext.Provider>
	);
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };