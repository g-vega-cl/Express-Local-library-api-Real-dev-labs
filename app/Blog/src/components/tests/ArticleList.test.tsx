import { render, screen, within } from '@testing-library/react';
import React from 'react';
import ArticleList from '../BookList';
import { mockPaginationData } from './paginationData.mock.ts';

describe('Utility functions should work as intended',() => {
    it('should render ArticleList', () => {
        render(<ArticleList 
            articles={[]} 
            currentPage={1} 
            rowsPerPage={5} 
            updatePage={jest.fn()}
            updateRowsPerPage={jest.fn()} 
            currentPaginationData={[]} 
            comments={[]}
            commentsError={{message: 'error'}}
            pageSizeOptions={[3,5,10]}
        />);
    });

    it('Previous and buttons should exist', () => {
        render(<ArticleList 
            articles={[]} 
            currentPage={1} 
            rowsPerPage={5} 
            updatePage={jest.fn()}
            updateRowsPerPage={jest.fn()} 
            currentPaginationData={[]} 
            comments={[]}
            commentsError={{message: 'error'}}
            pageSizeOptions={[3,5,10]}
        />);
        const previousButton = screen.getByRole("button", {
          name: "Goto previous page",
        });
        const nextButton = screen.getByRole("button", {
            name: "Goto next page",
        });
        
        expect(nextButton).toBeInTheDocument();
      
        expect(previousButton).toBeInTheDocument();

    });

    it('Articles are rendered', () => {
        const pageSizes = [3,5,10];
        render(<ArticleList 
            articles={[]} 
            currentPage={1} 
            rowsPerPage={pageSizes[0]} 
            updatePage={jest.fn()}
            updateRowsPerPage={jest.fn()} 
            currentPaginationData={mockPaginationData} 
            comments={[]}
            commentsError={{message: 'error'}}
            pageSizeOptions={pageSizes}
        />);
        const articles = screen.getByRole("list", { name: "article list" });
        const articleItems = within(articles).getAllByRole("listitem");
        expect(articleItems).toHaveLength(3);

        for (let i = 0; i < pageSizes[0]; i++) {
            const item = articleItems[i];
            const data = mockPaginationData[i];
        
            const title = within(item).getByText(data.title);
            expect(title).toBeInTheDocument();
            const author = within(item).getByText(data.by);
            expect(author).toBeInTheDocument();
        }
    });
});
