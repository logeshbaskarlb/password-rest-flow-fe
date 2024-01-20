import axios from "axios";
import { config } from "../Config/Config";


export const login = async (values) => {
try {
  const response = await axios.post
  (`${config.userApi}/login`,values)
  console.log(response);
  if(response.status === 200){
    localStorage.setItem("token",response.data.token);
  }
  return response;
} catch (error) {
  throw new Error(error.response.data.message);
}  
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};