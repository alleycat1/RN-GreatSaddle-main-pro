import React from "react";
import { Provider, darkTheme, defaultTheme } from "@react-native-material/core";
import tailwindConfig from "../../tailwind.config";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

export const colors = {
  ...tailwindConfig.theme.extend.colors,
};

const typography = {
  h1: {
    fontWeight: "300",
    fontSize: 96,
    letterSpacing: -1.5,
    fontFamily: "Lato-Regular",
  },
  h2: {
    fontWeight: "300",
    fontSize: 60,
    letterSpacing: -0.5,
    fontFamily: "Lato-Regular",
  },
  h3: {
    fontSize: 48,
    fontFamily: "Lato-Regular",
  },
  h4: {
    fontSize: 34,
    letterSpacing: 0.25,
    fontFamily: "Lato-Regular",
  },
  h5: {
    fontSize: 24,
    fontFamily: "Lato-Regular",
  },
  h6: {
    fontWeight: "500",
    fontSize: 20,
    letterSpacing: 0.15,
    fontFamily: "Lato-Regular",
  },
  subtitle1: {
    fontSize: 16,
    letterSpacing: 0.15,
    fontFamily: "Lato-Regular",
  },
  subtitle2: {
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 0.1,
    fontFamily: "Lato-Regular",
  },
  body1: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: "Lato-Regular",
  },
  body2: {
    fontSize: 14,
    letterSpacing: 0.25,
    fontFamily: "Lato-Regular",
  },
  button: {
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 1.25,
    textTransform: "uppercase",
    fontFamily: "Lato-Regular",
  },
  caption: {
    fontSize: 12,
    letterSpacing: 0.4,
    fontFamily: "Lato-Regular",
  },
  overline: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: "Lato-Regular",
  },
};

const appLightTheme = {
  ...defaultTheme,
  typography: typography,
};

const appDarkTheme = {
  ...darkTheme,
  typography: typography,
};

const AppTheme = ({ children, colorScheme }) => {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Provider theme={colorScheme === "dark" ? appDarkTheme : appLightTheme}>
        {children}
      </Provider>
    </NavigationContainer>
  );
};

export default AppTheme;
