import React, { useState } from 'react';

const Forms = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    // Add other user properties as needed
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedUsers = [...users];
    updatedUsers[index] = {
      ...updatedUsers[index],
      [name]: value,
    };
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({
      name: '',
      email: '',
      // Reset other user properties as needed
    });
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  return (
    <>
      <div>
        <h2>Forms - Add Multiple Users</h2>

        <form>
          {users.map((user, index) => (
            <div key={index}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={user.name || ''}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </label>

              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={user.email || ''}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </label>

              {/* Add other input fields for additional user properties as needed */}

              <button type="button" onClick={() => handleRemoveUser(index)}>
                Remove User
              </button>
            </div>
          ))}

          <button type="button" onClick={handleAddUser}>
            Add User
          </button>
        </form>

        <div>
          <h3>Users:</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.name} - {user.email}
                {/* Display other user properties as needed */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Forms;
