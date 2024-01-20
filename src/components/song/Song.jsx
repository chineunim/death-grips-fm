import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext.jsx";
import style from "./song.module.scss";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import secToMMSS from "../../utilities/secToMMSS";
import cn from "classnames";

const Song = (song) => {
	const { id, src, cover, artist, title, duration } = song;
	const { handleToggleAudio, currentSong, isPlaying } = useContext(AudioContext);
	const isCurrentSong = currentSong.id === song.id;
	const convertedDuration = secToMMSS(duration); 

	return(
		<div className={cn(style.song, isCurrentSong && style.playing)} onClick={() => handleToggleAudio(song)}>
			<IconButton className={style.play} onClick={() => handleToggleAudio(song)}>
				<div className={style.buttonContainer}>{isCurrentSong && isPlaying ? <Pause /> : <PlayArrow />}</div>
			</IconButton>
			<img className={style.cover} src={cover} alt="" />
			<div className={style.credits}>
				<b>{title}</b>
				<p>{artist}</p>
			</div>
			<p className={style.songDuration}>{convertedDuration}</p>
		</div>
	)
}

export default Song