import React, { useState } from "react";
import axios from 'axios';
import "../css/blogs.scss";

export interface ITopStory {
  title: string;
  author: string;
  available: boolean;
  bookId: number;
  username: string;
  refetchUserBooks: any;
  refetchAllBooks: any;
};

const ShowBook = ({bookId = 0,author = "", title = "", available=false, username, refetchUserBooks, refetchAllBooks}: ITopStory) => {
  const [reserveConfirm, setReserveConfirm] = useState(false);

  const reserveBook = async (bookId: number) => {
    try {
      await axios.post(`http://localhost:8080/users/reservation?username=${username}&bookId=${bookId}`) //I could have used body parameters instead of query parameters  
      setReserveConfirm(true);
      refetchUserBooks();
      refetchAllBooks();
    } catch (error) {
      setReserveConfirm(false);
    }
    
  }

  //Better error handling.
  return (
    <li className="blogsWrapper">
      <div className="blog">
        <div>
          <p>{author}</p>
        </div>

        <h2>{title}</h2>
        <p>{available ? "This books is available": "This book is not available"}</p>
        {available && <button onClick={() => reserveBook(bookId)}> Reserve book</button>}
        {reserveConfirm && <p>Your reservation has been confirmed</p>}
      </div>
    </li>
  );
}

export default ShowBook;
