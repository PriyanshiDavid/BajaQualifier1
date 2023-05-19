
// Function to create a table row with employee data
function createTableRow(employee) {
    const tableRow = document.createElement('tr');
  
    // Employee details
    const employeeNameCell = document.createElement('td');
    employeeNameCell.textContent = employee.name || 'Null';
    tableRow.appendChild(employeeNameCell);
  
    const employeeIdCell = document.createElement('td');
    employeeIdCell.textContent = employee.id || 'Null';
    tableRow.appendChild(employeeIdCell);
  
    const designationCell = document.createElement('td');
    designationCell.textContent = employee.designation || 'Null';
    tableRow.appendChild(designationCell);
  
    const skillsCell = document.createElement('td');
    skillsCell.textContent = employee.skills ? employee.skills.join(', ') : 'Null';
    tableRow.appendChild(skillsCell);
  
    const projectCountCell = document.createElement('td');
    projectCountCell.textContent = employee.projects ? employee.projects.length : 0;
    tableRow.appendChild(projectCountCell);
  
    return tableRow;
  }
  
  // Function to filter employees based on search query, designation, and skills
  function filterEmployees() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const designationFilter = document.getElementById('designationFilter').value;
    const skillsFilter = document.getElementById('skillsFilter').value;
  
    const employeeRows = document.querySelectorAll('#employeeTable tbody tr');
  
    employeeRows.forEach(row => {
      const name = row.cells[0].textContent.toLowerCase();
      const designation = row.cells[2].textContent;
      const skills = row.cells[3].textContent.toLowerCase();
  
      row.style.display = 'table-row';
  
      if (
        name.indexOf(searchInput) === -1 ||
        (designationFilter && designation !== designationFilter) ||
        (skillsFilter && skills.indexOf(skillsFilter.toLowerCase()) === -1)
      ) {
        row.style.display = 'none';
      }
    });
  }
  
  // Function to handle the search button click event
  function handleSearchButtonClick() {
    filterEmployees();
  }
  
  // Add event listener to the search button
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', handleSearchButtonClick);
  
  // Fetch data and populate the table
  const employeeTable = document.getElementById('employeeTable');
  
  fetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
    .then(response => response.json())
    .then(data => {
      const employeeData = data.employees;
  
      employeeData.forEach(employee => {
        const tableRow = createTableRow(employee);
        employeeTable.querySelector('tbody').appendChild(tableRow);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
