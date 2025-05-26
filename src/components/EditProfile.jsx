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
        <div className="alert alert-success w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 mx-auto my-6 z-10">
          <span>{success}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row justify-center items-stretch lg:items-start gap-6 px-4 py-6">
        {/* Profile Form */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="card bg-base-300 w-full max-w-md">
            <div className="card-body">
              <h2 className="card-title justify-center">Profile Details</h2>
              <fieldset className="fieldset space-y-4">
                {/* Email */}
                <div>
                  <legend className="fieldset-legend">Email</legend>
                  <input
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    type="text"
                    className="input w-full"
                    disabled
                  />
                </div>

                {/* First Name */}
                <div>
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input w-full"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input w-full"
                  />
                </div>

                {/* Age */}
                <div>
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    value={age}
                    min={18}
                    onChange={(e) => setAge(e.target.value)}
                    className="input w-full"
                  />
                </div>

                {/* Gender */}
                <div>
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select w-full"
                  >
                    <option value="" disabled>
                      Select a gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <legend className="fieldset-legend">Phone Number</legend>
                  <label className="input flex items-center gap-2">
                    <svg
                      className="h-4 opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <g fill="none">
                        <path d="M7.25 11.5..." fill="currentColor" />
                        <path d="M6 1C..." fill="currentColor" />
                      </g>
                    </svg>
                    <input
                      type="tel"
                      className="w-full tabular-nums"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone"
                      pattern="[0-9]*"
                      minLength="10"
                      maxLength="10"
                      title="Must be 10 digits"
                    />
                  </label>
                </div>

                {/* Photo URL */}
                <div>
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="input w-full"
                  />
                </div>

                {/* Bio */}
                <div>
                  <legend className="fieldset-legend">Your bio</legend>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="textarea w-full h-24"
                    placeholder="Bio"
                  ></textarea>
                </div>
              </fieldset>

              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary" onClick={handleEditProfile}>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Preview Card */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="max-w-md w-full text-center">
            <h2 className="card-title justify-center mb-4">
              Check Your Changes Here
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
      </div>
    </>
  );
};

export default EditProfile;
