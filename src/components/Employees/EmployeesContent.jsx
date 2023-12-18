// EmployeeContent.js

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Table, Dropdown } from "react-bootstrap";
import { CiFilter } from "react-icons/ci";
import EmployeeForm from "./EmpolyeeForm";

export const EmployeesContent = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('name'); // Default filter type
  const [filterText, setFilterText] = useState('Filter');

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  useEffect(() => {
   console.log(employees);
  }, [employees]);

  const openForm = (employee) => {
    setEmployeeToEdit(employee);
    setFormOpen(true);
  };

  const closeForm = () => {
    setEmployeeToEdit(null);
    setFormOpen(false);
  };

  const handleAddEmployee = (newEmployee, isEdit) => {
    if (isEdit) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === employeeToEdit.id ? newEmployee : employee
      );
      setEmployees(updatedEmployees);
    } else {
      setEmployees((prevEmployees) => [
        ...prevEmployees,
        { ...newEmployee, id: Date.now() },
      ]);
    }
  };

  const handleDeleteEmployee = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleFilterSelect = (type, text) => {
    setFilterType(type);
    setFilterText(text);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-start">
          <h1 className="mb-4">Employees</h1>
        </Col>
        <Col className="text-end">
          <Button variant="dark" onClick={() => openForm(null)} style={{ fontSize: "17px", width: "150px" }}>
            Add Employee
          </Button>
        </Col>
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
                <Dropdown.Item onClick={() => handleFilterSelect('role', 'Role')}>Role</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterSelect('employeeCode', 'Employee Code')}>Employee Code</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterSelect('slack', 'Email')}>Email</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md="auto" className="text-start ">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              value={search} 
              type="text"
              placeholder="🔍Search..."
              style={{ width: "200px" }}
            />
          </Col>
        </Row>
      </Row>
      <div className="table-container">
        <div className="table-heading">
          <div className="table-cell">Name</div>
          <div className="table-cell">Role</div>
          <div className="table-cell">Emp code</div>
          <div className="table-cell">Email</div>
          <div className="table-cell">Action</div>
        </div>
        <div className="table-body">
          {employees.filter((item) => {
            const searchTerm = search.toLowerCase();
            const employeeValue = item[filterType].toLowerCase();
            return employeeValue.includes(searchTerm);
          }).map((employee, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">{employee.name}</div>
              <div className="table-cell">{employee.role}</div>
              <div className="table-cell">{employee.employeeCode}</div>
              <div className="table-cell">{employee.slack}</div>
              <div className="table-cell">
                <Button variant="success" style={{ fontSize: "12px" }} onClick={() => openForm(employee)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" style={{ fontSize: "12px" }} onClick={() => handleDeleteEmployee(index)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EmployeeForm show={isFormOpen} handleClose={closeForm} handleAddEmployee={handleAddEmployee} employeeToEdit={employeeToEdit} />
    </Container>
  );
};