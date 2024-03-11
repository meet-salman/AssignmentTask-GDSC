import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const SingleNews = () => {

  const [news, setNews] = useState();

  // UseNavigate
  const navigate = useNavigate();

  // UseEffect to get Single New from LocalStorage
  useEffect(() => {

    const data = localStorage.getItem('singleNews');
    const singleNews = JSON.parse(data);
    setNews(singleNews);

  }, [])

  // Navigate to Home
  function navigateToHome() {
    navigate('/')
  }

  return (
    <>
      <Box>
        <Typography onClick={navigateToHome} variant='h6' sx={{ marginBottom: '50px', padding: '15px', cursor: 'pointer', color: '#fff', backgroundColor: '#1976d2' }}> ← Back </Typography>

        <Box sx={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
          {news ?
            <Card sx={{ maxWidth: 800 }}>
              <CardMedia sx={{ height: 200 }} image={news[0].urlToImage} />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div"> {news[0].title} </Typography>
                <Typography variant="body2" color="text.secondary"> {news[0].description} </Typography>
              </CardContent>

            </Card>
            :

            <Typography>-</Typography>}
        </Box>

      </Box>
    </>
  )
}

export default SingleNews
