// this is responsible for creating all interations with the user service
import createHTTPserviceForEndPoint from "./http-service";


export interface UserObject {
  id: number;
  name: string;
  email: string;
}

export default createHTTPserviceForEndPoint("/users");
