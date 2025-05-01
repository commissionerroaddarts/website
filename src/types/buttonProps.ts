export interface ButtonProps {
  onClickEvent?: () => void;
  icon?: React.ReactNode;
  text: string;
  applyMargin?: boolean;
  [key: string]: any; // Allow any other props to be passed
}
