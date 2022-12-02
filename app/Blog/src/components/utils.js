export const getPagesIndex = (currentPage, rowsPerPage) => {
    const indexes = {
      firstPostIndex: (currentPage-1)*rowsPerPage,
      lastPostIndex: (currentPage-1)*rowsPerPage+rowsPerPage,
    }
    return indexes
}

export const getPages = (currentPage,rowsPerPage, articles) => {
    if(!articles || articles.length === 0) return [];
    
    return articles.slice(getPagesIndex(currentPage,rowsPerPage).firstPostIndex, getPagesIndex(currentPage,rowsPerPage).lastPostIndex);
}

export const calculateLastPage = (totalCount, pageSize) => {
    return Math.ceil(totalCount/pageSize);
}

export const getPageSiblings = (currentPage, lastPage) => {
    const siblings = {
        firstSibling: currentPage !== 1 ? currentPage - 1 : 1,
        secondSibling: currentPage !== lastPage ? currentPage + 1 : lastPage,
    }
    return siblings;
}

export const getTop10CommenterNames = (comments) => {
    //Could optimize by adding conditions like:
        // If the 10th most frequent comment commented 10 times, and there are 9 items left, stop.
    if(comments.length === 0) {
        return {top10CommenterNames: [], commentorFrequency: {}}
    }

    const commentorFrequency = {};
    comments.forEach((comment) => {
        if(comment?.deleted){
            return;
        }
        if(commentorFrequency[comment.by]){
            commentorFrequency[comment.by]++;
         }else{
            commentorFrequency[comment.by] = 1;
         }
    });


    const sortedCommentorNames = Object.keys(commentorFrequency).sort(function(a,b){return commentorFrequency[b]-commentorFrequency[a]})
    // Return top 10
    return {top10CommenterNames: sortedCommentorNames.slice(0,10), commentorFrequency: commentorFrequency};
}