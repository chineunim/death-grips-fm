import moment from "moment";

export default (sec) => moment.utc(sec * 1000).format("mm:ss");