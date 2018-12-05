import React from "react";
import lsLogo1 from "../icons/Logo_ls_1.png";
import lsLogo2 from "../icons/Logo_ls_2.png";

const Footer = () => (
  <footer>
    <p style={{ fontSize: "small" }}>
      Made by{" "}
      <a
        style={{ position: "relative" }}
        target="_blank"
        rel="noopener noreferrer"
        href="https://ls-portfolio.surge.sh"
      >
        <img className="styled-logo-1" alt="ls" src={lsLogo1} />
        <img className="styled-logo-2" alt="ls" src={lsLogo2} />
      </a>
    </p>
  </footer>
);

export default Footer;
