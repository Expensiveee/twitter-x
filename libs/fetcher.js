import axios from "axios";

const fetcher = (url) => axios.get(`/api/${url}`).then((res) => res.data);

export default fetcher;
