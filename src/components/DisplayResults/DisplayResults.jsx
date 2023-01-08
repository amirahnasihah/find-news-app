import {
  Typography,
  Grid,
  LinearProgress,
  CircularProgress,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "../NewsItem/NewsItem";
import "./DisplayResults.css";

const DisplayResults = ({
  keyWord,
  page,
  updateMyFavourites,
  handleLoadMore,
}) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    setNews([]);
    setIsLoading(true);

    const getNews = async () => {
      // let q = keyWord === "" ? null : keyWord;

      const url =
        keyWord === ""
          ? `https://newsapi.org/v2/top-headlines?country=us&q=${keyWord}&sortBy=publishedAt&pageSize=8&page=${page}&apiKey=${API_KEY}&language=en`
          : `https://newsapi.org/v2/everything?q=${keyWord}&sortBy=publishedAt&apiKey=${API_KEY}`;

      await axios
        .get(url)
        .then((res) => {
          const data = Array.isArray(res.data.articles)
            ? res.data.articles
            : [];
          setNews([...news, ...data]);
          setIsLoading(false);
          // console.log(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response && err.response.status === 400) {
            console.error("Invalid search keyword");
          }
        });
    };
    getNews();
  }, [page]);

  const filterKeyWord = news.filter((item) => {
    return item.title.toLowerCase().includes((keyWord || "").toLowerCase());
  });

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ p: 2 }}>
      <Grid item>
        {isLoading && <LinearProgress />}
        {!isLoading && !news.length && (
          <Typography
            variant="subtitle1"
            align="center"
            style={{ color: "#fff" }}
          >
            There was an error fetching the news data. Please try again.
          </Typography>
        )}
        <Grid container spacing={2}>
          {filterKeyWord.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <NewsItem
                news={item}
                updateMyFavourites={updateMyFavourites}
                keyWord={keyWord}
              />
            </Grid>
          ))}
        </Grid>
        {!isLoading ? (
          <Button
            onClick={handleLoadMore}
            variant="contained"
            className="load-more-btn"
            style={{
              position: "fixed",
              bottom: "10px",
              left: "50%",
              zIndex: "99",
              marginTop: "auto",
              backgroundColor: "aqua",
              color: "black",
            }}
          >
            Load More
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
};

export default DisplayResults;
