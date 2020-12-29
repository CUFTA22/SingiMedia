import {
  Avatar,
  Chip,
  Fab,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosFetch } from "../../axios";
import { selectAccessToken, selectUser } from "../../redux/user/userSlice";
import { useParams } from "react-router-dom";
import ProfilePostsUser from "../../Components/ProfilePostsUser/ProfilePostsUser";
import AvatarModal from "../../Components/AvatarModal/AvatarModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
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
    margin: "20px",
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
  const params = useParams();
  const token = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUser);

  const [open, setOpen] = React.useState(false);

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
    if (token) {
      axiosFetch
        .get("/user/get", {
          params: {
            displayName: params.displayName,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setInfo(res.data);
        })
        .catch((err) => alert("Unauthorized!"));
    }
  }, [token, params.displayName, userInfo]);

  return (
    <div className={classes.root}>
      <AvatarModal open={open} handleClose={() => handleClose()} />
      <Avatar
        onClick={params.displayName == userInfo?.displayName && handleClickOpen}
        src={
          info ? require(`../../assets/avatars/${info.avatar}.svg`).default : ""
        }
        className={`${classes.large} ${
          params.displayName == userInfo?.displayName && classes.hover
        }`}
      />
      <Typography color="textSecondary" variant="h4">
        {info?.displayName}
      </Typography>
      <div className={classes.chips}>
        {info?.chips.map((chip) => (
          <Chip
            key={chip.lang}
            avatar={
              <Avatar
                src={require(`../../assets/postIcons/${chip.lang}.svg`).default}
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
          {params.displayName == userInfo?.displayName && (
            <Tab label="Saved Posts" {...a11yProps(1)} />
          )}
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <ProfilePostsUser />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  );
};

export default ProfilePage;
