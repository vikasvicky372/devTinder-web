import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [emailId, setEmailId] = useState(user?.emailId || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch();
  const handleEditProfile = async () => {
    try {
      if (!firstName || firstName.length < 4) {
        alert("Please enter a valid first name");
        return;
      } else if (!lastName || lastName.length < 4) {
        alert("Please enter a valid last name");
        return;
      } else if (!age || age < 18) {
        alert("Please enter a valid age");
        return;
      } else if (!["male", "female", "others"].includes(gender.toString())) {
        alert("please select the valid gender");
        return;
      } else if (!phoneNumber || phoneNumber.length != 10) {
        alert("Please enter a valid phone number");
        return;
      }
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          phoneNumber,
          photoURL,
          bio,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      setSuccess(res.data.message);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      setEmailId(user.emailId || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setPhoneNumber(user.phoneNumber || "");
      setPhotoURL(user.photoURL || "");
      setBio(user.bio || "");
    }
  }, [user]);
  return (
    <>
      {success && (
        <div className="alert alert-success w-4/12 mx-auto my-10">
          <span>{success}</span>
        </div>
      )}
      <div className="flex flex-row justify-evenly items-center ">
        <div className="flex justify-center items-center my-20">
          <div className="card card-dash bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Profile Details</h2>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input
                  value={emailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);
                  }}
                  type="text"
                  placeholder="You can't touch this"
                  className="input"
                  disabled
                />
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="input"
                  placeholder="Type here"
                />
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="input"
                  placeholder="Type here"
                />
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  value={age}
                  min={18}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  className="input"
                  placeholder="age must be 18+"
                />
                <legend className="fieldset-legend">gender</legend>
                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    console.log(e.target.value); // Log the new value
                  }}
                  className="select"
                >
                  <option value="" disabled>
                    Select a gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <legend className="fieldset-legend">Phone Number</legend>
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <g fill="none">
                      <path
                        d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                  <input
                    type="tel"
                    className="tabular-nums"
                    required
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    placeholder="Phone"
                    pattern="[0-9]*"
                    minLength="10"
                    maxLength="10"
                    title="Must be 10 digits"
                  />
                </label>
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => {
                    setPhotoURL(e.target.value);
                  }}
                  className="input"
                  placeholder="Type here"
                />
                <legend className="fieldset-legend">Your bio</legend>
                <textarea
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  className="textarea h-24"
                  placeholder="Bio"
                ></textarea>
              </fieldset>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleEditProfile();
                  }}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title justify-center mb-2">
            Check Your Chages here
          </h2>
          <UserCard
            user={{
              firstName,
              lastName,
              age,
              gender,
              phoneNumber,
              photoURL,
              bio,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
