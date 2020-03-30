import React, {useState, Fragment, useEffect} from 'react';
import axios from 'axios';

function PostForm({addPost, editingPost}){
  // Loading boolean
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({title: '', body: ''});
  const [errors, setErrors] = useState({});

  // Each time the editingPost prop changes this useEffect will run.
  useEffect(() => {
    setPost(editingPost)
  }, [editingPost]);

  // This onChange updates the name and value for each property.
  const onChange = (event) => {
    // ... = Spread Operator
    setPost({...post, [event.target.name]: event.target.value});
  };

  function validateForm() {
    const tempErrors = {};
    if(post.title.trim() === ''){
      tempErrors.title = 'Title must not be empty';
    }
    if (post.body.trim() === ''){
      tempErrors.body = 'Body must not be empty';
    }

    // if the fields are empty set the error msg to the state
    if(Object.keys(tempErrors).length > 0){
      setErrors(tempErrors);
      return false;
    } else{
      return true;
    }


  }

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // if the form is not valid
    if (!validateForm()){
      setLoading(false);
      return;
      // Will not continue with the rest of the code if true.
    }

    // If form is valid, leave state set to an empty object.
    setErrors({});

    if (post.id){
      axios.put(`/post/${post.id}`, post)
        .then(res => {
          // use addPost from Home page and send new post
          addPost(res.data);
          setPost({ title: '', body: ''}); // Reset field values to empty strings
          setLoading(false); // Turn off loading spinner
        })
        .catch(err => console.error(err));

    } else{
      axios.post('/post', post)
        .then(res => {
          // use addPost from Home page and send new post
          addPost(res.data);
          setPost({ title: '', body: ''}); // Reset field values to empty strings
          setLoading(false); // Turn off loading spinner
        })
        .catch(err => console.error(err));
    }
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
                   className={errors.title && 'invalid'}
            />
            <span className="helper-text">{errors.title}</span>
          </div>
          <div className="input-field">
            <label htmlFor="body">Body </label>
            <input type="text"
                   name={"body"}
                   value={post.body}
                   onChange={onChange}
                   // className={"validate"}
              className={errors.body && 'invalid'}
            />
            {/*the class name will change to invalid if the field is empty. Displaying the span.*/}
            <span className="helper-text">{errors.body}</span>
          </div>
          <button type={"submit"} className="waves-effect waves-light btn">
            {/*Javascript expression*/}
            {/*If post id is true then add update to btn, else put add to the btn*/}
            {post.id ? 'Update' : 'Add'}
          </button>
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