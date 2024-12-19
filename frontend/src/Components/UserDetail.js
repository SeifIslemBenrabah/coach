import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState(null);
  const [fileType, setFileType] = useState(""); 
  const user = JSON.parse(localStorage.getItem("user"));
  const [popupMessage, setPopupMessage] = useState("")
  const [showmessage,setshowmessage] = useState(false)
  const [showerr,setshowerr] = useState(false)
  const [displayUploadPopUp,setdisplayUploadPopUp] = useState(false)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const files = await axios.get(`http://localhost:8080/file/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setFiles(files.data)
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
      setshowerr(true)
      setPopupMessage("Please select a file to upload.");
      setTimeout(() => {
        setshowerr(false);
        setPopupMessage("");
      }, 1000);
      return;
    }

    if (!fileType) {
      setshowerr(true)
      setPopupMessage("Please select a file type (Régime or Entraînement).");
      setTimeout(() => {
        setshowerr(false);
        setPopupMessage("");
      }, 1000);
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
      setPopupMessage("File uploaded successfully!");
      setdisplayUploadPopUp(false)
    } catch (err) {
      console.error("Error uploading file:", err);
      setshowerr(true)
      setPopupMessage("Failed to upload file. Please try again.");
      setTimeout(() => {
        setshowerr(false);
        setPopupMessage("");
      }, 1000);
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
      setshowmessage(true)
      setPopupMessage("User details updated successfully!");
      setTimeout(() => {
        setshowmessage(false);
        setPopupMessage("");
      }, 1000);
    } catch (err) {
      console.error(`Error updating user details: ${err}`);
    }
  };

  const handleCancelSubmit = () => {
    setShowPopup(false);
  };
  // New function to handle file download
  const handleFileDownload = async (file) => {
    try {
      // Fetch file metadata (including filepath)
      
  
      const filePath = file.filepath;
  
      if (!filePath) {
        setshowerr(true)
      setPopupMessage("No file found for download.");
      setTimeout(() => {
        setshowerr(false);
        setPopupMessage("");
      }, 1000);
        return;
      }
  
      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = `http://localhost:8080/${filePath}`;
      link.setAttribute("download", file.type);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading file:", err);
      alert("Failed to download file. Please try again.");
    }
  };
  const handledeletefile = async(file) =>{
    try{
      await axios.delete(`http://localhost:8080/file/${file._id}`,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
    }catch(err){
      console.log(err)
    }
  }
  const navigateTolist = () => {
    navigate(`/list`);
  };
  if (!userDetails) { 
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-OffWhite">
      <button className="fixed left-4 top-5 text-white" onClick={navigateTolist}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
      <div className="bg-primary text-center p-4">
        <p className="text-white font-montserrat font-semibold text-3xl">Logo</p>
      </div>
      <div className="flex flex-col mx-12 my-6">
        <div className="flex flex-row w-full justify-between items-center mb-6 mt-3">
        <h1 className="text-4xl font-bold">{userDetails.name} Details</h1>
        <div >
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Modifier
          </button>
        </div>
        </div>
        <div className="grid grid-cols gap-4">
          <div className="flex flex-row w-full gap-4">
  <div className="mt-4 w-1/3">
    <label className="block text-gray-700 font-medium">Name:</label>
    <input
      type="text"
      name="name"
      value={userDetails.name || ""}
      onChange={handleInputChange}
      className="border rounded-md p-2 w-full mt-1"
    />
  </div>

  <div className="mt-4 w-1/3">
    <label className="block text-gray-700 font-medium">Email:</label>
    <input
      type="email"
      name="email"
      value={userDetails.email || ""}
      onChange={handleInputChange}
      className="border rounded-md p-2 w-full mt-1"
    />
  </div>
  <div className="mt-4 w-1/3">
    <label className="block text-gray-700 font-medium">abonnement:</label>
    <input
      type="text"
      name="Abonnement"
      value={`${userDetails.Abonnement} (${userDetails.createdAt})`}
      onChange={handleInputChange}
      className="border rounded-md p-2 w-full mt-1"
      disabled
    />
  </div>
  </div>
  <div className="flex flex-row w-full gap-4">
  <div className="mt-1 w-1/2">
    <label className="block text-gray-700 font-medium">Age:</label>
    <input
      type="number"
      name="age"
      value={userDetails.age || ""}
      onChange={handleInputChange}
      className="border rounded-md p-2 w-full mt-1"
    />
  </div>
  <div className="mt-1 w-1/2">
    <label className="block text-gray-700 font-medium">Sexe:</label>
    <select
      name="sexe"
      value={userDetails.sexe || ""}
      onChange={handleInputChange}
      className="border rounded-md p-2 w-full mt-1"
    >
      <option value="Homme">Homme</option>
      <option value="Femme">Femme</option>
      <option value="Non rempli">Non rempli</option>
    </select>
  </div>
  </div>
  <div className="flex flex-row w-full gap-4">
  <div className="mt-1 w-1/2">
    <label className="block text-gray-700 font-medium">Length (cm):</label>
    <input
      type="number"
      name="length"
      value={userDetails.length || ""}
      onChange={handleInputChange}
      className="border rounded-md p-2 w-full mt-1"
    />
  </div>

  <div className="mt-1 w-1/2">
    <label className="block text-gray-700 font-medium">Weight (kg):</label>
    <input
      type="number"
      name="weight"
      value={userDetails.weight || ""}
      onChange={handleInputChange}
      className="border rounded-md p-2 w-full mt-1"
    />
  </div>
  </div>
</div>
{displayUploadPopUp &&(
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
<div className="mt-6 bg-white p-6 flex flex-col w-1/3 gap-4">
  <div className="w-full">
    <label className="block text-gray-700 font-medium">Upload File:</label>
    <input 
      type="file" 
      name="file" 
      onChange={handleFileChange} 
      className="border rounded-md p-2 w-full mt-1" 
    />
  </div>
  
  <div className="w-full">
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
  
  <div className="w-full flex justify-end">
  <button
                onClick={()=>setdisplayUploadPopUp(false)}
                className="bg-gray-300 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
    <button 
      onClick={handleFileUpload} 
      className="bg-green-500 text-white px-4 py-2 rounded-md"
    >
      Upload File
    </button>
  </div>
</div>
</div>
)}

        {/* Add Get File Button */}
        <div className="flex flex-row w-full mt-4 gap-4">
        {files && files.length > 0 ? (
  files.map((file) => (
    <div className="w-1/2 p-1 border-[1px] border-gray-300 flex flex-row" key={file.id}>
      <button 
        onClick={() => handleFileDownload(file)} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-10/12"
      >
        {file.type} File
      </button>
      <button onClick={() => handledeletefile(file)} className="flex items-center justify-end w-1/5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7 text-red-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
       </svg>
      </button>
    </div>
  ))
) : (
  <p>No files available for download.</p>
)}
</div>
<div className="mt-6 flex flex-row w-full gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={()=>setdisplayUploadPopUp(true)}>
          Upload file
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
      {showmessage && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg">
            {popupMessage}
          </div>
        )}
      {showerr && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-md shadow-lg">
            {popupMessage}
          </div>
        )}
    </div>
  );
};

export default UserDetail;