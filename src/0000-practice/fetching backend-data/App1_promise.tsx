import { useEffect, useState } from "react";

import { CanceledError } from "./services/api-client";
import userService, { UserObject } from "./services/userService";

function App1_promise() {
  const [users, setUsers] = useState<UserObject[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // our test api
  useEffect(() => {
    setIsLoading(true);

    const { request, cancel } = userService.getAllResourcesFromBackendDB<UserObject>();

    request
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });
    // cleanup
    return () => cancel();
  }, []);

  function deleteUser(userObject: UserObject) {
    // optimistic update 1. update UI 2. call server
    // pessimistic update 1. call server 2. update UI

    const originalUsers = [...users];

    setUsers(users.filter((user) => user.id !== userObject.id));

    userService.deleteResourceFromBackendDB(userObject.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  }

  function addUser() {
    const originalUsers = [...users];
    // optimistic update
    const newUser = {
      id: 100,
      name: "Isaac Semb",
      email: "isaac@gmail.com",
    };
    setUsers([newUser, ...users]);

    // send to backend
    userService
      .createResourceToAddToDB(newUser)
      .then(
        // destructure and give alias
        ({ data: savedUser }) => setUsers([savedUser, ...users])
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  }

  function updateUser(userObject: UserObject) {
    const originalUsers = [...users];

    const updatedUser = { ...userObject, name: userObject.name + "!!" };
    setUsers(
      users.map((user) => (user.id === userObject.id ? updatedUser : user))
    );

    userService.updateResourceInBackendDB(userObject).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  }

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <div className="spinner-border"></div>}

      <button onClick={addUser} className="btn btn-primary mt-3 mb-3">
        Add User
      </button>

      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <div>
              <button
                onClick={() => updateUser(user)}
                className="btn btn-outline-secondary m-3 mt-3 mb-3"
              >
                update User
              </button>
              <button
                onClick={() => deleteUser(user)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App1_promise;
