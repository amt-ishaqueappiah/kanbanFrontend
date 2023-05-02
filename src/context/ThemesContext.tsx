import React, {
  Dispatch,
  SetStateAction,
  
} from "react";
import { Theme, ThemeType } from "../models/Theme.model";
import { THEMES } from "./Theme.config";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

interface ThemeContextProps {
  themeType: ThemeType;
  theme: Theme;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: "light",
  theme: THEMES["light"],
} as ThemeContextProps);

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = React.useState<ThemeType>("light");

  return (
    <ThemeContext.Provider
      value={{
        themeType: theme,
        theme: THEMES[theme],
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);

