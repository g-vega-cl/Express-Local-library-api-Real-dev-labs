import React, {useState, useEffect, useMemo} from "react";
import BookList from "./components/BookList";
import StyledNavbar from "./components/Navbar";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoadingPage from "./components/LoadingPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";


const Page = () => {
  const [username, setUsername] = useState("Test-user");
  const [queryUsername, setQueryUsername] = useState("Test-user"); // This is not good, but time.

  // This should be on it's own file, I'll leave it here if I don't have time.
  const { isLoading: isLoadingUserBooks, data: userBooks, isError: userBooksFetchingError, refetch: refetchUserBooks } = useQuery({queryKey:["userBooks",  queryUsername], queryFn:async () => {
    return axios
      .get(`http://localhost:8080/users/books?username=${queryUsername}`)
      .then((res) => res.data)
    },
    refetchOnWindowFocus: false,
  });


  // This should be on it's own file, I'll leave it here if I don't have time.
  const { isLoading: isLoadingAllBooks, data: allBooks, isError: allBooksFetchingError, refetch: refetchAllBooks } = useQuery({queryKey:["allBooks"], queryFn:async () => {
    return axios
      .get(`http://localhost:8080/books`)
      .then((res) => res.data)
    },
    refetchOnWindowFocus: false,
  });

  const handleUsernameChange = () => {
    setQueryUsername(username);
  }

  if (isLoadingAllBooks || isLoadingUserBooks) return <LoadingPage />;

  if (allBooksFetchingError || userBooksFetchingError) return <ErrorPage errorMessage = {allBooksFetchingError}/>

  return (
    <div style={{ margin: "auto", width: "93%"}}>
      <StyledNavbar />

{/* This should be optimized to only run when a user clicks enter or something */}
      <input
        type="text"
        name="name"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        style={{marginRight: 10}}
      />
      <button onClick={handleUsernameChange} > {username}'s books</button>

      <h1 style={{marginTop: 20}}>User's books</h1>
      <div style={{ display: "flex" }}>
{/* should be different component than the all books one */}
        <BookList 
          books={userBooks} 
          username={queryUsername}
          refetchUserBooks={refetchUserBooks}
          refetchAllBooks={refetchAllBooks}
        />
      </div>
      <hr />

      <h1>All books</h1>
      <div style={{ display: "flex" }}>
        <BookList 
          books={allBooks} 
          username={queryUsername}
          refetchUserBooks={refetchUserBooks}
          refetchAllBooks={refetchAllBooks}
        />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default Page;
