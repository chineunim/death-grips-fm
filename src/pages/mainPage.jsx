import { Link } from "react-router-dom";
import albumList from "../assets/albumList";
import style from "./mainPage.module.scss";

const MainPage = () => {
	return(
		<div className={style.list}>
			{albumList.map((album) => (
				<Link className={style.link} key={album.id} to={`/album/${album.id}`}>
					<div className={style.album}>
						<div>
							<img className={style.folder} src="./src/assets/folderIcon.png" alt="" />
							<img className={style.cover} src={album.cover} alt="" />
						</div>
						<b>{album.title}</b>
					</div>
				</Link>
			))}
		</div>
	)
}

export default MainPage;