/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Dashboard from "./components/dashboard";
import StudentTabs from "./components/studentTabs";
import DonorsCard from "./components/cards/donorsCard";
import AccountForm from "./components/forms/accountForm";
import DonorForm from "./components/forms/donorForm";
import SignIn from "./views/signIn";
import SignUp from "./views/signUp";
import CreateStudentForm from "./components/forms/CompainNewsApply";
import Layout from "./views/layout";
import DonationForm from "./components/forms/donationForm";
import SingleDonor from "./components/cards/singleDonor";
import SingleStudent from "./components/cards/singleStudent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Newscard from "./components/Newscard";
import PledgeCard from "./components/cards/PledgeCard"
import DonarCard from "./components/cards/DonarCard";
import CampaignCard from "./components/cards/CampaignCard";




function App() {
  return (
    <>
      {/* <Header />
      <SignIn /> */}
      <Router>
        <Routes >
          {/* Root */}
          <Route path="/" element={<SignIn />} />
          {/* Landing Page / Login  */}
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route element={<Layout />}>
            {/* Main Dashboard */}
             <Route path="Dashboard" element={<Dashboard />} />
            {/* Students View  Links */}
            <Route path="Student" element={<StudentTabs />} />
            <Route path="NewStudent" element={<CreateStudentForm/>} />
            <Route path="Account" element={<AccountForm />} /> 
            <Route path="Newscard" element={<Newscard/>} />
            <Route path="studentinfo/:studentId" element={<SingleStudent/>}/>
            <Route path="PledgeCard" element={<PledgeCard/>}/>
            <Route path="DonarCard" element={<DonarCard/>}/>
            <Route path="CampaignCard" element={<CampaignCard/>}/>
            {/* Donor View Links */}
            <Route path="Donor" element={<DonorsCard />} />
            <Route path="NewDonor" element={<DonorForm />} />
            <Route path="newdonation/:donorId" element={ <DonationForm/>}/>
            <Route path="donorinfo/:donorId" element={ <SingleDonor/>}/>
          
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
