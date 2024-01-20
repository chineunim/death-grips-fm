import { Link } from "react-router-dom";
import albumList from "../assets/albumList.js";
import style from "./mainPage.module.scss";
import folder from "../assets/folderIcon.png"

const MainPage = () => {
	return(
		<div className={style.list}>
			{albumList.map((album) => (
				<Link className={style.link} key={album.id} to={`/album/${album.id}`}>
					<div className={style.album}>
						<div>
							<img className={style.folder} src={folder} alt="" />
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