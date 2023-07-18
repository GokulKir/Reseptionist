import axios from "axios";

const API_URL = "https://hubo2.domainenroll.com/api/v1/";

export const SingleUserByName = async (speech) => {
  try {
    const ApiResponse = await axios.post(API_URL + "single-user-byname", {
      input_name: speech,
    });

    if (ApiResponse) {
      const ResponceData = ApiResponse.data.data;
      if (ResponceData.length > 0) {
        return ResponceData;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMeetingPurpose = async (data) => {
  try {
    const ApiResponse = axios.post(API_URL + "alert-visit", data);
    if (ApiResponse) {
      const ResponceData = ApiResponse.data.data;
      if (ResponceData.length > 0) {
        return ResponceData;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const listAllDipartment = async () => {
  try {
    const ApiResponse = await axios.get(API_URL + "departments");
    if (ApiResponse) {
      let result = ApiResponse.data.data;
      if (result.length > 0) {
        return result;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const listAllUserUnderDipartment = async (data) => {
  try {
    const ApiResponse = await axios.post(API_URL + "department-employees", {
      department_name: data,
    });
    if (ApiResponse) {
      let result = ApiResponse.data.data;
      if (result.length > 0) {
        return result;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
