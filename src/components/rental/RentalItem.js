import React, { useState } from 'react';
import { DATABASE_MAIN } from '../contexts/api';
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import RentalAction from './RentalAction';

export const ActionInfo = (state) => {
  const { t } = useTranslation();
  if (state === "1") {
    return t("rentRENTED");
  } else {
    return t("rentFREE");
  }
};

const RentalItem = (props) => {
  const { t } = useTranslation();
  const [actionIsShown,setActionIsShown] = useState(false);

  const onShowActionHandler = () => {setActionIsShown(true);};
  const onCloseActionHandler = () => {setActionIsShown(false); props.onAction(props.sourceItem.state)};

  return (
    <div className="card col-md-3">
      <div className="bg-primary text-white text-center align-center mt-2">
        {t("position")}: {props.sourceItem.place}
      </div>
      <img
        className="rounded mx-auto p-2"
        src={`${DATABASE_MAIN}rentalImage.php?id=${props.sourceItem.id}`}
        alt={props.sourceItem.name}
      />
      <div className="card-header bg-primary bg-opacity-75">
        <h2 className="card-title anton text-center text-light">{props.sourceItem.name}</h2>
        <p className="card-text">{props.sourceItem.description}</p>
      </div>
      <div className="card-body">
        <div className="card-text">{props.sourceItem.rentier}</div>
        <div className="card-text">{props.sourceItem.fromDate} - {props.sourceItem.toDate}</div>
        <div className="card-text">{t("lastTime")}: {props.sourceItem.lastRentier}</div>
      </div>
      <div className="card-body mx-auto">
        <button className="btn btn-primary" onClick={onShowActionHandler}>
          {ActionInfo(props.sourceItem.state)}
        </button>
      </div>
      {actionIsShown && <RentalAction item={props.sourceItem} onClose={onCloseActionHandler} />}
    </div>
  );
};

export default RentalItem;
