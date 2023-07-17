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
