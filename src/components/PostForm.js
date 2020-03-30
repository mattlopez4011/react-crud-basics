import React, { useState, Fragment } from 'react';
import axios from 'axios';

function PostForm(props){
  // Loading boolean
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({title: '', body: ''});

  // This onChange updates the name and value for each property.
  const onChange = (event) => {
    // ... = Spread Operator
    setPost({...post, [event.target.name]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios.post('/post', post)
      .then(res => {
        // use addPost from Home page and send new post
        props.addPost(res.data);
        setPost({ title: '', body: ''}); // Reset field values to empty strings
        setLoading(false); // Turn off loading spinner
      })
      .catch(err => console.error(err));
  };

  return (
    // Fragment is just a wrapper
    <Fragment>
      {!loading ? (
        <form className={"push-in"} onSubmit={onSubmit} >
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text"
                   name={"title"}
                   value={post.title}
                   onChange={onChange}
                   className={"validate"}
            />
          </div>
          <div className="input-field">
            <label htmlFor="body">Body </label>
            <input type="text"
                   name={"body"}
                   value={post.body}
                   onChange={onChange}
                   className={"validate"}
            />
          </div>
          <button type={"submit"} className="waves-effect waves-light btn">Add</button>
        </form>

      ) : (
        <div className="progress">
          {/*Materialize will replace this with a loading bar.*/}
          <div className="indeterminate"></div>
        </div>
      )}
    </Fragment>
  )
}

export default PostForm;