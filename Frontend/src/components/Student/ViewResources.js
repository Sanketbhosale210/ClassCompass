import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const departmentId = user?.department?.id;
      
      if (!departmentId) {
        setError('Department ID is not found in local storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/resources/byDepartment/${departmentId}`);
        setResources(response.data);
      } catch (err) {
        setError('Failed to fetch resources.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleDownload = (resourceId, resourceName, resourceType) => {
    window.open(`${BASE_URL}/api/resources/download/${resourceId}`, '_blank');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Resources</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>File</th> {/* File column for download */}
          </tr>
        </thead>
        <tbody>
          {resources.length > 0 ? (
            resources.map((resource) => (
              <tr key={resource.id}>
                <td>{resource.name}</td>
                <td>{resource.subjectName || 'Unknown'}</td>
                <td>
                  <button
                    onClick={() => handleDownload(resource.id, resource.name, resource.type)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No resources available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResources;
