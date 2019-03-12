const updateCartItems = (cartItems, item, inx) => {
	if (item.count === 0) {
		return [
			...cartItems.slice(0, inx),
			...cartItems.slice(inx + 1)
		];
	}

	if (inx === -1) {
		return [
			...cartItems,
			item
		];
	}

	return [
		...cartItems.slice(0, inx),
		item,
		...cartItems.slice(inx + 1)
	];
};

const updateItem = (book, item = {}, quantity) => {
	const { 
		id = book.id, 
		title = book.title, 
		count = 0, 
		total = 0 
	} = item;

	return {
		id, 
		title,
		count: count + quantity,
		total: quantity * book.price + total
	};
}

const updateOrderTotal = (cartItems) => {
	if (cartItems.length === 0) {
		return 0;
	}

	return cartItems.reduce((sum, current) => sum + current.total, cartItems[0].total);
}

const updateOrder = (state, bookId, quantity) => {
	const { bookList: { books }, shoppingCart: { cartItems, orderTotal } } = state;
	const book = books.find(({ id }) => id === bookId);
	const itemIndex = cartItems.findIndex(({id}) => id === bookId);
	const item = cartItems[itemIndex];
	const newItem = updateItem(book, item, quantity);
	const newCartItems = updateCartItems(cartItems, newItem, itemIndex);

	return {
		orderTotal: updateOrderTotal(newCartItems),
		cartItems: newCartItems
	};
}

const updateShoppingCart = (state, action) => {
	if (state === undefined) {
		return {
			cartItems: [],
			orderTotal: 0
		};
	}

	switch (action.type) {
		case 'BOOK_ADDED_TO_CART':
			return updateOrder(state, action.payload, 1);

		case 'BOOK_REMOVED_FROM_CART':
			return updateOrder(state, action.payload, -1);
	

		case 'ALL_BOOKS_REMOVED_FROM_CART':
			const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload);
			return updateOrder(state, action.payload, -item.count);

		default: 
			return state.shoppingCart;
	}
};

export default updateShoppingCart;