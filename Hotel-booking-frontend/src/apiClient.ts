import { LoginFormData } from "./pages/LoginPage";
import request from "./utils/request";

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


export const logout = async () => {
  const response = await request.post("/api/v1/users/logout");
  return response.data;
};



export const validateToken = async () => {
  const response = await request.get("/api/v1/users/valid-token");
  return response.data;
};