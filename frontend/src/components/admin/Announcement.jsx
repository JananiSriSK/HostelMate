import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Announcement = () => {

    const [announcement, setAnnouncement] = useState([]);
    const [on, setOn] = useState(false);
    const [activeTab, setActiveTab] = useState("view");
    const [addnew, setAddNew] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');


    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin-announcement`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const announcement = Object.values(response.data);
                console.log(announcement);

                setAnnouncement(announcement);
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        };

        fetchComplaints();
    }, [on]);

    const handleRemoveAnnouncement = async (id) => {

        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin-announcement/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setOn(!on);
            console.log(response.data);
            toast.success('Deleted successfully!', {duration: 4000,
              position: 'top-right', style: {
                marginTop: '50px',
              }
            });  

        } catch (error) {
            console.log(error);
        }
    }

    const handleAddannouncement = async () => {

        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin-announcement`,
                { announcement: addnew },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setOn(!on);
            console.log(response.data);
            toast.success('Added successfully!', {duration: 4000,
              position: 'top-right', style: {
                marginTop: '50px',
              }
            }); 
            setActiveTab("view");

            
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateAnnouncement = async (id) => {

        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin-announcement/${id}`,
                { announcement: editText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setOn(!on);
            console.log(response.data);
            setActiveTab("view");
            setEditingId(null);
            toast.success('Updated successfully!', {duration: 4000,
              position: 'top-right', style: {
                marginTop: '50px',
              }
            }); 

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab("view")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "view"
                        ? "bg-[#a80000] text-white"
                        : "bg-gray-100 text-gray-800"
                        }`}
                >
                    Announcements
                </button>
                <button
                    onClick={() => setActiveTab("add")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "add"
                        ? "bg-[#a80000] text-white"
                        : "bg-gray-100 text-gray-800"
                        }`}
                >
                    Add Announcement
                </button>
            </div>
            {activeTab === "view" && (
                <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold">Announcements</h3>
                    {announcement.length === 0 ? (
                        <p className="text-center text-gray-500">No Announcement found</p>
                    ) : (
                        announcement.map((announce) => (
                          <div
                          key={announce._id}
                          className="flex justify-between items-center bg-white p-4 rounded-lg shadow gap-2"
                        >
                          <div className="flex-1 w-96 max-w-full">
                            {editingId === announce._id ? (
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full break-words whitespace-pre-wrap"
                              />
                            ) : (
                              <p className="text break-words whitespace-pre-wrap text-justify">{announce.announcement}</p>
                            )}
                          </div>
                          
                              <div className="flex gap-2">
                                {editingId === announce._id ? (
                                  <>
                                    <button
                                      onClick={() => handleUpdateAnnouncement(announce._id)}
                                      className="bg-green-600 text-white px-4 py-2 rounded-md"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingId(null)}
                                      className="bg-gray-400 text-white px-4 py-2 rounded-md"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        setEditingId(announce._id);
                                        setEditText(announce.announcement);
                                      }}
                                      className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                                    >
                                      Update
                                    </button>
                                    <button
                                      onClick={() => handleRemoveAnnouncement(announce._id)}
                                      className="bg-red-600 text-white px-4 py-2 rounded-md"
                                    >
                                      Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))                          
                    )}
                </div>
            )}
            {activeTab === "add" && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Add New Announcement</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Add Announcement"
                        onChange={(e) => setAddNew(e.target.value)}
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                    <button
                        onClick={handleAddannouncement}
                        className="bg-red-700 text-white px-4 py-2 rounded-md"
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    )
}

export default Announcement