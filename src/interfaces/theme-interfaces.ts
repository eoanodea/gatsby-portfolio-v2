import { IColorProps } from '../../colors';

export interface IThemeProps {
  theme: {
    colors: IColorProps;
  };
  fonts?: {
    body: string;
    heading: string;
    monospace: string;
  };
}
