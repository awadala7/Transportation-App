import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(collection(db, "posts"));
        const posts = data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          date: doc.data().date ? doc.data().date.toDate() : new Date(), // Check if date field exists
          time: doc.data().time || "N/A" // If time field doesn't exist, set it to "N/A"
        }));
        setPostList(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setPostList(postList.filter(post => post.id !== id));
  };

  const filteredPostList = postList.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.postText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homePage">
      <input
        type="text"
        id="searchInput1"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredPostList.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1>
              <p>{post.name}</p>
              <p>Date: {post.date.toLocaleDateString()}</p>
              <p>Time: {post.time}</p> {/* Display time */}
            </div>
            <div className="deletePost">
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button onClick={() => deletePost(post.id)}>&#128465;</button>
              )}
            </div>
          </div>
          <div className="postTextContainer">{post.postText}</div>
          <h3>@{post.author.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Home;
