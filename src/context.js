import React, { useState, useEffect } from 'react';

const useFetch = (url, initialData) => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(initialData);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const response = await fetch(url);
				if(response.ok) {
					const data = await response.json();
					setData(data);
				} else {
					setError(new Error(response.statusText));
				}
			} catch(e) {
				setError(e);
			}

			setLoading(false);
		})();
	}, [url]);

	return { error, loading, data };
}

const useLocalStorage = (key, initialValue) => {
	const [item, setInnerValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch(error) {
			return initialValue;
		}
	});

	const setValue = (value) => {
		setInnerValue(value);
		window.localStorage.setItem(key, JSON.stringify(item));
	};

	return [item, setValue];
}

const ProductContext = React.createContext();

const ProductProvider = ({children}) => {
	//POSSIBLE TODO(?): USE REDUCERS AND ACTIONS INSTEAD
	let productData = useFetch(process.env.REACT_APP_PRODUCTS_API_URL);
	const products = (productData.error || productData.loading) ? [] : productData.data;

	let [cart, setCart] = useLocalStorage('cart', {
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
		if(products) {
			addCartTotals();
		}
	}, [cart]);

	function getProductById(id) {
		return products.find(item => item.id === id);
	}

	function addItemToCart(id) {
		let tempProducts = [...products];
		const index = tempProducts.indexOf(getProductById(id));
		const product = tempProducts[index];
		if(cartDoesContainItem(product.id)) return;

		setCart({
			...cart,
			items: [...cart.items, {
				id: product.id,
				count: 1
			}]
		});
	}

	function cartDoesContainItem(id) {
		return cart.items.filter(item => item.id === id).length > 0;
	}

	//TODO: CLEANUP THE increment/decrement functions
	function incrementCountOfItemInCart(id) {
		const tempItems = cart.items.map(item => {
			if(item.id === id) {
				++item.count;
			}
			return item;
		});

		setCart({
			...cart,
			items: tempItems
		})
	}

	function decrementCountOfItemInCart(id) {
		let shouldRemove = false;
		let tempItems = cart.items.map(item => {
			if(item.id === id) {
				--item.count;
				shouldRemove = item.count <= 0;
			}
			return item;
		});

		if(shouldRemove) {
			tempItems = tempItems.filter(item => item.id !== id);
		}

		setCart({
			...cart,
			items: tempItems
		})
	}

	function removeItemFromCart(id) {
		const tempItems = cart.items.filter(item => item.id !== id);

		setCart({
			...cart,
			items: tempItems
		});
	}

	function clearCart() {
		setCart({
			...cart,
			items: [],
			subtotal: 0,
			tax: 0,
			total: 0
		})
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

	function addCartTotals() {
		let subtotal = 0;
		cart.items.forEach(cartItem => {
			const item = getProductById(cartItem.id);
			subtotal += item.price * cartItem.count;
		});
		const tempTax = subtotal * 0.1;
		const tax = parseFloat(tempTax.toFixed(2));
		const total = subtotal + tax;
		setCart({
			...cart,
			subtotal,
			tax,
			total
		});
	}

	return (
		<ProductContext.Provider value={{
			products,
			getProductById,
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