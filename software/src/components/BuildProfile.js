import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BuildProfile() {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        interests: [],
        college: "",
        university: "",
        location: "",
        department: "",
        degree: "",
        course: "",
        year: "",
    });
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // List of selectable interest tags
    const interestOptions = [
        "Sports", "Studies", "Dance", "Music", "Events", "Technology",
        "Workshops", "Health", "Social", "Gaming", "Hackathons", "Coding",
        "Startups", "Internships", "Debates", "Public Speaking", "Art",
        "Photography", "Theater", "Volunteering", "Book Club", "Fitness",
        "Yoga", "Trekking", "Cycling", "Swimming", "Football", "Cricket",
        "Basketball", "Badminton", "Table Tennis", "Chess", "Poetry", "Writing",
        "Film Club", "Entrepreneurship", "Investment", "Psychology",
        "Mindfulness", "Self-Development"
    ];

    // Handle text input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle image upload
    const handlePhotoUpload = (e) => {
        setPhoto(e.target.files[0]);
    };

    // Handle selection of interests
    const handleInterestToggle = (interest) => {
        setFormData((prevState) => {
            const updatedInterests = prevState.interests.includes(interest)
                ? prevState.interests.filter((i) => i !== interest) // Remove if exists
                : [...prevState.interests, interest]; // Add if not exists
            return { ...prevState, interests: updatedInterests };
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Ensure required fields are filled
        if (
            !formData.name ||
            !formData.dob ||
            formData.interests.length === 0 ||
            !formData.college ||
            !formData.university ||
            !formData.location ||
            !formData.department ||
            !formData.degree ||
            !formData.course ||
            !formData.year
        ) {
            setError("All fields except photo are required!");
            return;
        }

        try {
            const profileData = new FormData();
            Object.keys(formData).forEach((key) =>
                profileData.append(key, JSON.stringify(formData[key]))
            );
            if (photo) profileData.append("photo", photo);

            const response = await axios.post("http://127.0.0.1:5000/build-profile", profileData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                setSuccess("Profile created successfully! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.error || "Profile submission failed!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Build Your Profile</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Upload Photo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Photo (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="mt-1 p-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Interests Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {interestOptions.map((interest, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`px-3 py-2 border rounded-lg text-sm font-medium transition ${formData.interests.includes(interest)
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                                        }`}
                                    onClick={() => handleInterestToggle(interest)}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Other Input Fields */}
                    {["college", "university", "location", "department", "degree", "course", "year"].map(
                        (field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace("_", " ")}</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        )
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        Submit Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
