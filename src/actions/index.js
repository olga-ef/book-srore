const booksRequested = (newBooks) => {
	return {
		type: 'FETCH_BOOKS_REQUEST'
	}
};

const booksLoaded = (newBooks) => {
	return {
		type: 'FETCH_BOOKS_SUCCESS',
		payload: newBooks
	}
};

const booksError = (error) => {
	return {
		type: 'FETCH_BOOKS_FAILURE',
		payload: error
	}
};

export const bookAddedToCart = (bookId) => {
	return {
		type: 'BOOK_ADDED_TO_CART',
		payload: bookId
	}
};

const fetchBooks = (bookstoreService, dispatch) => () => {
	// получить данные
	dispatch(booksRequested());
	bookstoreService.getBooks()
		.then((data) => dispatch(booksLoaded(data))) // отправить action s в store
		.catch((err) => dispatch(booksError(err))); 
};



export {
	fetchBooks
};