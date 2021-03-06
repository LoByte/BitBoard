import React, { useEffect } from "react";
import {
  createMuiTheme,
  ThemeProvider,
  Typography,
  Button,
  Fab
} from "@material-ui/core";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Message } from "./Components/Message";
import { BackgroundImage } from "./Components/BackgroundImage";
import { store } from "./Redux/store";
import { Contrast } from "./Components/Contrast";
import { Edit, Check } from "@material-ui/icons";
import { ToggleEditing, SetComponents } from "./Redux/AppReducer";
import { IState } from "./Redux/IState";
import { Grid } from "./Components/Grid";
import { blue, purple } from "@material-ui/core/colors";
import { DrawerProvider } from "./Components/SettingsDrawer";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: blue[300],
      light: blue[200],
      dark: blue[400]
    },
    secondary: {
      main: purple[300],
      light: purple[200],
      dark: purple[400]
    }
  },
  props: {
    MuiButtonBase: {
      focusRipple: false
    }
  },
  transitions: {
    duration: {
      shortest: 50,
      shorter: 50,
      short: 50,
      standard: 50,
      complex: 50
    }
  }
});

const App = () => {
  const dispatch = useDispatch();
  const { editing, components } = useSelector((state: IState) => state);

  useEffect(() => {
    const rawComponents = localStorage.getItem("components");
    if (typeof rawComponents === "string") {
      const parsedComponents = JSON.parse(rawComponents);
      if (typeof parsedComponents === "object") {
        dispatch(SetComponents(parsedComponents));
      }
    }
  }, [dispatch]);

  const handleEditToggle = () => {
    if (editing) {
      console.log(components);
      localStorage.setItem("components", JSON.stringify(components));
    }
    dispatch(ToggleEditing());
  };

  return (
    <div className="App">
      <BackgroundImage />
      {editing ? <Grid /> : undefined}
      {Object.keys(components).map((id: string) => {
        const component = components[id];
        switch (component.type) {
          case "button": {
            return (
              <Button variant={component.variant} color={component.color}>
                {component.message}
              </Button>
            );
          }
          case "message": {
            return (
              <Message
                key={id}
                id={id}
                message={component.message}
                x={component.x}
                y={component.y}
                width={component.width}
                height={component.height}
                color={component.color}
              />
            );
          }
          default: {
            return undefined;
          }
        }
      })}
      <div style={{ position: "absolute", bottom: "8px", right: "8px" }}>
        <Fab color="primary" onClick={handleEditToggle}>
          {editing ? <Check /> : <Edit />}
        </Fab>
      </div>
      {editing ? (
        <div style={{ position: "absolute", bottom: 0, left: 0 }}>
          <Contrast>
            <Typography color="primary"> Now In Edit Mode </Typography>
          </Contrast>
        </div>
      ) : (
        undefined
      )}
    </div>
  );
};

const AppWithCTX = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DrawerProvider>
          <App />
        </DrawerProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppWithCTX;
