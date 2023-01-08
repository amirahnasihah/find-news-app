import { Card, Grid, IconButton } from "@material-ui/core";
import { Favorite } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import "./NewsItem.css";
import { useEffect } from "react";

const NewsItem = ({ news, updateMyFavourites }) => {
  useEffect(() => {
    // Check if the news item is saved as a favorite
    const storedFavorites = localStorage.getItem("myFavourites");
    if (storedFavorites) {
      updateMyFavourites(news);
    }
  }, []);

  return (
    <Grid container>
      <Grid item>
        <Card className="card-el" key={news.id}>
          <CardHeader
            avatar={
              <Avatar
                style={{ backgroundColor: "#ffc0cb" }}
                aria-label="recipe"
              >
                {news.source.name.charAt(0)}
              </Avatar>
            }
            action={<IconButton aria-label="settings"></IconButton>}
            title={news.source.name.slice(0, 20)}
            subheader={new Date(news.publishedAt).toLocaleDateString("en-MY")}
          />
          <CardMedia
            style={{
              maxHeight: "300px",
              overflow: "auto",
            }}
            height="194"
            component="img"
            title={news.title}
            image={news.urlToImage}
            alt={news.title}
          />
          <CardContent
            style={{
              maxHeight: "300px",
              overflow: "auto",
            }}
          >
            <Typography>{news.title.slice(0, 100)}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button
              size="small"
              color="primary"
              target="_blank"
              rel="noopener noreferrer"
              href={news.url}
            >
              Read
            </Button>
            <IconButton
              color="inherit"
              aria-label="add to favorites"
              onClick={() => {
                updateMyFavourites(news);
              }}
            >
              <Favorite />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NewsItem;
