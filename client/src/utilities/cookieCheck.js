import Cookies from "universal-cookie";

const cookieFunction = () => {
  const cookies = new Cookies();
  const cookie_present = cookies.get("access_token");
  let cookie_check = {};
  if (cookie_present !== undefined) {
    cookie_check.cookie = true;
    cookie_check.token = cookie_present;
    return cookie_check;
  } else {
    cookie_check.cookie = false;
    cookie_check.token = "";
    return cookie_check;
  }
};

export default cookieFunction;
