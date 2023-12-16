import { useRef, useState } from "react";

export default function Login() {
  const [enteredValues, set_enteredValues] = useState({
    email: "",
    pass: "",
  });
  const [didEdit, set_didEdit] = useState({
    email: false,
    pass: false,
  });
  console.log(enteredValues);

  const email_is_Invalid = didEdit.email && !enteredValues.email.includes('@');
  console.log(email_is_Invalid);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(enteredValues);
  }

  function stroke(e,konsa) {
    set_enteredValues(prevState=>({
        ...prevState,
        [e.target.getAttribute("identity")] : e.target.value
    }));
    set_didEdit(prevState=>({
        ...prevState,
        [e.target.getAttribute("identity")] : false
    }));
  }

  function handle_input_blur(e){
      set_didEdit(prevState=>({
          ...prevState,
          [e.target.getAttribute("identity")] : true
      }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" 
          onChange={e=>stroke(e,'email')}
          identity="email"
          onBlur={handle_input_blur}
          />
          <div className="control-error">{email_is_Invalid && <p>Please Enter a valid email</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" 
                onChange={e=>stroke(e,'pass')} 
                identity="pass"
                onBlur={handle_input_blur}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
