import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar"; // Import Navbar component

export default function Profile() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setEmail(storedEmail);
            fetchProfile(storedEmail);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const fetchProfile = async (userEmail) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/profile/${userEmail}`);
            let profileData = response.data;

            if (typeof profileData.interests === "string") {
                try {
                    profileData.interests = JSON.parse(profileData.interests);
                } catch (error) {
                    console.error("Error parsing interests:", error);
                    profileData.interests = [];
                }
            }

            Object.keys(profileData).forEach((key) => {
                if (typeof profileData[key] === "string") {
                    profileData[key] = profileData[key].replace(/^"|"$/g, "");
                }
            });

            setProfile(profileData);
            setFormData(profileData);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch profile.");
        } finally {
            setLoading(false);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle photo upload
    const handlePhotoUpload = (e) => {
        setPhoto(e.target.files[0]);
    };

    // Handle profile update
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const profileData = new FormData();
            profileData.append("email", email);

            Object.keys(formData).forEach((key) =>
                profileData.append(key, JSON.stringify(formData[key]))
            );

            if (photo) profileData.append("photo", photo);

            const response = await axios.post("http://127.0.0.1:5000/build-profile", profileData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                setIsEditing(false);
                fetchProfile(email); // Refresh profile after update
            }
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update profile.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-100 min-vh-100 bg-light-gray flex justify-center items-center">
                <div className="shadow-5 pa4 bg-white br3 w-40">
                    <h2 className="f3 text-center">{isEditing ? "Edit Your Profile" : "Your Profile"}</h2>
                    {error && <p className="red tc">{error}</p>}
                    {loading ? (
                        <p className="tc">Loading profile...</p>
                    ) : (
                        <form onSubmit={handleUpdateProfile} className="space-y-3">
                            {/* Profile Photo */}
                            {/* Profile Photo */}
                            <div className="flex justify-center mb-4">
                                {profile?.photo ? (
                                    <img
                                        src={`http://127.0.0.1:5000${profile.photo}`}  // ✅ Fetch user photo
                                        alt="Profile"
                                        className="br-100 h4 w4 dib"
                                        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }} // ✅ Uses free placeholder image
                                    />
                                ) : (
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Default Profile"
                                        className="br-100 h4 w4 dib"
                                        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                                    />
                                )}
                            </div>


                            {/* Upload Photo in Edit Mode */}
                            {isEditing && (
                                <div>
                                    <label className="db mb2">Upload Profile Photo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="pa2 w-100 ba b--black-20 br2"
                                    />
                                </div>
                            )}

                            {/* Profile Fields */}
                            {[
                                { label: "Full Name", name: "name" },
                                { label: "Date of Birth", name: "dob", type: "date" },
                                { label: "College", name: "college" },
                                { label: "University", name: "university" },
                                { label: "Location", name: "location" },
                                { label: "Department", name: "department" },
                                { label: "Degree", name: "degree" },
                                { label: "Course", name: "course" },
                                { label: "Year", name: "year" },
                            ].map((field, index) => (
                                <div key={index}>
                                    <label className="db mb2">{field.label}</label>
                                    {isEditing ? (
                                        <input
                                            type={field.type || "text"}
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            className="pa2 w-100 ba b--black-20 br2"
                                        />
                                    ) : (
                                        <p className="pa2 w-100 ba b--black-20 br2 bg-light-gray">{profile[field.name]}</p>
                                    )}
                                </div>
                            ))}

                            {/* Buttons */}
                            <div className="flex justify-between mt3">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="pa2 bg-gray white br2 grow pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="pa2 bg-green white br2 grow pointer"
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="w-100 pa2 bg-blue white br2 grow pointer"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
