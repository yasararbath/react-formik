import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
interface Props {
  children: ReactNode;
}
const Wrapper = (props: Props) => {
  return (
    <div
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin5"
      data-sidebartype="full"
      data-sidebar-position="absolute"
      data-header-position="absolute"
      data-boxed-layout="full"
    >
      <Navbar />
      <Sidebar />
      <div className="page-wrapper">
        <div className="page-body">{props.children}</div>
        <div className="page-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
