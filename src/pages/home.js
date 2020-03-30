import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../components/PostForm';

const Home = () => {
  // Array Destructuring
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [editingPost, setEditingPost] = useState({
    title: '',
    body: '',
    id: null
  });

  // useEffect Hook
  // axios retrieves the posts from the Api
  useEffect(() => {
    axios.get('/posts')
      .then(res => {
        console.log(res.data);
        setPosts(res.data)
      })
      .catch(err => console.error(err));
  }, []); // deps: empty array means it will fetch posts once.

  function editPost(post){
    setEditingPost(post)
  }

  function deletePost(id){
    axios.delete(`/post/${id}`)
      .then(() => {
        // Removes deleted post from array of posts.
        const postsUpdated = posts.filter(p => p.id !== id);
        setPosts(postsUpdated);
      })
      .catch(err => console.error(err));
  }

  function addPost(post){
    if (posts.find(p => p.id === post.id)){
      // Find index for post we would like to edit
      const index = posts.findIndex(p => p.id === post.id);
      // Remove post and add edited version to posts array
      const postsUpdated = [...posts]; // all posts
      postsUpdated.splice(index, 1, post ); // remove this index, remove 1, replace with new post
      setPosts(postsUpdated); // Set state of new array
    } else {
      const postsUpdated = [post, ...posts]; // [new post, ...existing posts]
      setPosts(postsUpdated);
    }


  }

  const getNumberOfPosts = () => {
    axios.get(`/posts/${limit}`)
      .then(res =>
      // Adds all the posts to the state
        setPosts(res.data)
      )
      .catch(err => console.error(err));
  };
// Test
  return (
    <div>
        <div className="row">
          <div className="col s6">
            <PostForm addPost={addPost} editingPost={editingPost}/>
          </div>
          <div className="col s3 push-in">
            <p>Limit number of posts</p>
            <input type="number"
              value={limit}
              onChange={event => setLimit(event.target.value)}
            />
            <button onClick={getNumberOfPosts} className="waves-effect waves-light btn">Set</button>
          </div>
        </div>
      <div className="row">
        {posts.map(post => (
          <div className="col s6" key={post.id}>
          <div className="card">
            <div className="card-content">
              <div className="card-title">
                {post.title}
              </div>
              <p className="timestamp">
                {post.createdAt}
              </p>
              <p>{post.body}</p>
            </div>
            <div className="card-action">
              {/*.bind: on the page load the edit function will be sent null(We don't want the function to run on load), once the edit btn is clicked the editPost function will be sent the post to edit*/}
              <a href="#" onClick={editPost.bind(null, post)} >Edit</a>
              <a href="#" onClick={deletePost.bind(null, post.id)} className={"delete-btn"}>Delete</a>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;