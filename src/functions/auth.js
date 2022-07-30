import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  console.log("Youi triggered me", process.env.REACT_APP_API);
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => { 
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};



export const currentAdmin = async (authtoken) => {
  console.log("Youi triggered me current Admin", process.env.REACT_APP_API);
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
