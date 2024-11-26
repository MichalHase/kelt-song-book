//import cronicleImage from "../../assets/head_cronic.png";
//import { useTranslation } from "react-i18next";
import "../localization/i18n";
import { useParams } from "react-router-dom";
import SongBookEditor from "../songbook/SongBookEditor";
import SongBookList from "../songbook/SongBookList";

const SongBook = () => {
  //const { t } = useTranslation();
  //<SongBookEditor id={params.cronicleId} />
  const id = 1;
  const params = useParams();
  console.log(params.cronicleId);
  return (
    <div id="home" className="container-fluid-sm pt-5">
      <div className="row navbar-nav bg-light p-2">
        <div className="text-center">
          <a className="col-md btn btn-danger m-1" href="https://www.oskelt.cz/docs/Prihlaska.pdf" target="new">
            <div className="bi bi-journal fa-4x" /> Červená
          </a>
          <a className="col-md btn btn-warning m-1" href="https://www.oskelt.cz/docs/Prihlaska.pdf" target="new">
            <div className="bi bi-journal fa-4x" /> Žlutá
          </a>
        </div>
      </div>
      <SongBookList/>
      <SongBookEditor id={id} />
    </div>
  );
};

export default SongBook;
