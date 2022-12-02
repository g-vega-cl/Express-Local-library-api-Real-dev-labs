# Instructions
Build a ReactJS app that:
1- let a user search the Gutendex library for books https://gutendex.com/
2- display the results in a way they can be sorted, and paginated
3- let the user select books from the results and add them to their shortlist
4- display the shortlist
5- persist the shortlist so that the user can see it again the next time he fires his browser and go back to the app
6- reserve the books in the short list at the local library (see local library API)

Build a Local Library API that:
1- takes in book reservations for library members
2- needs the user's username to make the reservation to
3- needs the book Title and first Author
4- returns the date of availability and return date if the book is available
5- returns a message saying the book is not available if it is not
6- list our the reserved books for a user

# Running the app:
1. Start the Express server:
```
cd server
npm install
npm install -g nodemon
nodemon server
```

2. Start the React app:
```
cd app/listings/
npm install
npm start
```

# Limitations
* No authentication.
* Improve settings like typescript and imports, because of time constraints I took a boilerplate and use their default configuration.
* You can't return a reservation. But a librarian could have access to the database and set "available" to "true" once people return their books.


# Notes:
* I need to fix "Can't perform an state mount..." That crept on me at some point, but for now I can ignore it.
## Availability
In the gutenberg data, there is no information about availability. So I assumed that if a user reserves a book in the app, we use our own availability sytem.


![demonstration](https://github.com/g-vega-cl/Express-Local-library-api-Real-dev-labs/blob/main/demonstration.gif)
