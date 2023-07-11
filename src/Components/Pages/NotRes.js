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
const FullData = [
		{
			id: 1,
			member_id: "f90ec33b-e85c-4dca-b434-2325c3385b6c",
			business_phone: "971567889290",
			display_name: "Harish Abdul Wahab",
			given_name: "Harish",
			job_title: null,
			mail: "admin@Devlacus.onmicrosoft.com",
			phone: null,
			office_location: null,
			preferred_language: "en-US",
			surname: "Abdul Wahab",
			user_principal_name: "admin@Devlacus.onmicrosoft.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
		{
			id: 2,
			member_id: "e10000fd-942b-4c08-8d17-02732b96a2b8",
			business_phone: null,
			display_name: "Dana Alsani",
			given_name: "Dana",
			job_title: "Software Consultant",
			mail: "dana@devlacus.com",
			phone: "+971524926900",
			office_location: "Dubai, Devlacus",
			preferred_language: null,
			surname: "Alsani",
			user_principal_name: "dana@devlacus.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
		{
			id: 3,
			member_id: "9f94e975-5727-45ab-b155-b2672d1605df",
			business_phone: "+97104318 0291",
			display_name: "Fathimath Farhana Mohamed",
			given_name: "Fathimath Farhana",
			job_title: "Business Development Manager",
			mail: "fathimath@devlacus.com",
			phone: "+971585334662",
			office_location: "Devlacus technologies",
			preferred_language: null,
			surname: "Mohamed",
			user_principal_name: "fathimath@devlacus.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
		{
			id: 4,
			member_id: "423cfa76-7f1e-4eb1-a46f-8db9bb963fc6",
			business_phone: null,
			display_name: "Goutham Mohandas",
			given_name: "Goutham",
			job_title: null,
			mail: "goutham@devlacus.com",
			phone: null,
			office_location: null,
			preferred_language: null,
			surname: "Mohandas",
			user_principal_name: "goutham@devlacus.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
		{
			id: 5,
			member_id: "c2ace602-a377-4cb8-b998-77e47e273a5b",
			business_phone: "+97104318 0291",
			display_name: "Harry",
			given_name: "Harish",
			job_title: "CEO",
			mail: "harry@devlacus.com",
			phone: "+971585889290",
			office_location: null,
			preferred_language: null,
			surname: "Abdul Wahab",
			user_principal_name: "harry@devlacus.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
		{
			id: 6,
			member_id: "057a3e53-84dc-439d-a69a-aba9b1bb8185",
			business_phone: null,
			display_name: "HR Department",
			given_name: "HR",
			job_title: null,
			mail: "hr@devlacus.com",
			phone: "+971585334662",
			office_location: null,
			preferred_language: null,
			surname: "Department",
			user_principal_name: "hr@devlacus.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
		{
			id: 7,
			member_id: "bbac478c-ff0f-40db-b285-35c8ac8c38ae",
			business_phone: null,
			display_name: "Jovian D Cunha",
			given_name: "Jovian",
			job_title: "Sr. Robotics Engineer",
			mail: "jovian@devlacus.com",
			phone: null,
			office_location: "Devlacus Technologies",
			preferred_language: null,
			surname: "D Cunha",
			user_principal_name: "jovian@devlacus.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
		{
			id: 8,
			member_id: "1ed73db4-0f2f-43cf-8b46-c3bf3fa4b46c",
			business_phone: null,
			display_name: "Ritin Nair",
			given_name: "Ritin",
			job_title: "Robotics Engineer",
			mail: "ritin@devlacus.com",
			phone: "+971503836188",
			office_location: "Devlacus Technologies",
			preferred_language: null,
			surname: "Nair",
			user_principal_name: "ritin@devlacus.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
		{
			id: 9,
			member_id: "e9e5d5de-593f-48c0-b6bf-a3396d435c1d",
			business_phone: null,
			display_name: "Mohammed Shahzad",
			given_name: "Mohammed",
			job_title: null,
			mail: "shahzad@devlacus.com",
			phone: null,
			office_location: null,
			preferred_language: null,
			surname: "Shahzad",
			user_principal_name: "shahzad@devlacus.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
		{
			id: 10,
			member_id: "a9e9a9db-b152-429d-9dff-aa5e86e1aae0",
			business_phone: null,
			display_name: "Shelley Antony",
			given_name: "Shelley",
			job_title: "Team Lead",
			mail: "shelley@devlacus.com",
			phone: "+918943022709",
			office_location: "Devlacus technologies IN",
			preferred_language: null,
			surname: "Antony",
			user_principal_name: "shelley@devlacus.com",
			image_path: "/uploads/Members/a9e9a9db-b152-429d-9dff-aa5e86e1aae0.jpg",
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:52.000000Z",
			deleted_at: null,
		},
		{
			id: 11,
			member_id: "6860896b-3d76-4216-a293-5238a39f753c",
			business_phone: null,
			display_name: "Sukesh Ramdas",
			given_name: "Sukesh",
			job_title: null,
			mail: "sukesh@devlacus.com",
			phone: null,
			office_location: null,
			preferred_language: null,
			surname: "Ramdas",
			user_principal_name: "sukesh@devlacus.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
		{
			id: 12,
			member_id: "261daf56-0287-43fe-9c13-93f295a3c371",
			business_phone: null,
			display_name: "Vivek Issac",
			given_name: "Vivek",
			job_title: "R&D Mechanical Engineer",
			mail: "vivek@devlacus.com",
			phone: "+971524614261",
			office_location: "Devlacus technologies",
			preferred_language: "en-US",
			surname: "Issac",
			user_principal_name: "vivek@devlacus.com",
			image_path: null,
			created_at: "2023-07-07T01:47:49.000000Z",
			updated_at: "2023-07-07T01:47:49.000000Z",
			deleted_at: null,
		},
	];

function NotRes() {
	const navigate = useNavigate();
	const [Option, setOpation] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [useropen, setUserOpen] = React.useState(false);

	const [data, setData] = useState("Department");
	const [userData, setUserData] = useState("");

	const [userLIST, setUserList] = useState(FullData);

	const socket = useSocket();

	const Data = [
		{
			id: 1,
			name: "Design department",
		},
		{
			id: 2,
			name: "Hardware department",
		},
		{
			id: 3,
			name: "Software department",
		},
		{
			id: 4,
			name: "HR department",
		},
		{
			id: 5,
			name: "Mechanical department",
		},
		{
			id: 6,
			name: "Technical department",
		},
		{
			id: 7,
			name: "Manager department",
		},
	];

	

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
    
    // navigate("/Conditions");
  };
  

	return (
		<div className=''>
			<div className='flex justify-center'>
				<div className='w-11/12 h-[80px] bg-orange-500 mt-[20px]  rounded  '>
					<p className='text-white mt-2 ml-3 text-[14px] md:text-[18px] font-light'>
						I am sorry , but couldn't catch you . Could you please select the
						concerned from the drop down list on the Tab next to me.
					</p>
				</div>
			</div>

			<div className='flex justify-center'>
				<div className='w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9  border-1 border-grey-50 rounded'>
					<div className='flex flex-row  justify-between'>
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
					</div>
				</div>
			</div>

			<div className='flex justify-center'>
				{open ? (
					<ul className='w-11/12 mr-[40px] absolute'>
						<div>
							{Data.map((obj, i) => (
								<li
									key={i}
									className='w-full h-[40px] bg-slate-400 rounded mt-0.6 shadow-md border-1 content-center justify-center'
								>
									<Button
										onClick={() => setData(obj.name)}
										className='w-full h-full text-white'
									>
										{obj.name}
									</Button>
								</li>
							))}
						</div>
					</ul>
				) : null}
			</div>

			<div className='flex justify-center'>
				<div className='w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9   border-1 border-grey-50 rounded'>
					<div className='flex flex-row  justify-between'>
						<div className='w-[120px] h-[40px] md:mt-[30px] ml-[20px] mt-[25px] lg:mt-[35px]'>
							<p className=''>Persone</p>
						</div>

						<div
							className='mr-[25px] mt-[20px] w-[40px] h-[40px] '
							style={{ display: "grid", placeItems: "center" }}
						>
							<button
								id='dropdownDefaultButton'
								data-dropdown-toggle='dropdown'
								onClick={() => handleUserOpen()}
							>
								<Icon icon='bxs:up-arrow' rotate={2} />
							</button>
						</div>
					</div>
				</div>

			</div>


     

				{userLIST ? (
					<div className='flex justify-center'>
						{useropen ? (
							<ul className='w-11/12 mr-[40px] absolute'>
								{console.log(useropen, "user opened", userLIST)}
								<div className="">
									{userLIST?.map((obj, i) => (
										<li
											key={i}
                      className='w-full h-[40px] bg-slate-400 rounded mt-0.6 shadow-md border-1 content-center justify-center'
										>
											<Button
												onClick={() => setUserData(obj.member_id)}
												className='w-full h-full text-white'
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




			<div className='flex justify-center'>
				<div className='w-11/12 h-[80px] md:h-[90px] lg:h-[100px] bg-white-400 mt-9   border-1 border-grey-50 rounded'>
					<div className='flex flex-row  justify-between'>
						<div className='w-[200px] h-[40px] md:mt-[30px] ml-[20px] mt-[25px] lg:mt-[35px]'>
							<p className=''>Purpose of visit (text area)</p>
						</div>
					</div>
				</div>
			</div>

			<div className='flex justify-center'>
				<div className='w-10/12 h-[120px] mt-[80px] flex justify-center pt-[40px]'>
					<Button
						onClick={() => handleSubmit()}
						className='w-[210px] h-[60px] md:w-[260px] lg:w-[290px]  bg-orange-500 flex justify-center content-center'
					>
						<p>Submit</p>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default NotRes;

