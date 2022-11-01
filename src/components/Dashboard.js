import React from "react";
import Aside from "./Aside";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

export default function Dashboard(props) {
  const { logout } = props;
  return (
    <div className="container-fluid">
      <div className="row">
        <Header />
        <Aside logout={logout} />
        <Content />
      </div>
    </div>
  );
}
