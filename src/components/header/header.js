import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.css';

const Header = ({numItems}) => {
	return (
		<header className="shop-header row">
			<Link to="/">
				<div className="logo text-dark" href="">ReStore</div>
			</Link>
			<Link to="/cart">
				<div className="shopping-cart">
					<i className="cart-icon fa fa-shopping-cart" />
					{numItems} items
				</div>
			</Link> 
		</header>
	);
}

const mapStateToProps = ({ shoppingCart: { cartItems } }) => {
	return {
		numItems: cartItems.length
	}
}

export default connect(mapStateToProps)(Header);