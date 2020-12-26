import React, { useEffect, useState } from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import EventIcon from "@material-ui/icons/Event";
import TodayIcon from "@material-ui/icons/Today";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import StarIcon from "@material-ui/icons/Star";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import TuneIcon from "@material-ui/icons/Tune";
import { makeStyles, MenuItem, TextField } from "@material-ui/core";
import { fetchPostsAsync } from "../../redux/posts/postsSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 5px 25px 5px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  select: {
    width: 100,
  },
}));

const actions1 = [
  { icon: <StarIcon />, name: "Stars" },
  { icon: <TodayIcon />, name: "Oldest" },
  { icon: <EventIcon />, name: "Newest" },
];
const options = [
  {
    value: 6,
  },
  {
    value: 8,
  },
  {
    value: 16,
  },
  {
    value: 32,
  },
];

const HPFilters = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    filter: "Stars",
    count: 6,
  });

  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);

  const handleFetchNew = (prop) => {
    dispatch(fetchPostsAsync(prop, filters.count));
  };

  const handleClose = () => {
    setOpen1(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleChangeFilter = (name) => {
    setFilters({
      ...filters,
      filter: name,
    });
    handleFetchNew(name);
  };
  const handleChangeCount = (prop) => (event) => {
    setFilters({
      ...filters,
      [prop]: event.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        hidden={false}
        icon={<TuneIcon />}
        onClose={handleClose}
        onOpen={handleOpen1}
        open={open1}
        direction="right"
      >
        {actions1.map((action) => (
          <SpeedDialAction
            onClick={() => handleChangeFilter(action.name)}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <TextField
        id="standard-select-currency"
        select
        className={classes.select}
        label="Count"
        value={filters.count}
        onChange={handleChangeCount("count")}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default HPFilters;
