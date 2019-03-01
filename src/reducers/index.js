const initialState = {
	books: [],
	loading: true,
	error: null,
	cartItems: [],
	orderTotal: 350
};

const updateCartItems = (cartItems, item, inx) => {
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

const updateItem = (book, item = {}) => {
	const { 
		id = book.id, 
		title = book.title, 
		count = 0, 
		total = 0 
	} = item;

	return {
		id, 
		title,
		count: count + 1,
		total: book.price + total
	};
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_BOOKS_REQUEST':
			return {
				...state,
				books: [], 
				loading: true,
				error: null 
			}
		case 'FETCH_BOOKS_SUCCESS':
			return {
				...state,
				books: action.payload,
				loading: false,
				error: null
			};

			case 'FETCH_BOOKS_FAILURE':
			return {
				...state,
				books:[],
				loading: false,
				error: action.payload
			};

			case 'BOOK_ADDED_TO_CART':
			 	const bookId = action.payload 
			 	const book = state.books.find((book) => book.id === bookId);
			 	const itemIndex = state.cartItems.findIndex(({id}) => id === bookId);
			 	const item = state.cartItems[itemIndex];
			 	const newItem = updateItem(book, item);

			 	return {
					...state,
					cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
				};
			
		default: 
			return state; 
	}
}

export default reducer;