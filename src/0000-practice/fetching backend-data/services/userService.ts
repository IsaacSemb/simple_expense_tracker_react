// this is responsible for creating all interations with the user service

import customAxiosInstance from "./api-client";

export interface UserObject {
  id: number;
  name: string;
  email: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = customAxiosInstance.get<UserObject[]>("/users", {
      signal: controller.signal,
    });
    return {
      request,
      cancel: () => controller.abort(),
    };
  }
  deleteUser(userObject: UserObject) {
    return customAxiosInstance.delete("/users/" + userObject.id);
    // return { request };
  }

  addUser(userObject: UserObject) {
    return customAxiosInstance.post("/users", userObject);
  }
  updateUser(userObject: UserObject) {
    return customAxiosInstance.patch("/users/" + userObject.id, userObject);
  }
}

export default new UserService();
