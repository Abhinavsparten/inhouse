// TeamContent.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Dropdown, Form } from "react-bootstrap";
import TeamForm from "./TeamForm";
import { CiFilter } from "react-icons/ci";

export const TeamContent = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamToEdit, setTeamToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('name'); 
  const [filterText, setFilterText] = useState('Name'); 

  useEffect(() => {
   
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setTeams(storedTeams);
    
  }, []);

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  const openForm = (team) => {
    setTeamToEdit(team);
    setFormOpen(true);
  };

  const closeForm = () => {
    setTeamToEdit(null);
    setFormOpen(false);
  };

  const handleAddTeam = (newTeam, isEdit) => {
    if (isEdit) {
      const updatedTeams = teams.map((team) => (team.id === teamToEdit.id ? newTeam : team));
      setTeams(updatedTeams);
      setTeamToEdit(null);
      setFormOpen(false);
    } else {
      setTeams((prevTeams) => [...prevTeams, { ...newTeam, id: Date.now() }]);
    }
  };

  const handleDeleteTeam = (index) => {
    const updatedTeams = [...teams];
    updatedTeams.splice(index, 1);
    setTeams(updatedTeams);
  };

  const handleFilterSelect = (type, text) => {
    setFilterType(type);
    setFilterText(text);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-start">
          <h1 className="mb-4">Teams</h1>
        </Col>
        <Col className="text-end">
          <Button variant="dark" onClick={() => openForm(null)} style={{ fontSize: "17px", width: "150px"}}>
            Add Team
          </Button>
        </Col>
      </Row>
      <Row className="mb-2 justify-content-start">
        <Col md="auto" className="text-start">
          <Dropdown>
            <Dropdown.Toggle
              style={{ fontSize: "15px", backgroundColor: "rgb(201, 192, 192)", color: "black" }}
              id="dropdown-basic"
            >
              <CiFilter /> {filterText}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterSelect('name', 'Name')}>Name</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('empCode', 'Emp code')}>Emp code</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('techStack', 'Tech stack')}>Tech stack</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('project', 'Project')}>Project</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('allocatedPercentage', 'Percentage')}>Percentage</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('priority', 'Priority')}>Priority</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md="auto" className="text-start ">
          <Form.Control
            type="text"
            placeholder="🔍Search..."
            style={{ width: "200px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <div className="table-container">
        <div className="table-heading">
          <div className="table-cell">Name</div>
          <div className="table-cell">Emp code</div>
          <div className="table-cell">Tech stack</div>
          <div className="table-cell">Project</div>
          <div className="table-cell">Percentage</div>
          <div className="table-cell">Priority</div>
          <div className="table-cell">Action</div>
        </div>
        <div className="table-body">
          {teams
            .filter((team) => {
              const searchTerm = search.toLowerCase();
              const teamValue = team[filterType].toLowerCase();
              return teamValue.includes(searchTerm);
            })
            .map((team, index) => (
              <div key={index} className="table-row">
                <div className="table-cell">{team.name}</div>
                <div className="table-cell">{team.empCode}</div>
                <div className="table-cell">{team.techStack}</div>
                <div className="table-cell">{team.project}</div>
                <div className="table-cell">{team.allocatedPercentage}</div>
                <div className="table-cell">{team.priority}</div>
                <div className="table-cell">
                  <Button variant="success" style={{ fontSize: "12px" }} onClick={() => openForm(team)}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" style={{ fontSize: "12px" }} onClick={() => handleDeleteTeam(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <TeamForm show={isFormOpen} handleClose={closeForm} handleAddTeam={handleAddTeam} teamToEdit={teamToEdit} />
    </Container>
  );
};

export default TeamContent