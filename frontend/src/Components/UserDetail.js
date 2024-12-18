import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(""); // To store the file type ('Régime' or 'Entraînement')
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUserDetails(res.data);
      } catch (err) {
        console.error(`Error fetching user details: ${err}`);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value); // Set the selected file type
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    if (!fileType) {
      alert("Please select a file type (Régime or Entraînement).");
      return;
    }

    // Create FormData to append file and metadata
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", id); // Include the user ID
    formData.append("type", fileType); // File type (either 'Régime' or 'Entraînement')

    try {
      const res = await axios.post("http://localhost:8080/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res.data);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Failed to upload file. Please try again.");
    }
  };

  const handleSubmit = async () => {
    setShowPopup(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/user/${id}`,
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res);
      setShowPopup(false);
      alert("User details updated successfully!");
    } catch (err) {
      console.error(`Error updating user details: ${err}`);
    }
  };

  const handleCancelSubmit = () => {
    setShowPopup(false);
  };

  // New function to handle file download
  const handleFileDownload = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/file/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        responseType: "blob", // Important for file download
      });

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file_name"); // Change to the appropriate file name
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error downloading file:", err);
      alert("Failed to download file. Please try again.");
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-OffWhite">
      <div className="bg-primary text-center p-4">
        <p className="text-white font-montserrat font-semibold text-3xl">Logo</p>
      </div>
      <div className="flex flex-col mx-12 my-6">
        <h1 className="text-4xl font-bold">{userDetails.name} Details</h1>
        <div className="grid grid-cols-2 gap-4">
          {[ 
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Age", name: "age", type: "number" },
            { label: "Sexe", name: "sexe", type: "select", options: ["Homme", "Femme", "Non rempli"] },
            { label: "Length (cm)", name: "length", type: "number" },
            { label: "Weight (kg)", name: "weight", type: "number" }
          ].map((field) => (
            <div key={field.name} className="mt-4">
              <label className="block text-gray-700 font-medium">{field.label}:</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={userDetails[field.name] || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 w-full mt-1"
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={userDetails[field.name] || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 w-full mt-1"
                />
              )}
            </div>
          ))}
        </div>
        

        <div className="mt-6">
          <label className="block text-gray-700 font-medium">Upload File:</label>
          <input 
            type="file" 
            name="file" 
            onChange={handleFileChange} 
            className="border rounded-md p-2 w-full mt-1" 
          />
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Select File Type:</label>
            <select
              value={fileType}
              onChange={handleFileTypeChange}
              className="border rounded-md p-2 w-full mt-1"
            >
              <option value="">Select Type</option>
              <option value="Régime">Régime</option>
              <option value="Entraînement">Entraînement</option>
            </select>
          </div>
          <button 
            onClick={handleFileUpload} 
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Upload File
          </button>
        </div>

        {/* Add Get File Button */}
        <div className="mt-6">
          <button 
            onClick={handleFileDownload} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Get File
          </button>
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Confirm Changes</h3>
            <p>Are you sure you want to save the changes?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCancelSubmit}
                className="bg-gray-300 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
