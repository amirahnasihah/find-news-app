import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#F38181",
    "&:hover": {
      backgroundColor: "#E65F5F",
    },
  },
}));

const OrangeButton = (props) => {
  const classes = useStyles();

  return <Button className={classes.root} {...props} />;
};

export default OrangeButton;
