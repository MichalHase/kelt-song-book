import React from "react";
import { DATABASE_MAIN } from "../contexts/api";
import "./profileCard.css";
import avatar from "../../assets/person.png";

const Member = (props) => {
  const colors = ["bg-warning", "bg-info", "bg-danger", "bg-success"];
  const startRand = Math.floor(Math.random() * 4); //nahodné číslo

  return (
    <div className="card col-md-3">
      <div className="profile-card mb-5">
        <div className="card-header bg-white border-0">
          <img
            className="card-img-top mt-1 rounded"
            src={`${DATABASE_MAIN}memberImage.php?nick=${props.nick}`}
            alt={props.nick}
            onError={(e)=>{e.target.src=avatar}}
            //onSuspend={(e)=>{console.log(e)}}
          />
          <div className="header-name">{props.function + " " + props.nick}</div>
          <h5 className="dancing">{props.moto}</h5>
        </div>

        <div className={"card-body " + colors[startRand]}>
          <div className="body-description">{props.about}</div>
        </div>
      </div>
    </div>
  );
};

export default Member;
