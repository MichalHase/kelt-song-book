import membersImage from "../../assets/head_cups.png";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import MemberList from "../members/MembersList";

const Members = () => {
  const { t } = useTranslation();
  return (
    <div id="home" className="container-fluid-sm bg-light pt-4">
      <div className="navbar-nav bg-light"></div>
      <div className="row">
        <img src={membersImage} alt={t("members")} className="w-100" />
      </div>
      <MemberList showAll={true} />
    </div>
  );
};

export default Members;
