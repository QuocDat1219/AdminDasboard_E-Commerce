const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  // credentials: "same-origin",
  // withCredentials: true,
  // mode: "no-cors",
  headers: {
    // "Access-Control-Allow-Origin": "*",
    // "Content-Type": "application/json",
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
  },
};
