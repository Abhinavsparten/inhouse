import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Profile.css";
import { AiFillDashboard } from "react-icons/ai";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { SiPivotaltracker } from "react-icons/si";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { DashboardContent } from "../Dashboard/DashboardContent";
import { ProjectsContent } from "../Projects/ProjectsContent";
import { EmployeesContent } from "../Employees/EmployeesContent";
import { TeamContent } from "../Team/TeamContent";


const Profile = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isHovered, setIsHovered] = useState(null);


  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    // Clear the email from local storage
    localStorage.removeItem('email');
   
      navigate('/')
  };



  const getButtonClassName = (section) => {
    return `nav-link text-white ${
      activeSection === section ? "active" : ""
    }`;
  };

  

  return (
    <Container fluid className="profile-container">
      <Row className="h-100">
        {/* Sidebar */}
        <Col md={3} className="bg text-white p-4 h-100">
          <ul className="nav nav-pills flex-column">
            <li
              className={`nav-item mb-2 d-flex align-items-center ${getButtonClassName(
                "dashboard"
              )}`}
            >
              <button
                className={getButtonClassName("dashboard")}
                onClick={() => handleSectionChange("dashboard")}
                
              >
                <AiFillDashboard
                  className="me-2"
                
                />{" "}
                Dashboard
              </button>
            </li>
            <li
              className={`nav-item mb-2 d-flex align-items-center ${getButtonClassName(
                "projects"
              )}`}
            >
              <button
                className={getButtonClassName("projects")}
                onClick={() => handleSectionChange("projects")}
              
              >
                <AiOutlineFundProjectionScreen
                  className="me-2"
  
                />{" "}
                Projects
              </button>
            </li>
            <li
              className={`nav-item mb-2 d-flex align-items-center ${getButtonClassName(
                "employees"
              )}`}
            >
              <button
                className={getButtonClassName("employees")}
                onClick={() => handleSectionChange("employees")}
              
              >
                <IoMdPersonAdd
                  className="me-2"
           
                />{" "}
               Team Members
              </button>
            </li>
            <li
              className={`nav-item mb-2 d-flex align-items-center ${getButtonClassName(
                "team"
              )}`}
            >
              <button
                className={getButtonClassName("team")}
                onClick={() => handleSectionChange("team")}
            
              >
                <SiPivotaltracker 
                  className="me-2"
             
                />{" "}
                Tracker
              </button>
            </li>

            <li
              className={`nav-item mb-2 d-flex align-items-center ${getButtonClassName(
                "logout"
              )}`}
            >
              <button
                className={getButtonClassName("logout")}
                onClick={handleLogout}
            
              >
                <IoIosLogOut 
                  className="me-2"
             
                />{" "}
                Logout
              </button>
            </li>
            
          </ul>

        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4 bg-light h-100">
          {activeSection === "dashboard" && <DashboardContent />}
          {activeSection === "projects" && <ProjectsContent />}
          {activeSection === "employees" && <EmployeesContent />}
          {activeSection === "team" && <TeamContent />}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;