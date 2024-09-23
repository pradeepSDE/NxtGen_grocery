import { removeUser } from "@/store/slices/authSlice";
import axios from "axios";

export  const handleSignOut = async (dispatch,navigate) => {
    try {
      const response = await axios.get("/logout", { withCredentials: true });
      console.log(response);
      if (response) {
        console.log(response);
        dispatch(removeUser());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };