import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks';
import Notice from './Notice';

class BooksApp extends React.Component {
  state = {
    notice: "",
    books: []
  }

  addNotice = message => this.setState({ notice: message })

  removeNotice = () => {
    this.setState({ notice: "" })
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.setState({ books }))
      .catch(error => this.addNotice(`Error while getting books from database: ${error}`));
  }

  changeShelf = (bookToUpdate, shelf) => {
    // Move book to new shelf by changing state
    this.setState(prevState => {
      let books = prevState.books.filter(book => book !== bookToUpdate);
      bookToUpdate.shelf = shelf.value;
      books.push(bookToUpdate);
      return { books };
    })

    // Update book in backend server
    BooksAPI.update(bookToUpdate, shelf.value)
      .then(res => {
        if (shelf.value === "none") {
          for (const shelf in res) {
            if (shelf.includes(bookToUpdate.id)) {
              this.addNotice('Error: Failed to remove book');
            }
          }
          this.addNotice('Book has been removed');
        } else {
          this.addNotice(res[shelf.value].includes(bookToUpdate.id) ? `Book has been moved to shelf "${shelf.title}"` : `Error: Failed to move book to shelf ${shelf.title}`);
        }
      })
      .catch(error => this.addNotice(`Error while updating book in database: ${error}`));
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks
            onChangeShelf={this.changeShelf}
            booksOnShelves={this.state.books}
            notice={this.state.notice}
            onAddNotice={this.addNotice}
            onCloseNotice={this.removeNotice}
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
            <Notice
              notice={this.state.notice}
              onCloseNotice={this.removeNotice}
            />
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
