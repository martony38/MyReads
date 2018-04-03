import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookResults from './BookResults';

class SearchBooks extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    booksOnShelves: PropTypes.array,
    onAddNotice: PropTypes.func.isRequired,
    onCloseNotice: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = query => {
    this.setState({ query: query });
  }

  componentWillUnmount() {
    this.props.onCloseNotice();
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {// Only mount component if search query not empty
        this.state.query && (
        <BookResults
          onChangeShelf={this.props.onChangeShelf}
          booksOnShelves={this.props.booksOnShelves}
          onAddNotice={this.props.onAddNotice}
          onCloseNotice={this.props.onCloseNotice}
          query={this.state.query}
        />)}
      </div>
    )
  }
}

export default SearchBooks