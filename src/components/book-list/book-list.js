import React, { Component } from 'react';
import  './book-list.css';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';

class BookList extends Component {

	componentDidMount() {
		// получить данные
		const { bookstoreService } = this.props;
		const data = bookstoreService.getBooks();
		// отправить action s в store
		this.props.booksLoaded(data);
	}
	
	render() {
		const { books } = this.props;

		return (
			<ul className="book-list">
				{
					books.map((book) => {
						return (<li key={book.id} ><BookListItem book={book} /></li>);
					})
				}
			</ul>
		);
	};
};

const mapStateToProps = ({books}) => {
	return {
		books
	}
};

const mapDispatchToProps =  {
	booksLoaded
};

export default compose(
	withBookstoreService(),
	connect(mapStateToProps, mapDispatchToProps)
)(BookList);

