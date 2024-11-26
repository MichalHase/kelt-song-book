import React, { useState, useEffect, Suspense, lazy } from "react";
//import Member from "./Member";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import {DATABASE_MAIN} from "../contexts/api";

const Member = lazy(()=> import("./Member"));

const MembersList = (props) => {
  const [membersAll, setMembersAll] = useState([]);
  const [showMembersAll, setShowMembersAll] = useState(false);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  async function fetchMembers() {
    setIsLoading(true);
    await fetch(`${DATABASE_MAIN}members.php`)
      .then((response) => {
        response.json().then((data) => {
          const trasformedRepository = data.map((rep) => {
            return {
              id: rep.id,
              nick: rep.nick,
              about: rep.about,
              moto: rep.moto,
              function: rep.function,
            };
          });
          return setMembersAll(
            trasformedRepository.map((item) => (
              <Member
                id={item.id}
                key={item.id}
                nick={item.nick}
                function={item.function}
                moto={item.moto}
                about={item.about}
                show={()=>{console.log("jupi")}}
              />
            ))
          );
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    setShowMembersAll(props.showAll);
  }, [props.showAll]);

  useEffect(() => {
    if (membersAll) {
      if (showMembersAll) {
        setMembers(membersAll);
      } else {
        const min = 0;
        const maxCount = 4;
        const max = membersAll.length-maxCount;
        const startRand = Math.floor(Math.random() * max) + min; //nahodné číslo
        let membersSel = [];
        for (var i = startRand; i < startRand+maxCount; i++) {
          membersSel.push(membersAll[i]);// čtyři po sobě nahodné osoby
        }
        setMembers(membersSel);
      }
    }
  }, [membersAll, showMembersAll]);

  const onButtonClicked = () => {
    setShowMembersAll(!showMembersAll);
    window.location.href="#members";
  };

  return (
    <div id="members" className="pt-5">
      <div className="navbar-nav bg-primary bg-opacity-75 p-3">
        <h2 className="text-light"><i className="bi bi-people"/> {t("members")}</h2>
        <p className="text-light">{t("membersMessage")}</p>
      </div>
      
      {isLoading && <div className="spinner-border text-info"></div>}

      <div className="container-fluid-md bg-light p-5">
        <div className="row">
          <Suspense fallback={<h1>Still Loading…</h1>}>
            {members}
          </Suspense>
        </div>
      </div>
      
      <div id="memberControls" className="text-center p-3">
        <button className="btn btn-outline-dark" onClick={onButtonClicked}>
          {showMembersAll ? t("hide") : t("showAll")}
        </button>
      </div>
    </div>
  );
};

export default MembersList;
