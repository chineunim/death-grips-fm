import { useContext, useState, useEffect } from "react";
import { AudioContext } from "../../context/AudioContext.jsx";
import style from "./playbar.module.scss";
import { Slider, IconButton } from "@mui/material";
import { Pause, PlayArrow, VolumeMute, VolumeUp, SkipPrevious, SkipNext } from "@mui/icons-material";
import secToMMSS from "../../utilities/secToMMSS"

const Playbar = () => {
	const { audio, currentSong, handleToggleAudio, isPlaying, handlePreviousSong, handleNextSong } = useContext(AudioContext);
	const { title, artist, cover, duration } = currentSong;
	
	const [currentTime, setCurrentTime] = useState(0);
	const [sliderTiming, setSliderTiming] = useState(0);
	const [volume, setVolume] = useState(10);
	const [isMobileVersion, setIsMobileVersion] = useState(false);

	const convertedDuration = isFinite(duration) ? secToMMSS(duration) : '0:00';
	const convertedCurrentTime = secToMMSS(Math.floor(currentTime));
	const titleClass = title.length > 32 ? style.animatedTitle : style.title;
	const [isExpanded, setIsExpanded] = useState(false);

	const handleChangeCurrentTime = (_, value) => {
		const time = Math.floor((value / 100) * duration);
		setCurrentTime(time);
		audio.currentTime = time;
	}
	useEffect(() => {
			const timeInterval = setInterval(() => {
				setCurrentTime(audio.currentTime);
				setSliderTiming((audio.currentTime / duration) * 100);
		}, 1000);
		return () => clearInterval(timeInterval);
	}, [audio.currentTime], duration);

	const handleChangeVolume = (_, value) => {
    setVolume(value);
    audio.volume = value / 100;
		if(isPlaying){
			audio.play();
		}
  }

	const handleSongEnds = () => {
		handleNextSong();
	}
	useEffect(() => {
		audio.addEventListener("ended", handleSongEnds);

		return () => {
			audio.removeEventListener("ended", handleSongEnds);
		};
	}, [audio, handleSongEnds]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobileVersion(window.innerWidth <= 430);
		};
		
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleClick = () => {
		console.log(isMobileVersion ? "mobile version" : "desktop version");

		if(isMobileVersion){
			setIsExpanded(true)
		}
	};

	const handleButtonClick = (e) => {
		e.stopPropagation();
	}

	const handleCloseButtonClick = (e) => {
		e.stopPropagation();
    setIsExpanded(false);
  };

	return (
		<div className={`${style.playbar} ${isExpanded ? style.expanded : style.notExpanded}`} onClick={handleClick}>
			<img className={style.cover}
			 src={cover} alt="" />

			<div className={style.controlButtons}>
				<IconButton onClick={(e) => {handlePreviousSong();
				handleButtonClick(e)}}>
					<SkipPrevious />
				</IconButton>
				<IconButton onClick={(e) =>{handleButtonClick(e);
					handleToggleAudio(currentSong)}}>
					{isPlaying ? <Pause /> : <PlayArrow />}
				</IconButton>
				<IconButton onClick={(e) => {handleNextSong();
				handleButtonClick(e)}}>
					<SkipNext />
				</IconButton>
			</div>

			<div className={style.credits}>
				<h4 className={titleClass}>{title}</h4>
				<p>{artist}</p>
			</div>
			<div className={style.durationSlider}>
				<p>{convertedCurrentTime}</p>
					<Slider step={1} min={0} max={100}
					value={sliderTiming}
					onChange={handleChangeCurrentTime}/>
				<p>{convertedDuration}</p>
			</div>
			<div className={style.volumeSlider}>
				<VolumeMute />
				<Slider className={style.volume}
				step={0.3} min={0} max={30}
				value={volume}
				onChange={handleChangeVolume} />
				<VolumeUp />
			</div>

			{isMobileVersion && isExpanded && (
				<div className={style.closeButton} onClick={handleCloseButtonClick}>
        	Close
				</div>
      )}
		</div>
	)
};

export default Playbar;