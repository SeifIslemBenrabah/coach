import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthData } from '../Auth/AuthWrapper';

const List = () => {
  const { logout } = AuthData();
  const navigate = useNavigate();
  const [listusers, setusers] = useState([]);
  const [open, setopen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [Abonnement, setabonnement] = useState(null);
  const [Abonnements, setabonnements] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [deletepopup, setdeletepopup] = useState(false);
  const [userd, setuserd] = useState({});

  useEffect(() => {
    const fatchusers = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setusers(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(`There is an error: ${err}`);
      }
    };

    const fatchabonnement = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/abonnement`);
        setabonnements(res.data);
        console.log(res);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };

    fatchabonnement();
    fatchusers();
  }, [trigger]);

  const handleClose = () => {
    setopen(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:8080/user',
        {
          name: name,
          email: email,
          password: password,
          Abonnement: Abonnement,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTrigger(!trigger);
      handleClose();
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const handleDeleteOpen = (user) => {
    setdeletepopup(true);
    setuserd(user);  
    console.log(`Userd: ${user.name}`);
  };

  const handleDeleteClose = () => {
    setdeletepopup(false);
    setuserd({});
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setdeletepopup(false);
      setuserd({});
      console.log('User deleted');
      setTrigger(!trigger);
    } catch (err) {
      console.log('Error deleting user:', err);
    }
  };
  const navigateToDetails = (id) => {
    navigate(`/${id}`);
  };
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/'); // Redirect to the login page
};
  return (
    <div className="flex flex-col">
      <div className="bg-primary text-center p-4">
        <p className="text-white font-montserrat font-semibold text-3xl">Logo</p>
        <button onClick={handleLogout} className='fixed right-4 top-4 flex flex-row items-center text-white'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
        </button>
      </div>
      <div className="fixed top-[71px] w-full flex flex-row justify-between bg-OffWhite p-6">
        <div className="flex gap-2">
          <button className="bg-white border-[1px] rounded-md px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
          </button>
          <div className="relative w-80">
            <input
              className="w-80 px-8 border-[1px] rounded-md bg-white h-10 hover:border-primary focus:outline-none focus:ring-0 hover:outline-primary"
              placeholder="Search"
              type="text"
            />
            <button className="font-montserrat font-medium text-gray-400 h-10 absolute left-2 rounded-r-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          className="bg-primary p-2 text-white rounded-md flex flex-row gap-1"
          onClick={() => {
            setopen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Ajouter client
        </button>
      </div>
      <div className="mt-40 pl-4 bg-OffWhite w-full table-container">
        <table className="w-full custom-table border-collapse">
          <thead>
            <tr className="font-semibold">
              <td>Name</td>
              <td>Email</td>
              <td>Abonnement</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {listusers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}({user.Abonnement})</td>
                <td>
                  <div className="flex flex-row">
                    <button onClick={() => navigateToDetails(user._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                    <button
                      className="text-red-700"
                      onClick={() => handleDeleteOpen(user)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open&&(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3 relative">
        <button onClick={handleClose} className='text-red-600 absolute right-4 top-4'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </button>
            <h1 className="text-2xl font-bold mb-4 text-primary">Ajouter Client</h1>
            <form onSubmit={handleAdd} 
            className="flex flex-col gap-2">
              <div className='flex flex-col'>
                <label htmlFor="name" className="font-semibold">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border border-gray-300 p-1 rounded"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
                </div>
                <div className='flex flex-col'>
                <label htmlFor="email" className="font-semibold">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="border border-gray-300 p-1 rounded"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                </div>
                <div className='flex flex-col'>
                <label htmlFor="password" className="font-semibold">Password:</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    className="border border-gray-300 p-1 rounded"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                </div>
                <div className='flex flex-col'>
                <label htmlFor="Abonnement" className="font-semibold">Abonnement:</label>
                <select
                    id="Abonnement"
                    value={Abonnement}
                    onChange={(e) => setabonnement(e.target.value)}
                    required
                    className="border border-gray-300 p-[5px] rounded"
                >
                  <option value='' className='text-gray-500'>
                    Select Abonnement
                  </option>
                    {Abonnements.map((abonnement, index) => (
                        <option key={index} value={abonnement}>
                            {abonnement}
                        </option>
                    ))}
                </select>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 font-montserrat"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-lg font-montserrat">
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
    </div>
      )}
      {deletepopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
                        <h1 className="text-2xl font-bold mb-4">Do You want to Delete {user.name}?</h1>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 font-montserrat"
                                onClick={handleDeleteClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-montserrat"
                                onClick={() => handleDeleteUser(userd._id)}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  );
};

export default List;
