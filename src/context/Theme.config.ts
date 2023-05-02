import { Color } from "../models/color.model";
import { ThemeType, Theme } from "../models/Theme.model";


export const THEMES: Record<ThemeType, Theme> = {
  light: {
    "--primary": Color.WHITE,
    "--secondary": Color.WHITE,
    "--background": Color.LIGHT_GREY,
    "--white": Color.VERY_DARK_GRAY,
    "--buttons": Color.LIGHT_GREY,
    "--modalBorder": Color.MEDIUM_GREY,
  },
  dark: {
    "--primary": Color.VERY_DARK_GRAY,
    "--secondary": Color.DARK_GRAY,
    "--background": Color.VERY_DARK_GRAY,
    "--white": Color.WHITE,
    "--buttons": Color.WHITE,
    "--modalBorder": Color.MEDIUM_GREY,
  },
};

