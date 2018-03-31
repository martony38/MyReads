import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  changeShelf = (bookToUpdate, shelf) => {
    // Move book to new shelf by changing state
    this.setState(prevState => {
      let books = prevState.books.filter(book => book !== bookToUpdate);
      bookToUpdate.shelf = shelf;
      books.push(bookToUpdate);
      return { books };
    })

    // Update book in backend server
    BooksAPI.update(bookToUpdate, shelf).then(res => {
      if (shelf === "none") {
        for (const shelf in res) {
          if (shelf.includes(bookToUpdate.id)) {
            alert('error: failed to remove book');
          }
        }
        alert('Book has been removed')
      } else {
        res[shelf].includes(bookToUpdate.id) ? alert(`Book has been moved to ${shelf}`) : alert(`error: failed to move book to ${shelf}`);
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks
            onChangeShelf={this.changeShelf}
            booksOnShelves={this.state.books}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title="Currently Reading"
                  books={this.state.books.filter(book => book.shelf === "currentlyReading")}
                  onChangeShelf={this.changeShelf}
                />
                <BookShelf
                  title="Want to Read"
                  books={this.state.books.filter(book => book.shelf === "wantToRead")}
                  onChangeShelf={this.changeShelf}
                />
                <BookShelf
                  title="Read"
                  books={this.state.books.filter(book => book.shelf === "read")}
                  onChangeShelf={this.changeShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
