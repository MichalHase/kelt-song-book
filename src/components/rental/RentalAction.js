import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import DatePicker from "react-datepicker";
import { ActionInfo } from "./RentalItem";
import { DATABASE_MAIN } from "../contexts/api";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import "react-datepicker/dist/react-datepicker.css";

const RentalAction = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const { t } = useTranslation();
  const [isDateShow, setIsDateShow] = useState(false);

  const [rentier, setRentier] = useState("");
  const [fromDate, setFromDate] = useState(new Date(props.item.fromDate));
  const [toDate, setToDate] = useState(new Date(props.item.toDate));
  const [actionState, setActionState] = useState(props.item.state);
  const [actionStateName, setActionStateName] = useState(t("rent"));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [state, setState] = useState("");
  const [lastRentier, setLastRentier] = useState("");

  useEffect(() => {
    if (props.item.state === "0") {
      setActionState("1");
      setActionStateName(t("rent"));
    } else {
      setActionState("0");
      setActionStateName(t("back"));
    }
  }, [props.item.state, t]);

  const submitHandler = (event) => {
    event.preventDefault();
    let item = {};
    let canSave = false;
    let canAdd = false;
    let canSaveEvent = false;

    if (isEdit) {
      item = {
        id: props.item.id,
        state: state,
        rentier: rentier,
        lastRentier: lastRentier,
        place: place,
        name: name,
        description: description,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      };
      
      if (!isAdd)
        canSave = true;
      else
        canAdd = true;
    }

    if (!isEdit && actionState === "1") {
      if (rentier.trim().length > 0 && 
          fromDate.toISOString().trim().length > 0 && 
          toDate.toISOString().trim().length > 0) {
          if (!isDateShow){
            item = {
              id: props.item.id,
              state: actionState,
              rentier: rentier,
              lastRentier: props.item.lastRentier,
              place: props.item.place,
              name: props.item.name,
              description: props.item.description,
              fromDate: new Date(),
              //toDate: props.item.toDate,
              toDate: new Date(),
            };}
          else {
            item = {
              id: props.item.id,
              state: actionState,
              rentier: rentier,
              lastRentier: props.item.lastRentier,
              place: props.item.place,
              name: props.item.name,
              description: props.item.description,
              fromDate: fromDate.toISOString(),
              toDate: toDate.toISOString(),
            };}
        canSave = true;
      }
    }

    if (!isEdit && actionState === "0") {
      if (!isDateShow) {
        item = {
          id: props.item.id,
          state: actionState,
          rentier: "",
          lastRentier: props.item.rentier,
          place: props.item.place,
          name: props.item.name,
          description: props.item.description,
          fromDate: props.item.fromDate,
          toDate: new Date(),
        };}
      else {
      item = {
        id: props.item.id,
        state: actionState,
        rentier: "",
        lastRentier: props.item.rentier,
        place: props.item.place,
        name: props.item.name,
        description: props.item.description,
        //fromDate: props.item.fromDate,
        //toDate: props.item.toDate,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      };}
      canSave = true;
      canSaveEvent = true;
    }

    if (canSave) {
      //console.log(JSON.stringify(item));
      updateItem(item);
      props.onClose();
    }
    
    if (canAdd) {
      console.log(JSON.stringify(item));
      addItem(item);
      props.onClose();
    }

    if (canSaveEvent){
      console.log(JSON.stringify(item));
      addEvent(item);
      props.onClose();
    }
  };

  async function updateItem(rentAction) {
    await fetch(`${DATABASE_MAIN}/updateRentalItem.php`, {
      method: "POST",
      body: JSON.stringify(rentAction),
      /* headers: {
        "content-type": "application/json",
      }, */
      mode: 'no-cors',
    }).catch((error) => console.log(error));

    //const res = await fetch('http://rental.oskelt.cz/items/update.php',{}
    //const data = await res.json().then(date=>console.log(date)).catch(error => console.log(error));
    //console.log(data);
  }

  async function addItem(rentAction) {
    await fetch(`${DATABASE_MAIN}/addRentalItem.php`, {
      method: "POST",
      body: JSON.stringify(rentAction),
      mode: 'no-cors',
    }).catch((error) => console.log(error));
  }

  async function addEvent(rentAction) {
    await fetch(`${DATABASE_MAIN}/addRentalEvent.php`, {
      method: "POST",
      body: JSON.stringify(rentAction),
      mode: 'no-cors',
    }).catch((error) => console.log(error));
  }

  const rentierChangeHandler = (event) => {
    setRentier(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const placeChangeHandler = (event) => {
    setPlace(event.target.value);
  };
  const stateChangeHandler = (event) => {
    setState(event.target.value);
  };
  const lastRentierChangeHandler = (event) => {
    setLastRentier(event.target.value);
  };

  const editHandler = () => {
    setIsEdit(true);
    setActionStateName(t("save"));
    setRentier(props.item.rentier);
    setName(props.item.name);
    setDescription(props.item.description);
    setPlace(props.item.place);
    setState(props.item.state);
    setLastRentier(props.item.lastRentier);
  };
  
  const addHandler = () => {
    setIsAdd(true);
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="row">
        <div className="col-sm">
          <h2 className="">{props.item.name}</h2>
          <h5>{t("rentState")}: {ActionInfo(props.item.state)}</h5>
        </div>
        <div className="col-sm">
          <img
            className="rounded mx-auto p-2"
            src={`${DATABASE_MAIN}/rentalImage.php?id=${props.item.id}`}
            alt={props.item.name}
          />
        </div>
      </div>
      <form onSubmit={submitHandler} className="was-validated">
        <div className="form-floating mb-3 mt-3 needs-validation">
        {(actionState === "1") && <input
            type="text"
            className="form-control"
            id="rentier"
            placeholder="Enter Rentier"
            name="rentier"
            value={rentier}
            onChange={rentierChangeHandler}
            required
          />}
        {(actionState === "0") && <input
            type="text"
            className="form-control"
            id="rentier"
            placeholder="Enter Rentier"
            name="rentier"
            value={rentier}
            onChange={rentierChangeHandler}
          />}
          <label htmlFor="rentier">{t("rentier")}</label>
          <div className="invalid-feedback">{t("rentValid")}</div>
        </div>
        <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="showPlainText"
              checked={isDateShow}
              onChange={(item) => {setIsDateShow(item.target.checked)}}
              placeholder={t("rentalDateShow")}
            />
            <label className="form-check-label" htmlFor="showPlainText">{t("rentalDateShow")}</label>
          </div>
        {isDateShow && <div className="form-floating mb-3 mt-3">
          <DatePicker
            className="form-control pb-3 pt-3"
            name="from"
            placeholderText={t("from")}
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
          />
          {/* <label htmlFor="from">{t("from")}:</label> */}
        </div>}
        {isDateShow && <div>
          <DatePicker
            className="form-control pb-3 pt-3"
            name="to"
            placeholderText={t("to")}
            selected={toDate}
            onChange={(date) => setToDate(date)}
          />
          {/* <label htmlFor="to">{t("to")}:</label> */}
        </div>}

        {isEdit && (
          <div>
            <div className="form-floating mb-3 mt-3">
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={nameChangeHandler}
              />
              <label htmlFor="name">{t("rentName")}</label>
            </div>
            <div className="form-floating mb-3 mt-3">
              <input
                id="description"
                type="text"
                className="form-control"
                value={description}
                onChange={descriptionChangeHandler}
              />
              <label htmlFor="description">{t("rentDescription")}</label>
            </div>
            <div className="form-floating mb-3 mt-3">
              <input
                id="place"
                type="text"
                className="form-control"
                value={place}
                onChange={placeChangeHandler}
              />
              <label htmlFor="place">{t("rentPlace")}</label>
            </div>
            <div className="form-floating mb-3 mt-3">
              <select name="state" id="state" className="form-control" selected={state} value={state} onChange={stateChangeHandler}>
                <option value="1">{t("rentRENTED")}</option>
                <option value="0">{t("rentFREE")}</option>
              </select>
              <label htmlFor="state">{t("rentState")}</label>
            </div>
            <div className="form-floating mb-3 mt-3">
              <input
                id="lastRentier"
                type="text"
                className="form-control"
                value={lastRentier}
                onChange={lastRentierChangeHandler}
              />
              <label htmlFor="lastRentier">{t("rentLastRentier")}</label>
            </div>
          </div>
        )}
        <div className="row justify-content-md-center">
          <div className="col-md-auto" >
            {!isEdit && <button className="btn btn-outline-primary" onClick={editHandler}>{t("edit")}</button>}
            {isEdit && <button className="btn btn-outline-primary" onClick={addHandler}>{t("add")}</button>}
            <button className="btn btn-outline-primary">{actionStateName}</button>
            <button className="btn btn-outline-primary" type="submit" onClick={props.onClose}>{t("close")}</button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default RentalAction;
