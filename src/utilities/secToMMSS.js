export default (sec) => {
	const minutes = Math.floor(sec / 60);
	const seconds = sec % 60;
	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(seconds).padStart(2, "0");
	return `${formattedMinutes}:${formattedSeconds}`;
  };