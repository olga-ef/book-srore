import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = ({numItems}, total) => {
	return (
		<header className="shop-header row">
			<a className="logo text-dark" href="">ReStore</a>
			<a>
				<i className="cart-icon fa fa-shopping-cart" />
				{numItems} items
			</a> 
		</header>
	);
}

export default Header;