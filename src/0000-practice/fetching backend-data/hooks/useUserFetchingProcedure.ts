// the procedure for when fetching users
//  it can be used in all components that require fetching users

import { useEffect, useState } from "react";
import userService, { UserObject } from "../services/userService";
import { CanceledError } from "../services/api-client";

function useUserFetching() {
  const [users, setUsers] = useState<UserObject[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const { request, cancel } =
      userService.getAllResourcesFromBackendDB<UserObject>();

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

  return {
    users,
    setUsers,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
}

export default useUserFetching;
