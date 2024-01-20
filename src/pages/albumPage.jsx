import { useParams } from "react-router-dom";
import albumList from "../assets/albumList";
import style from "./albumPage.module.scss";
import Song from "../components/song/song";

const Album = () => {
	const { id } = useParams();
	const album = albumList.find((album) => album.id === Number(id));

	if(!album){
		return <div>Album not found</div>
	}

	return(
			<div className={style.list}>
				{album.tracks.map((song) => (
					<Song key={song.id} {... song} />
				))}
			</div>
	)
}

export default Album;