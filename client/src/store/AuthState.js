import axios from "axios";
import { setUser } from "./slices/authSlice";
export const GetAuthState = async (dispatch) => {
  try {
    const user = await axios.get("/profile", { withCredentials: true });
    console.log(user, "Authstae");
    if (user.data) {
      dispatch(setUser(user.data));
    }
  } catch (error) {
    console.log(error);
  }
};
