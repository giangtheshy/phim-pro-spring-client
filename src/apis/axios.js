import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://phim-pro-spring.herokuapp.com/api/v1"
      : "http://localhost:8080/api/v1",
});
