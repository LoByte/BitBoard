import React from "react";
import {
  Drawer,
  List,
  Slider,
  makeStyles,
  Typography,
  Theme
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../Redux/IState";
import {
  ToggleSettingsDrawer,
  SetDarkness,
  SetBlur
} from "../Redux/AppReducer";
import { DarknessSlider } from "./Settings/DarknessSlider";
import { BlurSlider } from "./Settings/BlurSlider";

const DrawerStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "20vw",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1)
  }
}));

export const SettingsDrawer = () => {
  const dispatch = useDispatch();
  const classes = DrawerStyles();
  const { settingsDrawer, darkness, blur } = useSelector(
    (state: IState) => state
  );

  const updateBlur = (event: any, value: number | number[]) => {
    if (typeof value === "number") {
      dispatch(SetBlur(value));
    }
  };

  return (
    <Drawer
      open={settingsDrawer}
      onClose={() => dispatch(ToggleSettingsDrawer())}
    >
      <List className={classes.root}>
        <DarknessSlider />
        <BlurSlider />
      </List>
    </Drawer>
  );
};
