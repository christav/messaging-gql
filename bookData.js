// use strict

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  },
  {
    title: 'The Andromeda Strain',
    author: 'Michael Crichton'
  },
  {
    title: 'Stranger in a Strange Land',
    author: 'Robert Heinlein'
  },
  {
    title: 'Ringworld',
    author: 'Larry Niven'
  },
  {
    title: 'Starship Troopers',
    author: 'Robert Heinlein'
  },
  {
    title: 'The Moon is a Harsh Mistress',
    author: 'Robert Heinlein'
  }
]

const byAuthor = author => books.filter(book => book.author.toLowerCase() === author.toLowerCase())
const byTitle = title => books.filter(book => book.title.toLowerCase() === title.toLowerCase())

module.exports = {
  books,
  byAuthor,
  byTitle
}
