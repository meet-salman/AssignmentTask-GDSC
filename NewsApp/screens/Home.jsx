import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [inputValue, setInputValue] = useState('');
    const [news, setNews] = useState([]);


    // UseNavigate
    const navigate = useNavigate();

    // UseEffect to fetch News
    useEffect(() => {

        axios.get('https://newsapi.org/v2/everything?q=coding&apiKey=449e5df8cd30457591c693086e844d46')
            .then((res) => {
                setNews(res.data.articles.slice(0, 20));
                console.log(news);
            })
            .catch((err) => {
                alert(err);
            })

    }, [])


    // Search News Function
    const searchNews = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        let topic = formData.get('topic');

        await axios.get(`https://newsapi.org/v2/everything?q=${topic}&apiKey=449e5df8cd30457591c693086e844d46`)
            .then((res) => {
                setNews(res.data.articles.slice(0, 20));
            })
            .catch((err) => {
                alert(err);
            })

        setInputValue('');
    }


    // Single News Function
    const showMore = (i) => {
        let singleNews = [news[i]];

        // Save SingleNews in LocalStorage
        const data = JSON.stringify(singleNews)
        localStorage.setItem('singleNews', data)

        navigate('/news')

    }


    return (
        <>
            <Box>
                <Typography variant='h4' sx={{ marginBottom: '50px', paddingY: '15px', textAlign: 'center', color: '#fff', backgroundColor: '#1976d2' }}> News App </Typography>

                {/* News Form */}
                <Box component="form" onSubmit={searchNews} >
                    <Grid sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <TextField sx={{ width: '25%' }} value={inputValue} onChange={(e) => setInputValue(e.target.value)} name='topic' label="Enter Topic" variant="outlined" size="small" />
                        <Button type='submit' variant="contained" size="small" > Search </Button>
                    </Grid>
                </Box>


                {/* News Section */}
                <Box sx={{ padding: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {news ? news.map((item, i) => {
                        return <Card key={i} index={i} title={item.title} description={item.description} image={item.urlToImage} showMore={() => showMore(i)} />
                    })
                        :
                        <Typography>-</Typography>
                    }
                </Box>





            </Box>
        </>
    )
}

export default Home
