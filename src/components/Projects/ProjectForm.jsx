import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './project.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProject } from "../../service/allapi";

const ProjectForm = ({ show, handleClose, handleAddProject, projectToEdit }) => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    clientName: "",
    startDate: null,
    endDate: null,
    projectType: "",
    resources: "",
  });

  const [errors, setErrors] = useState({});
     //object for useNavigate
     const navigate = useNavigate()

  useEffect(() => {
    if (projectToEdit) {
      // If projectToEdit is provided, populate the form with its data
      setProjectData(projectToEdit);
    }
  }, [projectToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
      
    }));
  };
  console.log(projectData);

  const handleDateChange = (date, field) => {
    setProjectData((prevData) => ({ ...prevData, [field]: date }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Project Name
    if (!projectData.projectName.trim()) {
      newErrors.projectName = "Project Name is required";
    }

    // Validate Client Name
    if (!projectData.clientName.trim()) {
      newErrors.clientName = "Client Name is required";
    }

    // Validate Start Date
    if (!projectData.startDate) {
      newErrors.startDate = "Start Date is required";
    }

    // Validate End Date
    if (!projectData.endDate) {
      newErrors.endDate = "End Date is required";
    }

    // Validate Project Type
    if (!projectData.projectType.trim()) {
      newErrors.projectType = "Project Type is required";
    }

    // Validate Resources
    if (!projectData.resources.trim()) {
      newErrors.resources = "Resources are required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleSave = async() => {
    console.log(projectData);

    //api call
    const response = await addProject(projectData)
    if (response.status == 200) {
      toast.success(response.data.message);
      setTimeout(()=> {
        navigate('/profile')
      }, 1500);
    }else{
     
      toast.error(response.data.message);
    }
    if (validateForm()) {
      if (projectToEdit) {
        // If editing, update the project in the parent component
        handleAddProject(projectData, true);
      } else {
        // If adding new, add the project to the parent component
        handleAddProject(projectData, false);
      }

      // Close the form modal
      handleClose();
    }
  };

  return (
    <Modal size="lg"  show={show} onHide={handleClose} >
      <Modal.Header closeButton >
        <Modal.Title >
          {projectToEdit ? "Edit Project" : "Add Project"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Form >
          <Row >
            {/* First Column */}
            <Col >
              <Form.Group controlId="formProjectName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter project name"
                  name="projectName"
                  value={projectData.projectName}
                  onChange={handleChange}
                  isInvalid={!!errors.projectName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.projectName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter start date"
                  name="startDate"
                  value={projectData.startDate}
                  onChange={handleChange}
                  isInvalid={!!errors.startDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.startDate}
                </Form.Control.Feedback>

                <Form.Group controlId="formProjectType">
                  <Form.Label>Project Type</Form.Label>
                  <Form.Select
                    name="projectType"
                    value={projectData.projectType}
                    onChange={handleChange}
                    isInvalid={!!errors.projectType}
                  >
                    <option value="">Select Project Type</option>
                    <option value="Type1">Type 1</option>
                    <option value="Type2">Type 2</option>
                    {/* Add more options as needed */}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.projectType}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
            </Col>

            {/* Second Column */}
            <Col>
              <Form.Group controlId="formClientName">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter client name"
                  name="clientName"
                  value={projectData.clientName}
                  onChange={handleChange}
                  isInvalid={!!errors.clientName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.clientName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter end date"
                  name="endDate"
                  value={projectData.endDate}
                  onChange={handleChange}
                  isInvalid={!!errors.endDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.endDate}
                </Form.Control.Feedback>

                <Form.Group controlId="formResources">
                  <Form.Label>Resources</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter resources"
                    name="resources"
                    value={projectData.resources}
                    onChange={handleChange}
                    isInvalid={!!errors.resources}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.resources}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleSave}>
        Add
        </Button>
      </Modal.Footer>
      <ToastContainer position="top-center" />
    </Modal>
  );
};

export default ProjectForm;
