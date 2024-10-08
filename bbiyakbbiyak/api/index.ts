import axios from "axios";

export const signup = async () => {
  const response = await axios("http://localhost:4000/signup");
};
