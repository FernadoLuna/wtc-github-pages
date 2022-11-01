import React from "react";
import Logo from "../Logo.png";
export default function Header() {
  return (
    <div className="col-10 offset-2 header_img">
      <div className="logotipo">
        <a>
          <img src={Logo} className="logotipo_img pt-3 pl-3" />
        </a>
      </div>
    </div>
  );
}
