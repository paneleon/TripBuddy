import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const Manage = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/manage', {
              headers: { 'Authorization': `Bearer ${token}` },
            });
            setUsers(response.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
      
        fetchUsers();
      }, []);
    
    return (
        <div>
          <h1>User Management</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    };
    
    export default Manage;
      