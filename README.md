# MongoDB and Express.js REST API sample application

This repository contains the sample application for the [MongoDB and Express.js REST API tutorial](https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial).

![main workflow](https://github.com/mongodb-developer/mongodb-express-rest-api-example/actions/workflows/main.yml/badge.svg)

## How To Run

1. You can follow the [Getting Started with Atlas](https://docs.atlas.mongodb.com/getting-started/) guide, to learn how to create a free Atlas account, create your first cluster and get your Connection String to the database. 
Then, set the Atlas URI connection parameter in `server/config.env` to your Connection String:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

2. Start the Express server:
```
cd server
npm install
npm install -g nodemon
nodemon server
```

3. Start the React app:
```
cd app/listings/
npm install
npm start
```

## Disclaimer

Use at your own risk; not a supported MongoDB product




# Steps
I spent the first 30 minutes thinking about which DB to use and looking for good boilerplates.
I found an express boilerplate and a frontend boilerplate I had from another project.


# Limitations
* No auth
* Improve settings like typescript and imports, because of time constraints I took a boilerplate and use their default configuration.


# Notes:
## Availability
In the gutenberg data, there is no information about availability. So I assumed that if a user reserves a book in the app, we use that as availability, like our own personal library. To cut time, I decided that the book can only be reserved for one week.

book model {
    id: number;
    title: string;
    firstAuthor: string;
    availability: {
        available: boolean; // We don't even need this. We just need to check if return date is undefined.
        dateAvailable: date; // NO DATE AVAILABLE, if it's available, it means that data available is now.
        returnData: date;
    }
}

user { 
    username: string;
    reservedBooks: book.id[];
}


