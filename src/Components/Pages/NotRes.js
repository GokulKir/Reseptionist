import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { button, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Collapse } from "react-collapse";
import { Dropdown, Selection } from "react-dropdown-now";
import "react-dropdown-now/style.css";
import "./NotRes";
import { useSocket } from "../../Context/SocketContext";
import moment from "moment";
import { noteResponce, FullData } from "../../constant/constant";
import Speech from "speak-tts";
import { PorposeOfVisit,EmployeeData } from "../../Recoil/recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  listAllDipartment,
  listAllUserUnderDipartment,
} from "../../api/apiCalls";
function NotRes() {
  const navigate = useNavigate();
  const [Option, setOpation] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [useropen, setUserOpen] = React.useState(false);
  const [allDipartment, setAllDipartment] = useState(null);
  const [selectedDipartment, setSelectedDipartment] = useState(null);
  const [listAllEmployee, setListAllEmployee] = useState(null);
  // const [purposeOfVisit,setPorposeOfVisit] = useRecoilValue(PorposeOfVisit);
  const purposeOfVisit = useRecoilValue(PorposeOfVisit);
  const[EmployeeDataList,setEmployeeDataList] = useRecoilState(EmployeeData)
  const [data, setData] = useState("Department");
  const [userData, setUserData] = useState("");
  const [Navigate, setNavigate] = useState(false);
  const [error, setError] = useState(null);
  const [Spe, setSpe] = useState("I am sorry , but couldn't catch you . Could you please select the concerned from the drop down list on the Tab next to me");
  const [formValue, setformValue] = useState(noteResponce);
  const [userLIST, setUserList] = useState(FullData);


  const socket = useSocket();
  useEffect(() => {
    console.log(data);
  }, [data]);


  useEffect(() => {
    console.log(userData, "userData");
  }, [userData]);


  useEffect(() => {
    console.log("User List", userLIST);
  }, [userLIST]);


  const handleOpen = () => {
    setOpen(!open);
  };


  const handleUserOpen = () => {
    setUserOpen(!useropen);
  };



  useEffect(() => {
    socket.emit("getAllUsers", { message: "Hello from the client" });
    socket.on("userList", (data) => {
      const userJson = JSON.parse(data);
      console.log("API Response:", userJson);
      setUserList(userJson);
    });


    // Return a cleanup function to remove the event listener
    return () => {
      socket.off("userList");
    };
  }, [useropen]);


  useEffect(() => {
    const getDiparment = async () => {
      let apiResponse = await listAllDipartment();
      if (apiResponse) {
        setAllDipartment(apiResponse);
      } 
    };

    getDiparment();
    const handleApiResponse = (data) => {
      console.log("API Response:", data);
      // Handle the API response here
    };

    socket.on("apiResponse", handleApiResponse);

    // Return a cleanup function to remove the event listener
    return () => {
      socket.off("apiResponse", handleApiResponse);
    };
  }, []);




  const handleSubmit = () => {
    console.log("Submit button clicked");
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const mockData = {
      user_id: userData,
      date_time: currentTime,
    };

    


    socket.emit("payload", mockData);

    const handleApiResponse = (data) => {
      console.log("API Response:", data);
      // Handle the API response here
      // Clean up the event listener after receiving the response
      socket.off("apiResponse", handleApiResponse);
    };



    socket.on("apiResponse", handleApiResponse);

    // console.log(
    //   formValue.empoyee_name,
    //   formValue.job_title,
    //   formValue.purpose_note
    // );
    // {empoyee_name: null, job_title: null, purpose_note: null}

    if (
      formValue.empoyee_name ||
      formValue.job_title ||
      formValue.purpose_note
    ) {
      setError(false);
      setNavigate(true);
      return;
    }
    setError(true);
    return;
  };


  useEffect(() => {
    if (Navigate) {
      navigate("/contactform");
      setEmployeeDataList(formValue)
    }
  }, [Navigate]);



  useEffect(() => {
    if (
      Spe ===  "I am sorry , but couldn't catch you . Could you please select the concerned from the drop down list on the Tab next to me"
    ) {
      const confirmed = new SpeechSynthesisUtterance(Spe);
      window.speechSynthesis.speak(confirmed);
      setSpe("");
    }
    setformValue({
      purpose_note: purposeOfVisit,
    });
  }, []);



  useEffect(() => {
    const getEmployeeUnderDipartment = async () => {
      const GetAllUserUnderDipartment = await listAllUserUnderDipartment(
        selectedDipartment
      );
      if (GetAllUserUnderDipartment) {
        setListAllEmployee(GetAllUserUnderDipartment);
      }
    };
    getEmployeeUnderDipartment();
  }, [selectedDipartment]);



  const setValue = (data, name) => {
    setformValue({
      ...formValue,
      [name]: data,
    });
  };



  useEffect(() => {
    console.log(formValue);
  }, [formValue]);



  return (
    <div className="">
      <div className="flex justify-center">
        <div className="w-11/12 h-[80px] bg-orange-500 mt-[20px]  rounded  ">
          <p className="text-white mt-2 ml-3 text-[14px] md:text-[18px] font-light">
            I am sorry , but couldn't catch you . Could you please select the
            concerned from the drop down list on the Tab next to me.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        {/* <div className='w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9  border-1 border-grey-50 rounded'> */}
        {/* <div className='flex flex-row  justify-between'>
						<div className='w-[2000px] h-[40px] md:mt-[30px] ml-[20px] mt-[25px] lg:mt-[35px]'>
							<p className=''>{data}</p>
						</div>

						<div
							className='mr-[38px] mt-[20px] w-[40px] h-[40px] '
							style={{ display: "grid", placeItems: "center" }}
						>
							<button onClick={() => handleOpen()}>
								<Icon icon='bxs:up-arrow' rotate={2} />
							</button>
						</div>
					</div> */}

        <select
          id="job_title"
          onChange={(e) => {
            console.log(e.target.value, e.target.name, "ggg");
            setValue(e.target.value, e.target.name);
            setSelectedDipartment(e.target.value);
          }}
          name="job_title"
          className=" w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-600 dark:focus:border-orange-600"
        >
          <option value="">Select Department</option>
          {allDipartment?.map((obj, i) => (
            <option value={obj} key={i}>
              {obj}
            </option>
          ))}
        </select>

        {/* </div> */}
      </div>
      <div className="flex justify-center">
        <div className="w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9   border-1 border-grey-50 rounded">
          <select
            id="empoyee_name"
            name="empoyee_name"
            onChange={(e) => setValue(e.target.value, e.target.name)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full h-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-600 dark:focus:border-orange-600"
          >
            <option value="">Select Employee</option>
            {listAllEmployee?.map((obj, i) => (
              <option value={obj.member_id} key={obj.member_id}>
                {obj.display_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {userLIST ? (
        <div className="flex justify-center">
          {useropen ? (
            <ul className="w-11/12 mr-[40px] absolute">
              {/* {console.log(useropen, "user opened", userLIST)} */}
              <div className="">
                {userLIST?.map((obj, i) => (
                  <li
                    key={i}
                    className="w-full h-[40px] bg-slate-400 rounded mt-0.6 shadow-md border-1 content-center justify-center"
                  >
                    <Button
                      onClick={() => setUserData(obj.member_id)}
                      className="w-full h-full text-white"
                    >
                      {obj.display_name}
                    </Button>
                  </li>
                ))}
              </div>
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="flex justify-center">
        <div className="w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9   border-1 border-grey-50 rounded">
          {/* <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label> */}
          <textarea
            onChange={(e) => {
              setValue(e.target.value, e.target.name);
            }}
            id="purpose_note"
            value={formValue.purpose_note}
            name="purpose_note"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Purpose of visit..."
          ></textarea>
        </div>
      </div>

      {error && (
        <div className="flex justify-center">
          <p className="text-red-500">Fill the above fields</p>
        </div>
      )}

      <div className="flex justify-center">
        <div className="w-10/12 h-[120px] mt-[80px] flex justify-center pt-[40px]">
          <Button
            onClick={() => handleSubmit()}
            className="w-[210px] h-[60px] md:w-[260px] lg:w-[290px]  bg-orange-500 flex justify-center content-center"
          >
            <p>Submit</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotRes;
