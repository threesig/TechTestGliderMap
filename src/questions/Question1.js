import React, { useState, useEffect } from 'react';

export default function Question1 (props) {
  // Situation: The TestForm component was written by a junior developer who needs some help getting it to function.
  // Please modify the TestForm component such that it will correctly use hooks to validate and post to the endpoint.
  // Feel free to use any (or no) external libraries you feel appropriate.
  // Endpoint docs: https://jsonplaceholder.typicode.com/guide/


  const [state, setState] = useState({
    title: '',
    body: '',
    userId: 1337,
    errormessage: '' // I am knowingly setting this to blank.  As Title is defaulted to '', technically this SHOULD be "You need to enter a title!".  I'm setting the side effect handle that.
  });
  const {title, body, userId, errormessage} = state;


  useEffect(() => {
    setStateVar('errormessage', title.length ? '' : 'You need to enter a title!');
  }, [title]);


  const setStateVar = (name, value) => {
    const newState = Object.assign({}, state);
    newState[name] = value;

    setState(newState);
  }


  const handleInputChange = e => {
    setStateVar(e.target.name, e.target.value);
  }


  const handleSubmit = e => {
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts',{
      method: 'post',
      data: JSON.toString({
        title,
        body,
        userId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => console.log(json))
  }



  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          Title:
        </div>
        <input name="title" defaultValue={title} onInput={handleInputChange}/>
      </div>

      <div>
        <div>
          Body:
        </div>
        <input name="body" defaultValue={body} onInput={handleInputChange}/>
      </div>

      <div>
        <div>
          UserId:
        </div>
        <select name="userId" defaultValue={userId} onInput={handleInputChange}>
          <option>1337</option>
          <option>1234</option>
          <option>1066</option>
        </select>
      </div>

      {errormessage && <div>{errormessage}</div>}

      <button type="submit" style={{margin: 10}} disabled={errormessage.length}>Submit</button>
    </form>

  )
}
