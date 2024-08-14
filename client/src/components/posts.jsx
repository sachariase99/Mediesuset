import { useState, useEffect, useContext } from "react";
import { useSupabase } from "../supabase/supabaseClient";
import { FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../context/authContext";

const Posts = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const { supabase } = useSupabase();
  const { userEmail } = useContext(AuthContext); // Get userEmail from context

  // Fetch posts from the database
  const fetchPosts = async () => {
    try {
      // Fetch posts with related user profile images
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          profiles (
            image_url
          )
        `)
        .order("created_at", { ascending: false });
  
      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Fetch posts when the component mounts

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert("Content is required.");
      return;
    }

    try {
      // Insert new post into the database
      const { data, error } = await supabase
        .from("posts")
        .insert([{ content, email: userEmail }]); // Store the email

      if (error) {
        console.error("Error creating post:", error.message);
        alert("Error creating post. Please try again.");
      } else {
        setContent("");
        fetchPosts(); // Refresh the list of posts after a successful submission
        alert("Post created successfully!");
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
      alert("Error creating post. Please try again.");
    }
  };

  return (
    <div className="text-black my-8 max-w-[1200px] m-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center mb-8">
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="What is on your mind?"
          className="w-1/2 m-auto border p-2 px-4 box-border h-20 resize-none rounded-lg"
        />
        <button
          type="submit"
          className="absolute right-1/4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded mr-4"
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </form>

      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="py-4 px-4 mb-4 flex items-start gap-4 bg-white rounded-lg w-1/2 m-auto h-[10rem] relative">
              {/* User profile picture */}
              <img
                src={post.profiles?.image_url || "/path/to/default-image.png"} // Use a default image if not available
                alt="User profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-700">{post.content}</p>
                <p className="text-sm text-gray-500 absolute bottom-2 right-2">{new Date(post.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
