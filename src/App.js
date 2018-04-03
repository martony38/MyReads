import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import Notice from './Notice';
import ShowLibrary from './ShowLibrary';

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
          <ShowLibrary
            booksOnShelves={this.state.books}
                  onChangeShelf={this.changeShelf}
            onCloseNotice={this.removeNotice}
                />
        )}/>
            <Notice
              notice={this.state.notice}
              onCloseNotice={this.removeNotice}
            />
          </div>
    )
  }
}

export default BooksApp
