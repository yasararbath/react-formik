import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import useUser from "../../Api/useUser";
import { UserData } from "../../services/baseData";

const Users = () => {
  const { users, fetchAllUsers, deleteUser } = useUser();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      await fetchAllUsers();
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userData: UserData) => {
    try {
      await deleteUser(userData);
      // Refetch users after successful deletion
      fetchData();
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper>
      <nav aria-label="breadcrumb" className="mx-3">
        <ol className="breadcrumb pt-3">
          <li className="breadcrumb-item active" aria-current="page">
            Users
          </li>
        </ol>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-title mt-2 mx-3">
                <h5 className="float-left">List of Users</h5>
                <Link to="/new-user" className="btn btn-success float-right">
                  New <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="alert alert-info">Loading users...</div>
                ) : error ? (
                  <div className="alert alert-danger">
                    Error: {error.message}
                  </div>
                ) : users.length > 0 ? (
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((userData, index) => (
                        <tr key={userData.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{userData.username}</td>
                          <td>{userData.email}</td>
                          <td>
                            <Link
                              to={`/users/${userData.id}`}
                              className="text-success rounded-circle mx-1"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                            <Link
                              to={`/users/${userData.id}/edit`}
                              className="text-warning rounded-circle mx-1"
                            >
                              <FontAwesomeIcon icon={faPencil} />
                            </Link>
                            {userData.id && (
                              <button
                                className="text-danger border-0 rounded-circle mx-1"
                                onClick={() => handleDeleteUser(userData)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No users found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Users;
