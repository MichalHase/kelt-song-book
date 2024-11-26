//import cronicleImage from "../../assets/head_cronic.png";
//import { useTranslation } from "react-i18next";
import "../localization/i18n";
import CronicleEditor from "../cronicle/CronicleEdit";
import { useParams } from "react-router-dom";

const Cronicle = () => {
  //const { t } = useTranslation();
  const params = useParams();
  return (
    <div id="home" className="container-fluid-sm pt-5">
      <div className="row navbar-nav bg-light p-2">
        <div className="text-center">
          <h2>Duležité pravidla</h2>
          <p>Prosím dodržujte tato pravidla, kdyby se něco nedařilo raději volejte.</p>
          <ul>
            <li>Maximalně 2 obrázky o rozměrech (320x250px)</li>
            <li>Přimeřený text, jedná se pouze o vzpomínku, ne romám :)</li>
            <li>H1 az H6 jsou nadpisy. Pouzivejte pouze H1 a H3.</li>
            <li>Pracuje se s tímto editorem skoro jako s Wordem</li>
            <li>Při kopírovaní z Wordu, kopírujete jenom text, né styly.</li>
            <li>Toho rámečku podtím si nevšímejte, ten je hlavně pro mě:)</li>
          </ul>
        </div>
      {/* <img src={cronicleImage} alt={t("cronicle")} className="w-100" /> */}
      </div>
      <CronicleEditor id={params.cronicleId} />
    </div>
  );
};

export default Cronicle;
