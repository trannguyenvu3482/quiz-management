import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const UserTablePaginate = ({
  users,
  handleUpdateUser,
  handleViewUser,
  handleDeleteUser,
  fetchListUsersWithPaginate,
  maxPage,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (event) => {
    console.log(`User requested page number ${event.selected}`);
    fetchListUsersWithPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };
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
      <div className="user-pagination">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={maxPage}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default UserTablePaginate;
