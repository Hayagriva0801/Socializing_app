import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BuildProfile() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // Store email from localStorage
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

    // ✅ Fetch registered user email from localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail"); // Retrieve email
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            navigate("/login"); // Redirect if no email is found
        }
    }, [navigate]);

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

    // Handle input changes
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
                ? prevState.interests.filter((i) => i !== interest)
                : [...prevState.interests, interest];
            return { ...prevState, interests: updatedInterests };
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !formData.name || !formData.dob || formData.interests.length === 0 ||
            !formData.college || !formData.university || !formData.location ||
            !formData.department || !formData.degree || !formData.course || !formData.year) {
            setError("All fields except photo are required!");
            return;
        }

        try {
            const profileData = new FormData();
            profileData.append("email", email); // ✅ Attach the user's email
            Object.keys(formData).forEach((key) =>
                profileData.append(key, JSON.stringify(formData[key]))
            );
            if (photo) profileData.append("photo", photo);

            const response = await axios.post("http://127.0.0.1:5000/build-profile", profileData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                setSuccess("Profile saved successfully! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.error || "Profile submission failed!");
        }
    };

    return (
        <div className="w-100 min-vh-100 bg-light-gray flex justify-center items-center">
            <div className="shadow-5 pa4 bg-white br3 w-40">
                <h2 className="f3 text-center">Build Your Profile</h2>
                {error && <p className="red tc">{error}</p>}
                {success && <p className="green tc">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-3">

                    {/* Name */}
                    <div>
                        <label className="db mb2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="pa2 w-100 ba b--black-20 br2"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="db mb2">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="pa2 w-100 ba b--black-20 br2"
                            required
                        />
                    </div>

                    {/* Upload Photo */}
                    <div>
                        <label className="db mb2">Upload Photo (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="pa2 w-100 ba b--black-20 br2"
                        />
                    </div>

                    {/* Interests Selection */}
                    <div>
                        <label className="db mb2">Select Areas of Interest</label>
                        <div className="flex flex-wrap">
                            {interestOptions.map((interest) => (
                                <button
                                    key={interest}
                                    type="button"
                                    className={`mr2 mb2 pa2 br2 ${formData.interests.includes(interest)
                                        ? "bg-blue white"
                                        : "bg-light-gray"}`}
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
                                <label className="db mb2 capitalize">{field.replace("_", " ")}</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="pa2 w-100 ba b--black-20 br2"
                                    required
                                />
                            </div>
                        )
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt3 w-100 pa2 bg-blue white br2 grow pointer"
                    >
                        Submit Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
