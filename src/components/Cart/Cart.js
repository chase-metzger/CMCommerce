import React, { useContext } from 'react';

import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';

import { ProductContext } from '../../context';

export default function Cart() {
	const context = useContext(ProductContext);
	const { cart } = context;

	if(cart.items.length > 0) {
		return (
			<React.Fragment>
				<Title name="your" title="cart" />
				<CartColumns />
			</React.Fragment>
		);
	} else {
		return <EmptyCart />;
	}
}
