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

export const jwtToken = async (data: any) => {
  try {
    const response = await axios.post("http://10.0.2.2:3000/signup/jwtToken", {
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

export const emailAPI = async (data: object) => {
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

export const findID = async (data: { phone: string } | null) => {
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

export const getInfo = async (data: any) => {
  try {
    const url = `http://10.0.2.2:3000/login/getInfo/${data.token ? data.token : data}`;

    const response = await axios.get(url);

    return response.data; // 필요한 데이터 반환
  } catch (error) {
    console.error("Error in getInfo:", error);
    throw error; // 오류를 호출한 곳으로 던짐
  }
};

export const updateGoogleUserName = async (data: any) => {
  try {
    const response = await axios.post(
      "http://10.0.2.2:3000/login/getInfo/updateGoogle",
      { data }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const deleteUser = async (data: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${data}`,
        "Content-Type": "application/json", // 필요에 따라 추가
      },
    };
    const response = await axios.post(
      "http://10.0.2.2:3000/signup/deleteUser",
      {},
      config
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
