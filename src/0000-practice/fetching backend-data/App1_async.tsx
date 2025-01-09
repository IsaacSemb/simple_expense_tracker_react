import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface UserObject {
  id: string;
  name: string;
  username: string;
  email: string;
}
function App1_async() {
  const [users, setUsers] = useState<UserObject[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const API = "https://jsonplaceholder.typicode.com/users";
        const response = await axios.get<UserObject[]>(API);
        setUsers(response.data)
      } catch (error) {
        setError((error as AxiosError).message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App1_async;
