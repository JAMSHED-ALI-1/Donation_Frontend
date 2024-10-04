import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <>
      {/* Optional Header - Uncomment if needed */}
      <Header />

      <Container fluid className="px-0">
        <Row className="min-vh-100 m-0">
          {/* Sidebar */}
          <Col xl={2} sm={3} className="sidenav">
            <SideBar />
          </Col>

          {/* Main Content Area */}
          <Col xl={10} sm={9} className="main">
            <Outlet />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout;
