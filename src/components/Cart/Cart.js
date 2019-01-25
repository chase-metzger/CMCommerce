import React, { useContext } from 'react';

import Title from '../Title';
import CartColumns from './CartColumns';
import CartList from './CartList';
import EmptyCart from './EmptyCart';

import { ProductContext } from '../../context';
import CartTotals from './CartTotals';

export default function Cart() {
	const context = useContext(ProductContext);
	const { cart } = context;

	if(cart.items.length > 0) {
		return (
			<React.Fragment>
				<Title name="your" title="cart" />
				<CartColumns />
				<CartList cart={cart} getItem={context.getItem} />
				<CartTotals cart={cart} />
			</React.Fragment>
		);
	} else {
		return <EmptyCart />;
	}
}
