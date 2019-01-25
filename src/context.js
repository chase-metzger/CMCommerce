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

	function addItemToCart(id) {
		let tempProducts = [...products];
		const index = tempProducts.indexOf(getItem(id));
		const product = tempProducts[index];
		if(cartDoesContainItem(product.id)) return;

		product.count = 1;
		product.total = product.price;
		setProducts(tempProducts);
		setCart({
			...cart,
			items: [...cart.items, {
				id: product.id,
				count: 1
			}]
			///TODO CALCULATE TOTALS
		});
	}

	function cartDoesContainItem(id) {
		return cart.items.filter(item => item.id === id).length > 0;
	}

	function incrementCountOfItemInCart(id) {
		console.log('this is the increment method');
	}

	function decrementCountOfItemInCart(id) {
		console.log('this is the decrement method');
	}

	function removeItemFromCart(id) {
		console.log('removing item from cart');
	}

	function clearCart() {
		console.log('clearing the cart');
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
			modal: modalData,
			openModal,
			closeModal,
			cart: {
				...cart,
				doesContainItem: cartDoesContainItem,
				addItem: addItemToCart,
				incrementCountOfItem: incrementCountOfItemInCart,
				decrementCountOfItem: decrementCountOfItemInCart,
				removeItem: removeItemFromCart,
				clearItems: clearCart
			}
		}}>
			{children}
		</ProductContext.Provider>
	);
};

const ProductConsumer = ProductContext.Consumer;

export { ProductContext, ProductProvider, ProductConsumer };