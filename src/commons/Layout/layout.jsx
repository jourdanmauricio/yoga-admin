import React from "react";

const Layout = (props) => {
  return (
    <div className="layout">
      <nav>nav</nav>
      <main>{props.children}</main>
      <footer>FOOTER</footer>
    </div>
  );
};

export default Layout;
