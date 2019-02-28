import React from 'react';
import { connect } from 'react-redux';
import './shopping-cart-table.css';

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
	const renderRow = (item, i) => {
		const { id, name, count, total } = item;
			return (
				<tr key={id + 1}>
					<td>{i}</td>
					<td>{name}</td>
					<td>{count}</td>
					<td>${total}</td>
					<td>
					<button
						onClick={() => onDecrease(id)}
						className="btn btn-outline-warning btn-sm float-right">
						<i className="fa fa-minus-circle" />
					</button>
					<button
						onClick={() => onIncrease(id)}
						className="btn btn-outline-success btn-sm float-right">
						<i className="fa fa-plus-circle" />
					</button>
					<button
						onClick={() => onDelete(id)}
						className="btn btn-outline-danger btn-sm float-right">
						<i className="fa fa-trash-o" />
					</button>
					</td>
				</tr>
			);
		}

	return (
		<div className="shopping-cat-table">
			<h2>Your Order</h2>
			<table className="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Item</th>
						<th>Count</th>
						<th>Total</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{items.map(renderRow)}
				</tbody>
			</table>

			<div className="total">Total: ${total}</div>
		</div>
	);
};

const mapStateToProps = ({ cartItems, orderTotal }) => {
	return {
		items: cartItems,
		total: orderTotal
	}
};

const mapDispatshToProps = () => {
	return {
		onIncrease: (id) => {
			console.log(`increase ${id}`)
		},
		onDecrease: (id) => {
			console.log(`decrease ${id}`)
		},
		onDelete: (id) => {
			console.log(`delete ${id}`)
		}
	}
};

export default connect(mapStateToProps, mapDispatshToProps)(ShoppingCartTable);