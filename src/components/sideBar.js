import React from "react";
import { Link } from "react-router-dom";
import { Accordion, Nav, Navbar, Col, Row, Button } from "react-bootstrap";

const SideBar = () => {
  return (
    <Navbar className="fixed-left">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="d-flex flex-column justify-content-center align-content-center w-100 p-2">
        <Row>
          <Col>
          <img 
                 src="/Donation.png" 
              alt="Donation" 
              style={{ width: '200px', height: '150px', objectFit: 'cover',  }} // Set your desired dimensions
            />
            <Link to="/dashboard">
              <Button variant="primary" className="w-100 mb-4 mt-4 btn-sm">
                Dashboard
              </Button>
            </Link>
            <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Campaigns</Accordion.Header>
                <Accordion.Body>
                  <Link to="/CampaignCard" className="text-decoration-none text-dark d-block mb-2">
                    Compain Overview
                  </Link>
                  <Link to="/NewStudent" className="text-decoration-none text-dark d-block">
                   New Post Campaign
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Donations</Accordion.Header>
                <Accordion.Body>
                  <Link to="/DonarCard" className="text-decoration-none text-dark d-block mb-2">
                    Donation Overview
                  </Link>
                  <Link  to="/NewDonor" className="text-decoration-none text-dark d-block">
                    New Donation
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Donors</Accordion.Header>
                <Accordion.Body>
                  <Link to="/Donor" className="text-decoration-none text-dark d-block mb-2">
                    Donor Overview
                  </Link>
                  {/* <Link to="/donors/new" className="text-decoration-none text-dark d-block">
                    New Donor
                  </Link> */}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Reports</Accordion.Header>
                <Accordion.Body>
                  {/* <Link to="/reports/financial" className="text-decoration-none text-dark d-block mb-2">
                    Financial Reports
                  </Link> */}
                  <Link to="/PledgeCard" className="text-decoration-none text-dark d-block">
                    Donor Reports
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Settings</Accordion.Header>
                <Accordion.Body>
                <Link to="/Account" className="text-decoration-none text-dark d-block mb-2">
                    Account Settings
                  </Link>
                  <Link to="/Newscard" className="text-decoration-none text-dark d-block">
                    Preferences
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Nav>
    </Navbar>
  );
};

export default SideBar;
