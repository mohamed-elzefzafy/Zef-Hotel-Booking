import { LoginFormData } from "./pages/LoginPage";
import request from "./utils/request";
import { HotelType } from "./utils/types";

export const registerApi = async (data: FormData) => {
  const response = await request.post("/api/v1/users/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


export const login = async (data: LoginFormData) => {
  const response = await request.post("/api/v1/users/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};


export const logout = async () : Promise<HotelType[]> => {
  const response = await request.post("/api/v1/users/logout");
  return response.data;
};



export const validateToken = async () => {
  const response = await request.get("/api/v1/users/valid-token");
  return response.data;
};

// hotel apies 

export const addHotel = async (data: FormData) => {
  const response = await request.post("/api/v1/my-hotels", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


export const getHotels = async () : Promise<HotelType[] | undefined> => {
try {
  const response = await request.get("/api/v1/my-hotels");
  return response.data;
  
} catch (error) {
  console.log(error);
  
}
};


export const getOneHotel = async (hotelId : string) : Promise<HotelType | undefined> => {
  try {
    const response = await request.get(`/api/v1/my-hotels/${hotelId}`);
    return response.data;
    
  } catch (error) {
    console.log(error);
    
  }
  };
  

  export const updateHotel = async (data: FormData) => {
    const response = await request.put(`/api/v1/my-hotels/update-hotel/${data.get("hotelId")}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        
      },
    });
    return response.data;
  };
  