import React from 'react';
import styled from 'styled-components';
import BookshelvesContent from './../components/bookshelves/BookshelvesContent';
import BookWishList from './../components/bookshelves/BookWishList';

const StyledBookshelvesPage = styled.div`
  text-align: center;
  border: 1px solid black;
  margin: 10px 10px 10px 10px;
`;

const StyledBookTitle = styled.div`
  border: 1px solid black;
  margin: 10px 10px 10px 10px;
`;


const BookshelvesPage = () => {
  return (
    <StyledBookshelvesPage>
      <StyledBookTitle>
        능이님의 책장입니다.
      </StyledBookTitle>
      <BookWishList/>
      <BookshelvesContent/>
    </StyledBookshelvesPage>
  );
}

export default BookshelvesPage;