import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar'; // Import the Calendar component
import 'react-calendar/dist/Calendar.css'; // Import the Calendar CSS

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [postText, setPostText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const [selectedTime, setSelectedTime] = useState(""); // State for selected time
  const [error, setError] = useState(""); // State for error message

  const postsCollectionRef = collection(db, "posts");
  const navigate = useNavigate();

  const createPost = async () => {
    // Check if any required field is empty
    if (!title || !name || !selectedDate || !selectedTime || !postText) {
      setError("Please fill in all required fields.");
      return;
    }

    // If all fields are filled, proceed to create the post
    await addDoc(postsCollectionRef, {
      title,
      name,
      postText,
      date: selectedDate, // Include selected date in the post
      time: selectedTime, // Include selected time in the post
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    setTitle("");
    setName("");
    setPostText("");
    setSelectedDate(new Date()); // Reset selected date
    setSelectedTime(""); // Reset selected time
    setError(""); // Clear error message
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Post a Ride</h1>
        <div className="inputGp">
          <label>Fullname:</label>
          <input
            placeholder="Full Name"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Contact:</label>
          <input
            placeholder="Email/Phone Number"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Date:</label>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </div>
        <div className="inputGp">
          <label>Time:</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(event) => setSelectedTime(event.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            value={postText}
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
