import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import GitHubIcon from "@material-ui/icons/GitHub";
import { axiosFetch } from "../../axios";
import {
  CardContent,
  Fab,
  InputAdornment,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { langs } from "./langOptions";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSlice";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",

    "& > div": {
      width: "100%",
      margin: "12px 0",
    },
  },
  card: {
    width: 550,
    display: "flex",
    justifyContent: "center",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const AddPost = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const userInfo = useSelector(selectUser);
  const [values, setValues] = useState({
    ghLink: "",
    title: "",
    desc: "",
    lang: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = () => {
    axiosFetch
      .post("/posts/add", {
        title: values.title,
        desc: values.desc,
        ghLink: values.ghLink,
        lang: values.lang,
        displayName: userInfo.displayName,
      })
      .then((res) => {
        enqueueSnackbar(`${res.data.message}`, {
          variant: `success`,
        });

        history.push(`/post/${res.data.postId}`);
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data.message}`, {
          variant: `${err.response.data.variant}`,
        });
      });
  };

  return (
    <div className={classes.root}>
      <Card elevation={5} className={classes.card}>
        <CardContent className={classes.fields}>
          <TextField
            label="Title"
            value={values.title}
            onChange={handleChange("title")}
          />
          <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            label="GitHub Link"
            value={values.ghLink}
            onChange={handleChange("ghLink")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GitHubIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="standard-select-currency"
            select
            label="Language"
            value={values.lang}
            onChange={handleChange("lang")}
            helperText="Please select type of project"
          >
            {langs.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rowsMax={10}
            value={values.desc}
            onChange={handleChange("desc")}
            variant="outlined"
          />
          <Fab
            onClick={handleSubmit}
            variant="extended"
            color="primary"
            aria-label="add"
          >
            <AddIcon className={classes.extendedIcon} />
            Create Post
          </Fab>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPost;
