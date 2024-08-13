// import React, { useState, useEffect } from 'react';
// import { getAllAssignments, getAllSubjects } from '../../services/assignmnetApi';

// const ViewAssignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [filterSubject, setFilterSubject] = useState('');
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     fetchAssignments();
//     fetchSubjects();
//   }, []);

//   const fetchAssignments = async () => {
//     try {
//       const response = await getAllAssignments();
//       setAssignments(response.data || []);
//     } catch (error) {
//       console.error('Failed to fetch assignments:', error);
//       setAssignments([]);
//     }
//   };

//   const fetchSubjects = async () => {
//     try {
//       const response = await getAllSubjects();
//       setSubjects(response.data || []);
//     } catch (error) {
//       console.error('Failed to fetch subjects:', error);
//       setSubjects([]);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setFilterSubject(e.target.value);
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   return (
//     <div>
//       <h3>View Assignments</h3>
      
//       <div>
//         <label>Filter by Subject:</label>
//         <select value={filterSubject} onChange={handleFilterChange}>
//           <option value="">All Subjects</option>
//           {subjects.map(subject => (
//             <option key={subject.id} value={subject.id}>{subject.name}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <input
//           type="text"
//           placeholder="Search by assignment name"
//           value={search}
//           onChange={handleSearchChange}
//         />
//       </div>

//       <div>
//         <h3>Existing Assignments</h3>
//         <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
//           <thead>
//             <tr>
//               <th style={{ border: '1px solid black', padding: '8px' }}>Assignment Name</th>
//               <th style={{ border: '1px solid black', padding: '8px' }}>Subject</th>
//               <th style={{ border: '1px solid black', padding: '8px' }}>Deadline</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assignments.length > 0 ? (
//               assignments.filter(assignment => 
//                 (filterSubject === '' || (assignment.subject && assignment.subject.id === filterSubject)) &&
//                 (assignment.name.toLowerCase().includes(search.toLowerCase()))
//               ).map(assignment => (
//                 <tr key={assignment.id}>
//                   <td style={{ border: '1px solid black', padding: '8px' }}>{assignment.name}</td>
//                   <td style={{ border: '1px solid black', padding: '8px' }}>{assignment.subject ? assignment.subject.name : 'No Subject'}</td>
//                   <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(assignment.deadline).toLocaleDateString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" style={{ textAlign: 'center', padding: '8px' }}>No assignments available.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewAssignments;
import React, { useState, useEffect } from 'react';
import { getAssignmentsByDepartment, getAllSubjects } from '../../services/assignmnetApi';

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filterSubject, setFilterSubject] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAssignments();
    fetchSubjects();
  }, []);

  const fetchAssignments = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
       
    const departmentId = user.department.id;
    try {
      const response = await getAssignmentsByDepartment(departmentId); // Fetch assignments based on department ID
      setAssignments(response.data || []);
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
      setAssignments([]);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await getAllSubjects();
      setSubjects(response.data || []);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      setSubjects([]);
    }
  };

  const handleFilterChange = (e) => {
    setFilterSubject(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h3>View Assignments</h3>
      
      <div>
        <label>Filter by Subject:</label>
        <select value={filterSubject} onChange={handleFilterChange}>
          <option value="">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by assignment name"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <h3>Existing Assignments</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Assignment Name</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Subject</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.filter(assignment => 
                (filterSubject === '' || (assignment.subject && assignment.subject.id === filterSubject)) &&
                (assignment.name.toLowerCase().includes(search.toLowerCase()))
              ).map(assignment => (
                <tr key={assignment.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{assignment.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{assignment.subject ? assignment.subject.name : 'No Subject'}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(assignment.deadline).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '8px' }}>No assignments available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAssignments;
