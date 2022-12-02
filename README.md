
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


![demonstration]https://github.com/g-vega-cl/Express-Local-library-api-Real-dev-labs/raw/main/demonstration.gif)