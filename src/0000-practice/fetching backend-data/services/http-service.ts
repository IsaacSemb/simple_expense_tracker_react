// this is responsible for creating all interations with the user service

import customAxiosInstance from "./api-client";

interface GenericTypeInteface{
    id: number|string
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAllResourcesFromBackendDB<GenericType>() {
    const controller = new AbortController();
    const request = customAxiosInstance.get<GenericType[]>(this.endpoint, {
      signal: controller.signal,
    });
    return {
      request,
      cancel: () => controller.abort(),
    };
  }
  deleteResourceFromBackendDB(resourceID: number) {
    return customAxiosInstance.delete(this.endpoint+ '/' + resourceID);
    // return { request };
  }

  createResourceToAddToDB<GenericType>(payLoadOfResource: GenericType ) {
    return customAxiosInstance.post(this.endpoint, payLoadOfResource);
  }
  updateResourceInBackendDB<GenericType extends GenericTypeInteface>(payLoadOfResourceUpdate: GenericType) {
    return customAxiosInstance.patch(this.endpoint+ '/' + payLoadOfResourceUpdate.id, payLoadOfResourceUpdate);
  }
}

// to avoid having to instantiate during export of class , we can create a function that instantiates the whole thing
export default function createHTTPserviceForEndPoint(endpoint:string){
  return new HttpService(endpoint)
}

