// TeamForm.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const initialTeamState = {
  name: "",
  empCode: "",
  techStack: "",
  project: "",
  allocatedPercentage: "",
  priority: "",
};

const TeamForm = ({ show, handleClose, handleAddTeam, teamToEdit }) => {
  const [teamData, setTeamData] = useState(initialTeamState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (teamToEdit) {
      setTeamData(teamToEdit);
    } else {
      setTeamData(initialTeamState);
    }
  }, [teamToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({ ...prevData, [name]: value }));
    console.log(value);
  };
 

  const validateForm = () => {
    const newErrors = {};

    // Validate your form fields here
    if (!teamData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!teamData.empCode.trim()) {
      newErrors.empCode = "Employee Code is required";
    }

    if (!teamData.techStack.trim()) {
      newErrors.techStack = "Tech Stack is required";
    }

    if (!teamData.project.trim()) {
      newErrors.project = "Project is required";
    }

    if (!teamData.allocatedPercentage.trim()) {
      newErrors.allocatedPercentage = "Allocated Percentage is required";
    } else if (
      isNaN(teamData.allocatedPercentage) ||
      +teamData.allocatedPercentage < 0 ||
      +teamData.allocatedPercentage > 100
    ) {
      newErrors.allocatedPercentage = "Please enter a valid percentage (0-100)";
    }

    if (!teamData.priority.trim()) {
      newErrors.priority = "Priority is required";
    } else if (isNaN(teamData.priority) || +teamData.priority < 1) {
      newErrors.priority = "Please enter a valid priority (greater than 0)";
    }

    setErrors(newErrors);

    // Return true if the form is valid, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddTeam(teamData, !!teamToEdit);
      handleClose();
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{teamToEdit ? "Edit Team" : "Add Team"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={teamData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="empCode">
                <Form.Label>Employee Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter employee code"
                  name="empCode"
                  value={teamData.empCode}
                  onChange={handleChange}
                  isInvalid={!!errors.empCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.empCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="techStack">
                <Form.Label>Tech Stack</Form.Label>
                <Form.Select
                  name="techStack"
                  value={teamData.techStack}
                  onChange={handleChange}
                  isInvalid={!!errors.techStack}
                >
                  <option value="">Select Tech Stack</option>
                  <option value="TechStack1">Tech Stack 1</option>
                  <option value="TechStack2">Tech Stack 2</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.techStack}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="project">
                <Form.Label>Project</Form.Label>
                <Form.Select
                  name="project"
                  value={teamData.project}
                  onChange={handleChange}
                  isInvalid={!!errors.project}
                >
                  <option value="">Select Project</option>
                  <option value="Project1">Project 1</option>
                  <option value="Project2">Project 2</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.project}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="allocatedPercentage">
                <Form.Label>Allocated Percentage</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter allocated percentage"
                  name="allocatedPercentage"
                  value={teamData.allocatedPercentage}
                  onChange={handleChange}
                  isInvalid={!!errors.allocatedPercentage}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.allocatedPercentage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  name="priority"
                  value={teamData.priority}
                  onChange={handleChange}
                  isInvalid={!!errors.priority}
                >
                  <option value="">Select Priority</option>
                  <option value="1">Senior</option>
                  <option value="2">Junior</option>
                  <option value="3">Intern</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.priority}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TeamForm;
