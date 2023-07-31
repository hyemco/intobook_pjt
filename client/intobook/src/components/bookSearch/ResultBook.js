import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const ResultBook = ({ bookCover }) => {
  const title = bookCover?.title.split('-')[0].trim()
  const author = bookCover?.author.split('(')[0].trim()

  return (
    <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', width: {xs: '88px'}}}>
      <Link to={`/book/${bookCover.isbn13}`} style={{textDecoration: 'none'}}>
        <CardMedia image={bookCover?.cover} alt={bookCover?.title} sx={{ width: 88, height: 112 }} />
        <CardContent sx={{ height: '42px', padding: '2px'}} >
          <TitleTypography
            fontWeight={'bold'} 
            fontSize={'13px'} 
            align='center' 
            letterSpacing={'-0.5px'}
          >
            {title}
          </TitleTypography>
          <Typography fontSize={'11px'} align='center' color={'black'} letterSpacing={'-1px'}>
            {author}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

const TitleTypography = styled(Typography)`
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export default ResultBook;