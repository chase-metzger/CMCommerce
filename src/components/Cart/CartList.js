import React from 'react';

import CartItem from './CartItem';

export default function CartList({cart, getItem}) {
	return (
		<div className="container-fluid">
			{cart.items.map(item => {
				const itemData = getItem(item.id);
				return <CartItem key={item.id} item={itemData} cart={cart}/>
			})
			}
		</div>
	);
}
