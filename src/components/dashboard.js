import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from "axios";
import { BASE_URL } from "../utils/Apiurl";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DonationDashboard = () => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topDonor, setTopDonor] = useState(null);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      console.log('Parsed User object:', parsedUser.token);
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${BASE_URL}campaigns/all`, {
          headers: { "Content-Type": "application/json" },
        });
        const campaigns = response.data.data;
        setDonations(campaigns);

        // Calculate total donations and top donor
        let total = 0;
        const donorTotals = {};

        campaigns.forEach((campaign) => {
          campaign.donors.forEach((donor) => {
            total += donor.amount;

            if (donorTotals[donor.user]) {
              donorTotals[donor.user] += donor.amount;
            } else {
              donorTotals[donor.user] = donor.amount;
            }
          });
        });

        // Set total donations state
        setTotalDonations(total);

        // Determine top donor
        let topDonorUser = null;
        let topDonationAmount = 0;

        for (const [user, amount] of Object.entries(donorTotals)) {
          if (amount > topDonationAmount) {
            topDonationAmount = amount;
            topDonorUser = user;
          }
        }

        setTopDonor({ user: topDonorUser, amount: topDonationAmount });
      } catch (err) {
        console.error("Error fetching campaigns:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Donation Stats Data (Bar Chart)
  const donationStatsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Donations ($)",
        data: [12000, 19000, 15000, 17000, 22000, 24000, 20000, 25000, 23000, 26000, 28000, 30000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Donations",
      },
    },
  };

  // Donation Category Data (Doughnut Chart)
  const donationCategoryData = {
    labels: ['Education', 'Health', 'Environment', 'Poverty Relief', 'Disaster Response'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Donation Categories",
      },
    },
  };

  return (
    <Container fluid>
      <Row>
        <Col md={10} className="p-4">
          {/* Summary Section */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="text-center">
                <Card.Body>
                  <h5>Total Donations Received</h5>
                  <h2>${totalDonations.toLocaleString()}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="text-center">
                <Card.Body>
                  <h5>Top Donor</h5>
                  {topDonor ? (
                    <p><strong>User:</strong> {topDonor.user} <br /><strong>Amount:</strong> ${topDonor.amount.toLocaleString()}</p>
                  ) : (
                    <p>No donations found</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Donation Stats Section */}
          <Row className="mb-4">
            <Col md={8}>
              <Card>
                <Card.Body>
                  <Bar data={donationStatsData} options={barChartOptions} />
                </Card.Body>
              </Card>
            </Col>

            {/* Donation Categories Section */}
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Doughnut data={donationCategoryData} options={doughnutChartOptions} />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Donations Section */}
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Body>
                  <h5>Recent Donations</h5>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Donation Goal</th>
                        <th>Donation Received</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.slice(-4).reverse().map((donation) => (
                        <tr key={donation._id}>
                          <td>{donation.author}</td>
                          <td>{donation.title || "N/A"}</td>
                          <td>${donation.donationGoal.toLocaleString()}</td>
                          <td>${donation.donationReceived.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DonationDashboard;
