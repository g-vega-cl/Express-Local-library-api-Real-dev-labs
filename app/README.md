
# Hackernews-stories-web-app

This web application prints the title of the top 30 hacker news stories and the top 10 commenter names of these stories with the total number of comments that they posted (only for these 30 stories).

Run the code using `yarn start` or `docker-compose up`

  
## Definitions
### What is a top story?
The Hacker News API provides two endpoints to get the top stories. `/v0/topstories` and `/v0/beststories`, the former gets the top new stories and the latter gets the top stories of all time.
In this repo we use the `/v0/beststories` endpoint to get the best stories of all time.

We also use the `&orderBy="$priority"&limitToFirst=30` queries to get the stories pre-sorted and limit the query to 30 stories.

Note:
* Other definitions of what constitutes a top story could be used, like a story with the most comments. 
* Stories that are dead or deleted will not be shown.

### What is a top commenter?
  
We found two ways to define what a top commenter is: 
* The user with the highest karma. 
* The user with the most amount of comments in a post.

In this blog we used the former definition, and this will be complimented by showing the total number of comments each commenter has per article.
  
  
## Time and Space complexity.

Our program works in 3 steps:
1. Get the best articles IDs.
	* To get the article information, we need to fetch the best stories from the Hacker News API in O(n) time and space complexity.
2. Get each article's information.
	* To get the articles themselves, we go through the each article's ID, and fetch the data from the API, this is O(n) time and space complexity.
3. Get the comments for each article.
	*	Then for each article, we need to get all of it's comments, this is [O(n2)](https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/) time and space complexity. A giveaway of this is the nested for loop in the `getCommentsAPI` function.

## Optimization:

The optimizations that were used in this repo are:

1. **Cache** We cache the article and comment data locally using [React Query](https://tanstack.com/query/v4). 
We also persist the article IDs for 48 hours using local storage. We chose this interval because we are fetching the best articles of all time, and the list does not change frequently, so a new query every 48 hours diminishes the pressure on the server.

3. **Lazy loading**: We use lazy loading when fetching comments because we use pagination and show from 3 to 15 articles per page, this way the user only fetches the data needed for the page they are looking at.
  
# FAQ
  
**Why did you fetch all article data up-front?**

* Because I think users prefer a bigger wait at the beginning, and then fast navigation. 
	* Note: [There are articles](https://www.portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm) that long loading times hurt conversion, but I think that users with slow internet that would like to see the top articles don't mind waiting. 
Also, I mitigated the wait with a pretty loading page with fun facts.


**Is there any further optimization to do?**

* Decrease bundle size.
	* This helps to decrease the loading time for the first page view.

* If we wanted to fetch more data:
	* We could have our own database and server, we could even use a framework like [next.js to use static generation or server-side rendering](https://nextjs.org/learn/basics/data-fetching/two-forms)

* Create a background process continuously fetches for data. 
	* This way, even if the user is only looking at the first page, the data for the other pages will be ready before the user asks for them.

* Configure our code to fix the automatic .tsx import.
	* At the moment our code needs imports to use `.tsx` extension. This could be annoying, and should be fixed.

* Add CI/CD and automatic linters.
	* We can use tools like husky and/or GitHub actions to make sure our tests pass and our code is clean before merging.

 **Are there any limitations?**
* Some comments have comments of their own, we could use the `getCommentsAPI` function to fetch them as well, and count them towards the total comment count. I decided against this because that would mean fetching too much data from the api. And I don't think this is part of the scope of this project.
