const currentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};
export default currentUser;
