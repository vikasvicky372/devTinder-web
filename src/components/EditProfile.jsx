

const EditProfile = () => {
  return (
    <div className="flex justify-center items-center my-20">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              placeholder="You can't touch this"
              className="input"
              disabled
            />
            <legend className="fieldset-legend">First Name</legend>
            <input type="text" className="input" placeholder="Type here" />
            <legend className="fieldset-legend">Last Name</legend>
            <input type="text" className="input" placeholder="Type here" />
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              min={18}
              className="input"
              placeholder="age must be 18+"
            />
            <legend className="fieldset-legend">gender</legend>
            <select defaultValue="Select a gender" className="select">
              <option disabled={true}>Select a gender</option>
              <option>male</option>
              <option>female</option>
              <option>others</option>
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
                placeholder="Phone"
                pattern="[0-9]*"
                minlength="10"
                maxlength="10"
                title="Must be 10 digits"
              />
            </label>
            <legend className="fieldset-legend">Photo URL</legend>
            <input type="url" className="input" placeholder="Type here" />
            <legend className="fieldset-legend">Your bio</legend>
            <textarea className="textarea h-24" placeholder="Bio"></textarea>
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
