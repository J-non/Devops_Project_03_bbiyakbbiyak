import axios from "axios";

export const signup = async (data: any) => {
  const response = await axios.post("http://10.0.2.2:3000/signup", { data });
  const _data = response.data;
  return _data;
};

export const loginAPI = async (data: any) => {
  const response = await axios.post("http://10.0.2.2:3000/login", { data });
  const _data = response.data;
  return _data;
};

export const emailAPI = async (data: string) => {
  const response = await axios.post("http://10.0.2.2:3000/signup/authCode", {
    data,
  });
  const _data = response.data;
  return _data;
};
