const UserDetailsForm = ({
  userDetails,
  handleUserDetailChange,
  selectedCountry,
  setSelectedCountry,
}: any) => (
  <div className="flex flex-col space-y-4">
    <select
      className="rounded-lg border border-black w-full p-2"
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.target.value)}
    >
      <option value="">COUNTRY</option>
      <option value="PAKISTAN">PAKISTAN</option>
      <option value="INDIA">INDIA</option>
      <option value="USA">USA</option>
    </select>
    <input
      type="text"
      name="name"
      value={userDetails?.name}
      onChange={handleUserDetailChange}
      placeholder="Name"
      className="rounded-lg border border-black w-full p-2"
    />
    <input
      type="email"
      name="email"
      value={userDetails?.email}
      onChange={handleUserDetailChange}
      placeholder="Email"
      className="rounded-lg border border-black w-full p-2"
    />
    <input
      type="text"
      name="address"
      value={userDetails?.address}
      onChange={handleUserDetailChange}
      placeholder="Address"
      className="rounded-lg border border-black w-full p-2"
    />
    <input
      type="text"
      name="phone"
      value={userDetails?.phone}
      onChange={handleUserDetailChange}
      placeholder="Phone"
      className="rounded-lg border border-black w-full p-2"
    />
  </div>
);

export default UserDetailsForm;
