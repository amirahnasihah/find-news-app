import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Header from "../Header/Header";
import MyFavouritesPanel from "../MyFavouritesPanel/MyFavouritesPanel";
import DisplayResults from "../DisplayResults/DisplayResults";
import "./Home.css";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const LOCALS_STORAGE_KEY = "myFavourites";
  const [keyWord, setKeyword] = useState("");
  const [myFavourites, setMyFavourites] = useState(
    JSON.parse(localStorage.getItem(LOCALS_STORAGE_KEY)) ?? []
  );
  const [page, setPage] = useState(1);

  const handleSetKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const updateMyFavourites = (news) => {
    // Retrieve the current favorites from localStorage
    let savedFavorites = localStorage.getItem("myFavourites");
    // If there are no favorites in localStorage, create an empty array
    if (!savedFavorites) {
      savedFavorites = [];
    } else {
      // Otherwise, parse the favorites from localStorage as JSON
      savedFavorites = JSON.parse(savedFavorites);
    }

    // Check if the news item is already in the "myFavourites" list
    const existingFavorite = myFavourites.find(
      (favorite) => favorite.title === news.title
    );
    if (!existingFavorite) {
      // Add the new favorite to the array with a unique identifier
      const newFavorite = { id: uuidv4(), title: news.title, ...news };
      savedFavorites.push(newFavorite);
      // Save the updated favorites array to localStorage
      localStorage.setItem(LOCALS_STORAGE_KEY, JSON.stringify(savedFavorites));
      // If it's not, add it to the list
      setMyFavourites([...myFavourites, newFavorite]);
    }
  };

  const clearMyFavourites = () => {
    setMyFavourites([]);
    localStorage.removeItem("myFavourites");
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    // Retrieve the saved favorites from localStorage
    const savedFavorites = localStorage.getItem("myFavourites");

    if (savedFavorites && JSON.parse(savedFavorites).length > 0) {
      // If there are saved favorites, parse the saved favorites from localStorage as JSON and set it to the component's state
      setMyFavourites(JSON.parse(savedFavorites));
    }

    return () => {
      // Reset the component's state when the component is unmounted
      setMyFavourites([]);
    };
  }, []);

  return (
    <Grid container className="main-container" direction={"column"}>
      <Grid
        item
        lg={1}
        style={{
          maxHeight: "10vh",
        }}
      >
        {/* Header */}
        <Header
          className="header-container"
          keyWord={keyWord}
          handleSetKeyword={handleSetKeyword}
        />
      </Grid>

      <Grid className="content-container" item lg={11}>
        <Grid container direction="row" style={{ height: "100%" }}>
          {/* MyFavouritesPanel */}
          <Grid className="left-panel-container" item lg={2.5}>
            <MyFavouritesPanel
              style={{
                overFlowY: "scroll",
              }}
              handleSetKeyword={handleSetKeyword}
              myFavourites={myFavourites}
              clearMyFavourites={clearMyFavourites}
            />
          </Grid>
          {/* DisplayResults */}
          <Grid className="result-container" item lg={9.5}>
            <DisplayResults
              keyWord={keyWord}
              updateMyFavourites={updateMyFavourites}
              page={page}
              handleLoadMore={handleLoadMore}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
