import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-project-94947-default-rtdb.firebaseio.com",
});

export default instance;
