import { calculateLastPage } from "../components/utils";
import { getPageSiblings } from "../components/utils";

export const DOTS = "...";

function usePagination({currentPage, totalCount, pageSize}) {
  const lastPage = calculateLastPage(totalCount, pageSize);
  const siblings = getPageSiblings(currentPage,lastPage);
  
  // Tested in HatwayBlog.test.js
  if(lastPage === 1){
    return [1]; 
  }
  if(lastPage === 2){
    return [1,2];
  }
  if(lastPage === 3){
    return [1,2,3];
  }
  
  if(lastPage === currentPage){
    return [1,DOTS,siblings.firstSibling - 1,siblings.firstSibling, currentPage];
  }

  if(lastPage === siblings.secondSibling){
    return [1,DOTS,siblings.firstSibling, currentPage, lastPage];
  }
  if(currentPage === 1 || currentPage === 2){
    return [1,2,3, DOTS, lastPage];
  }
  
  return [1,DOTS,siblings.firstSibling, currentPage, siblings.secondSibling, DOTS, lastPage];
}

export default usePagination;
