// import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import LogoWhite  from "../assets/images/logos/Black Navbar Logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      {/* <LogoDark /> */}
      <img style={{
        width: "200px",
        objectFit: "contain",
      }} src={LogoWhite} alt="logo" className="logo" />
    </Link>
  );
};

export default Logo;
