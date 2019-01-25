import React from 'react';

export default function CartItem({item, cart}) {
	const { id, title, img, price, total } = item;
	const { items, incrementCountOfItem, decrementCountOfItem, removeItem } = cart;
	const itemCount = items.filter(cartItem => cartItem.id === id)[0].count;
	return (
		<div className="row my-1 text-capitalize text-center">
			<div className="col-10 mx-auto col-lg-2">
				<img
				src={`${process.env.PUBLIC_URL}/${img}`}
				alt="product" style={{
					width: '5rem', height: '5rem'
				}}
				className="img-fluid" />
			</div>
			<div className="col-10 mx-auto col-lg-2">
				<span className="d-lg-none">product: </span>
				{title}
			</div>
			<div className="col-10 mx-auto col-lg-2">
				<span className="d-lg-none">price: </span>
				{price}
			</div>
			<div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
				<div className="d-flex justify-content-center">
					<div>
						<span className="btn btn-black mx-1" onClick={() => decrementCountOfItem(id) }>-</span>
						<span>{itemCount}</span>
						<span className="btn btn-black mx-1" onClick={() => incrementCountOfItem(id) }>+</span>
					</div>
				</div>
			</div>
			<div className="col-10 mx-auto col-lg-2">
				<div className="cart-icon" onClick={() => removeItem(id)}>
					<i className="fas fa-trash">
					</i>
				</div>
			</div>
			<div className="col-10 mx-auto col-lg-2">
				<strong>item total: ${total}</strong>
			</div>
		</div>
	);
}
