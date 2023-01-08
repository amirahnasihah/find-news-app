import "./MyFavouritesPanel.css";
import { Button, Typography, Grid } from "@material-ui/core";

const MyFavouritesPanel = ({
  handleSetKeyword,
  myFavourites,
  clearMyFavourites,
}) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        mt: 2,
      }}
      className="my-fav-side-panel"
    >
      <Grid item xs={8}>
        <Typography
          style={{
            fontWeight: "bold",
          }}
          className="my-fav"
        >
          My Favourites: {myFavourites.length}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          style={{
            marginTop: "10px",
            backgroundColor: "#F38181",
            width: "100%",
            color: "#fff",
            fontWeight: "bold",
            display: "block",
            maxWidth: "200px",
          }}
          variant="contained"
          onClick={clearMyFavourites}
        >
          Clear
        </Button>
      </Grid>
      {myFavourites
        .filter((item) => item)
        .map((item) => (
          <Grid
            item
            xs={12}
            key={item.id}
            className="link-container"
            style={{
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
              onClick={() => handleSetKeyword}
            >
              {item.title}
            </a>
          </Grid>
        ))}
    </Grid>
  );
};

export default MyFavouritesPanel;
