import {
  Avatar,
  Chip,
  CircularProgress,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosFetch } from "../../axios";
import { selectUser } from "../../redux/user/userSlice";
import { useParams } from "react-router-dom";
import ProfilePostsUser from "../../Components/ProfilePostsUser/ProfilePostsUser";
import AvatarModal from "../../Components/AvatarModal/AvatarModal";
import { ReactComponent as Verified } from "../../assets/check.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 100,
    marginBottom: 20,
    [theme.breakpoints.down("xs")]: {
      marginTop: 30,
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: 15,
  },
  hover: {
    "&:hover": {
      filter: "brightness(0.75)",
      cursor: "pointer",
    },
  },
  chips: {
    marginBottom: 20,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& div": {
      margin: "4px 2px",
    },
  },
  tab: {
    marginBottom: 24,
  },
  w100: {
    width: "100%",
  },
  verified: {
    width: 25,
    height: 25,
    position: "relative",
    top: -35,
    left: 80,
  },
  margin: {
    marginBottom: 25,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const classes = useStyles();
  const [info, setInfo] = useState(null);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const userInfo = useSelector(selectUser);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axiosFetch
      .get("/user/get", {
        params: {
          displayName: params.displayName,
        },
      })
      .then((res) => {
        setInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [params.displayName, userInfo]);

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Helmet>
            <title>
              {info
                ? `${info?.displayName}'s Profile | Singi Media`
                : "Loading Profile"}
            </title>
            <meta
              name="description"
              content={`Singi Media PWA is a platform for sharing GitHub code on the web. It is a single page application built in React with a bunch of other libraries that make a modern web application. Visit ${info?.displayName}'s profile`}
            />
          </Helmet>
          <AvatarModal open={open} handleClose={() => handleClose()} />
          <Avatar
            onClick={
              params.displayName === userInfo?.displayName
                ? handleClickOpen
                : undefined
            }
            src={
              info
                ? require(`../../assets/avatars/${info.avatar}.svg`).default
                : ""
            }
            className={`${classes.large} ${
              params.displayName === userInfo?.displayName && classes.hover
            }`}
          />

          <Typography color="textSecondary" variant="h4">
            {info?.displayName}
          </Typography>
          {info?.verified ? (
            <Verified className={classes.verified} />
          ) : (
            <div className={classes.margin} />
          )}

          <div className={classes.chips}>
            {info?.chips.map((chip) => (
              <Chip
                key={chip.lang}
                avatar={
                  <Avatar
                    src={
                      require(`../../assets/postIcons/${chip.lang}.svg`).default
                    }
                  ></Avatar>
                }
                label={chip.desc}
                variant="outlined"
                clickable
              />
            ))}
          </div>
          <Paper elevation={0} square className={classes.tab}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Users Posts" {...a11yProps(0)} />
              {params.displayName === userInfo?.displayName && (
                <Tab label="Saved Posts" {...a11yProps(1)} />
              )}
            </Tabs>
          </Paper>
          <TabPanel className={classes.w100} value={value} index={0}>
            <ProfilePostsUser />
          </TabPanel>
          <TabPanel className={classes.w100} value={value} index={1}>
            Item Two
          </TabPanel>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
