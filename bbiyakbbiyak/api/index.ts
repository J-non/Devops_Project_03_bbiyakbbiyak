import axios from "axios";

export const signup = async (data: any) => {
  try {
    const response = await axios.post("http://10.0.2.2:3000/signup", { data });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const signupGoogle = async (data: any) => {
  try {
    const response = await axios.post("http://10.0.2.2:3000/signup/google", {
      data,
    });
    const _data = response.data;

    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const loginAPI = async (data: any) => {
  try {
    const response = await axios.post("http://10.0.2.2:3000/login", { data });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const emailAPI = async (data: string) => {
  try {
    const response = await axios.post("http://10.0.2.2:3000/signup/authCode", {
      data,
    });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const findID = async (data: { email: string } | null) => {
  try {
    const response = await axios.post("http://10.0.2.2:3000/login/findID", {
      data,
    });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
export const findPW = async (data: { email: string; phone: string }) => {
  try {
    const response = await axios.post("http://10.0.2.2:3000/login/findPW", {
      data,
    });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const updatePW = async (data: any) => {
  try {
    const response = await axios.post("http://10.0.2.2:3000/login/updatePW", {
      data,
    });
    const _data = response.data;
    return _data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
