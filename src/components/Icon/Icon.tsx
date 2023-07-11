import { Icons } from "../../enums/icons.enum";
import AngleDown from "./svgs/AngleDown.svg";
import AngleUp from "./svgs/AngleUp.svg";

type PrivateProps = {
  className?: string;
  style?: React.CSSProperties;
  icon: Icons;
};
function Icon({ icon, className = "", style = {} }: PrivateProps) {
  switch (icon) {
    case Icons.AngleDown:
      return <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 4.21875 10.78125 L 2.78125 12.21875 L 15.28125 24.71875 L 16 25.40625 L 16.71875 24.71875 L 29.21875 12.21875 L 27.78125 10.78125 L 16 22.5625 Z"/></svg>;
      case Icons.AngleUp:
      return <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 16 6.59375 L 15.28125 7.28125 L 2.78125 19.78125 L 4.21875 21.21875 L 16 9.4375 L 27.78125 21.21875 L 29.21875 19.78125 L 16.71875 7.28125 Z"/></svg>;
    default:
      return null;
  }
}
export default Icon;
