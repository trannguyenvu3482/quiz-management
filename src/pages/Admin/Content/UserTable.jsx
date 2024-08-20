const UserTable = ({
  users,
  handleUpdateUser,
  handleViewUser,
  handleDeleteUser,
}) => {
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, index) => {
              return (
                <tr key={`table-users-${index + 1}`}>
                  <th scope="row">{user.id}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleViewUser(user)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-warning mx-2"
                      onClick={() => handleUpdateUser(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
