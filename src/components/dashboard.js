import React, { useState ,useEffect} from "react";
import { Container, Row, Col, Card, Table, ListGroup } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import SideBar from "./sideBar";
import axios from "axios";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DonationDashboard = () => {

  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const GetDonationData = async () => {
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjVhYmRmNDkyZTQzZDZjODIzZjYxNiIsImlhdCI6MTcyNzc3NzIxMywiZXhwIjoxNzMwMzY5MjEzfQ.QprtUltZKq1-RyCFHPYoq6uKeFW-BewjA-w9_InhH70' // Update with your actual token
    try {
      const res = await axios.get('http://localhost:5000/api/donations/', {
        headers: {
          'Authorization': `Bearer ${token}`, // Authorization token
          'Content-Type': 'application/json',
        }
      });
    //  console.log(res?.data)
      setDonors(res?.data); // Expecting an array of donors
    } catch (err) {
      console.error(err);
      setError('Failed to fetch donor data');
    }
  };
useEffect(()=>{
  GetDonationData()
},[])





useEffect(() => {
  const fetchDonations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/campaigns/'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }
      const data = await response.json();
      console.log(data)
      // Extract all donors from the response data
      const allDonors = data.flatMap(item => item.donors);

      // Sort donors by donatedAt date (most recent first)
      const recentDonors = allDonors.sort((a, b) => new Date(b.donatedAt) - new Date(a.donatedAt));
console.log(recentDonors)
      // Limit to the top 4 most recent donations
      setDonations(recentDonors.slice(0, 4));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchDonations();
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

  // Options for the bar chart
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

  // Options for the doughnut chart
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

  // Recent donations data
  const recentDonations = [
    {
      id: 1,
      donor: "John Doe",
      amount: "$500",
      cause: "Education Fund",
      date: "2024-03-15",
    },
    {
      id: 2,
      donor: "Jane Smith",
      amount: "$1,000",
      cause: "Health Initiative",
      date: "2024-03-14",
    },
    {
      id: 3,
      donor: "Alex Johnson",
      amount: "$750",
      cause: "Environmental Protection",
      date: "2024-03-13",
    },
  ];

  // Top donors data
  // const topDonors = [
  //   {
  //     name: "Emily Brown",
  //     totalDonation: "$10,000",
  //     lastDonation: "2024-03-10",
  //   },
  //   {
  //     name: "Michael Wilson",
  //     totalDonation: "$8,500",
  //     lastDonation: "2024-03-05",
  //   },
  // ];
  const topDonors = donors
  .map(donation => ({
    ...donation,
    totalAmount: donation.donation.reduce((sum, d) => sum + Number(d.amount), 0) // Ensure the amount is a number
  }))
  .sort((a, b) => b.totalAmount - a.totalAmount) // Sort by total amount in descending order
  .slice(0, 4); // Get top 4 donors

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        {/* <Col md={2} className="bg-light sidebar py-4">
          <SideBar />
        </Col> */}

        {/* Main Content */}
        <Col md={10} className="p-4">
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
                        <th>Donor</th>
                        <th>Amount</th>
                        <th>City</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donors.slice(-4).reverse().map((donation) => (
                        <tr key={donation._id}>
                          <td>{donation.firstName}{donation.lastName}</td>
                          {/* <td>{donation.amount}</td> */}
                         {donation.donation.map((donation)=>(
                           <td key={donation._id}>{donation.amount}</td>
                         ))}
                          <td>{donation.city}</td>
                          <td>{donation.updatedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Top Donors Section */}
      
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Body>
                  <h5>Top Donners</h5>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Donor</th>
                        <th>Amount</th>
                        <th>City</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                    {topDonors.map((donor) => (
          <tr key={donor._id}>
            <td>{donor.firstName} {donor.lastName}</td>
            <td>{donor.totalAmount}</td>
            <td>{donor.city}</td>
            <td>{donor.updatedAt}</td>
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