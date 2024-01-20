import { createContext, useState } from "react";
import trackList from "../assets/trackList.js";

const defaultSong = trackList[0];
const audio = new Audio(defaultSong.src);
audio.volume = 0.1;

export const AudioContext = createContext({});

const AudioProvider = ({ children }) => {
	const [currentSong, setCurrentSong] = useState(trackList[0])
	const [isPlaying, setPlaying] = useState(false);

	const handleToggleAudio = (song) => {
		if(currentSong.id !== song.id) {
			setCurrentSong(song);
			setPlaying(true);

			audio.src = song.src;
			audio.currentTime = 0;
			audio.play();

			return;
		}

		if(isPlaying) {
			audio.pause();
			setPlaying(false);
		} else {
			audio.play();
			setPlaying(true);
		}
	};

	const handleNextSong = () => {
		const currentIndex = trackList.findIndex((song) => song.id === currentSong.id);
		const nextIndex = (currentIndex + 1) % trackList.length;
		setCurrentSong(trackList[nextIndex]);
		setPlaying(true);

		audio.src = trackList[nextIndex].src;
		audio.currentTime = 0;
		audio.play();
	}

	const handlePreviousSong = () => {
		const currentIndex = trackList.findIndex((song) => song.id === currentSong.id);
		const previousIndex = (currentIndex - 1 + trackList.length) % trackList.length;
		setCurrentSong(trackList[previousIndex]);
		setPlaying(true);

		audio.src = trackList[previousIndex].src;
		audio.currentTime = 0;
		audio.play();
	}

	const value = { audio, currentSong, isPlaying, handleToggleAudio, handleNextSong, handlePreviousSong };

	return(
		<AudioContext.Provider value={value}>{children}</AudioContext.Provider>
	);
};

export default AudioProvider