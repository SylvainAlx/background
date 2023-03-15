import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../utils/FetchOperations";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    syncUsers();
  }, []);

  const syncUsers = () => {
    getUsers(jwt)
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    users.length > 0 && console.log(users);
  }, [users]);

  const handleEdit = (e) => {
    const id = e.currentTarget.getAttribute("id");
    console.log(id);
  };

  const handleDelete = (e) => {
    const id = e.currentTarget.getAttribute("id");
    const index = e.currentTarget.getAttribute("index");
    deleteUser(jwt, id)
      .then((data) => {
        console.log(data);
        syncUsers();
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className="main">
      <section>
        <h2>Administration</h2>
        <div className="document">
          <h3>utilisateurs</h3>
          <table>
            <thead>
              <tr>
                <th>pseudo</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {users.length !== 0 &&
                users.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td>{user.pseudo}</td>
                      <td>{user.email}</td>
                      <td id={user._id} onClick={handleEdit}>
                        <AiFillEdit />
                      </td>
                      <td id={user._id} index={i} onClick={handleDelete}>
                        <AiFillDelete />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Admin;
