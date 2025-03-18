import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppCard from './AppCard';
import ReactDOMServer from "react-dom/server";
import { sendCustomEmail } from '../Emails/email';
import FranchiseEmailBody from '../Emails/FranchiseEmail';
import '../index.css';
import { BrowserRouter as Router, Routes, Route,useNavigate, Link,useLocation } from 'react-router-dom';


const Applicantdashh = () => {
  const [applicants, setApplicants] = useState([]);
  const [allApplicants, setAllApplicants] = useState([]);
  const [activeTab, setActiveTab] = useState("");


  var redirecter = useNavigate();
    function fnavigate(path)
    {
      redirecter(path);
    }


  async function FetchData() {
    try {
      let url = "https://franchisebackend-production.up.railway.app/admin/fetchdata";
      let resp = await axios.get(url);
      
      if (resp.data.status == true) {
        setApplicants(resp.data.appdata);
        setAllApplicants(resp.data.appdata);
      } else {
        alert(resp.data.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function Acceptapp(id) {
    try {
      let url = `https://franchisebackend-production.up.railway.app/admin/acceptapp`;
      let resp = await axios.post(url, {email: id}, {headers: {"Content-Type": "application/x-www-form-urlencoded"}});
      alert(resp.data.msg);
      FetchData();
    } catch (error) {
      console.error("Error updating status A:", error);
    }
  }
  
  async function rejectapp(id) {
    try {
      let url = `https://franchisebackend-production.up.railway.app/admin/rejectapp`;
      let resp = await axios.post(url, {email: id}, {headers: {"Content-Type": "application/x-www-form-urlencoded"}});
      alert(resp.data.msg);
      FetchData();
    } catch (error) {
      console.error("Error updating status R:", error);
    }
  }
  
  async function franchiseapp(id) {
    try {
      let url = `https://franchisebackend-production.up.railway.app/admin/grantapp`;
      let resp = await axios.post(url, {email: id}, {headers: {"Content-Type": "application/x-www-form-urlencoded"}});
      alert(resp.data.msg);
      FetchData();

      async function SaveFrCred(id) {
        let url = `https://franchisebackend-production.up.railway.app/admin/addfranchise`;
        let resp = await axios.post(url, {email: id}, {headers: {"Content-Type": "application/x-www-form-urlencoded"}});
        
        if(resp.data.status==true) {
          alert(resp.data.msg);
          sendCustomEmail({
            to_email: id,
            subject: "Franchise Application Accepted",
            message: ReactDOMServer.renderToStaticMarkup(
              <FranchiseEmailBody
                pwd={resp.data.pwd}
                email={id}
              />
            ),
          });
        }
      }
      
      SaveFrCred(id);
    } catch (error) {
      console.error("Error updating status F:", error);
    }
  }

  function dorendercard(object, index) {
    return <AppCard key={index} {...object}  onAccept={Acceptapp} onReject={rejectapp} onFranchise={franchiseapp} />;
  }

  useEffect(() => {
    FetchData();
  }, []);
  
  useEffect(() => {
    let filteredApplicants = [];
    
    if (activeTab === "") {
      filteredApplicants = allApplicants;
    } else if (activeTab === "FRANCHISE") {
      filteredApplicants = allApplicants.filter(obj => obj.status == 2);
    } else if (activeTab === "ACCEPTED") {
      filteredApplicants = allApplicants.filter(obj => obj.status == 1);
    } else if (activeTab === "REJECTED") {
      filteredApplicants = allApplicants.filter(obj => obj.status == -1);
    } else if (activeTab === "APPLICATIONS") {
      filteredApplicants = allApplicants.filter(obj => obj.status == 0);
    }
    
    setApplicants(filteredApplicants);
  }, [activeTab, allApplicants]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* New Topbar */}
      <div className="bg-white shadow-md rounded-lg mb-6">
        <div className="flex overflow-x-auto border-b">
          <div 
            onClick={() => setActiveTab("")}
            className={`px-6 py-4 cursor-pointer text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            All Applicants
          </div>
          
          <div 
            onClick={() => setActiveTab("APPLICATIONS")}
            className={`px-6 py-4 cursor-pointer text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "APPLICATIONS" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Applications
          </div>
          
          <div 
            onClick={() => setActiveTab("ACCEPTED")}
            className={`px-6 py-4 cursor-pointer text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "ACCEPTED" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Accepted
          </div>
          
          <div 
            onClick={() => setActiveTab("REJECTED")}
            className={`px-6 py-4 cursor-pointer text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "REJECTED" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Rejected
          </div>

          <div 
            onClick={() => setActiveTab("FRANCHISE")}
            className={`px-6 py-4 cursor-pointer text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "FRANCHISE" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Franchises
          </div>
          <div 
            onClick={() => fnavigate("/")}
            className={`px-6 py-4 cursor-pointer text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "FRANCHISE" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            LOGOUT
          </div>
        </div>
      </div>

      {/* Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applicants.map((obj, index) => dorendercard(obj, index))}
      </div>
      
      {/* Empty State */}
      {applicants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No applicants found in this category</p>
        </div>
      )}
    </div>
  );
};

export default Applicantdashh;