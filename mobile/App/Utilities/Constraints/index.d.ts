declare class Color {
    toRGBA(opacity: number): string;
    toHex(): string;
}

interface IColors {
    black: Color;
    white: Color;
    primary: Color;
    secondary: Color;
    success: Color;
    danger: Color;
    warning: Color;
    info: Color;
    textLight: Color;
    textDark: Color;
    background: Color;
    secondaryBackground: Color;
}
export interface ITheme {
    /**
     *
     * @param theme Name of theme
     * @return {Object} The theme object
     */
    get?(theme: String): IColors;
}
export declare const Themes: ITheme;
