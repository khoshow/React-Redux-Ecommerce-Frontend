import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {createOrUpdateUser} from "../../functions/auth.js"


const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        //   remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_RESULT",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: idTokenResult.token,
                _id: res.data._id,
              },
            });
          })
          .catch();
        // redux store
        console.log("user2", user, "idTokenResult", idTokenResult);
        // redirect
        history.push("/");
      }
    
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <br></br>
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create Password"
        autoFocus
        // Password: Password123
      />
      <br></br>

      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registration</h4>

          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
