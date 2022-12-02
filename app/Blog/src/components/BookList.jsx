import React from "react";
import ShowBook from "./ShowBook.tsx";
const BookList = ({books, username, refetchUserBooks,refetchAllBooks}) => {
  if(!Array.isArray(books)) return (<p>There are no books here</p>);

  return (
    <div>
      <ul
        aria-label="article list"
      >
        {books.map((book, index) => (
          <ShowBook
            key={`${book.bookId}-${index}`}
            title={book.title || book.bookName}
            author={book.firstAuthor || book.author}
            available={book.available}
            bookId={book.id || book.bookId}
            username={username}
            refetchUserBooks={refetchUserBooks}
            refetchAllBooks={refetchAllBooks}
          />
        ))}
      </ul>
    </div>
  );
}

export default BookList;
