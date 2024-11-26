import React, { useState, useEffect } from "react";
import { DATABASE_MAIN } from "../contexts/api";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import "../localization/i18n";

const ActionEdit = (props) => {
  const { t } = useTranslation();
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedOrderFile, setSelectedOrderFile] = useState(null);

  const [id, setId] = useState(0);
  const [descriptionShow, setDecriptionShow] = useState(false);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [actionsCtx, setActionsCtx] = useState();  

  const saveAction = (data) => {
    let actionType = "updateAction.php";

    if (data.id === 0) {
      actionType = "addAction.php";
    }

    if (selectedImageFile) {
      const dataArray = new FormData();
      dataArray.append("file", selectedImageFile[0]);
      dataArray.append("id", id);

      fetch(`${DATABASE_MAIN}addActionImage.php`, {
        method: "POST",
        body: dataArray,
        /*headers: { "Content-Type": "multipart/form-data", },*/
        mode: "no-cors",
      }).catch((error) => console.log(error));
    }

    if (selectedOrderFile) {
      const dataArray = new FormData();
      dataArray.append("file", selectedOrderFile[0]);
      dataArray.append("id", id);

      fetch(`${DATABASE_MAIN}addActionOrderFile.php`, {
        method: "POST",
        body: dataArray,
        mode: "no-cors",
      }).catch((error) => console.log(error));
    }

    fetch(`${DATABASE_MAIN}${actionType}`, {
      method: "POST",
      body: JSON.stringify(data),
      /*headers: { "Access-Control-Allow-Origin": "*","Content-Type": "multipart/form-data", },*/
      mode: "no-cors",
    }).catch((error) => console.log(error));
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (name.trim().length > 0) {
      const data = {
        id: id,
        name: name,
        place: place,
        text: text,
        price: price,
        fromDate: fromDate,
        toDate: toDate,
        descriptionShow: descriptionShow,
      };
      saveAction(data);
      props.updateHandler();
      setSelectedImageFile(null);
    }
    else{
      alert("Can not save!");
    }
  };

  useEffect(() => {
    setId(1);
  }, []);

  const onRadioClicked = (e) =>{
    setId(parseInt(e.target.id, 10));
  };

  useEffect(() => {
    if (id === 0){
      setName("");
      setPlace("");
      setText("");
      setPrice(0);
      setFromDate(new Date());
      setToDate(new Date());
      setDecriptionShow(true);
    }else{
      const temp = props.actions.find(item => parseInt(item.id, 10) === id)
      if (temp) {
        setName(temp.name);
        setPlace(temp.place);
        setText(temp.text);
        setPrice(temp.price);
        setFromDate(temp.fromDate);
        setToDate(temp.toDate);
        setDecriptionShow(temp.descriptionShow);
      }
    }
  }, [id, props.actions]);

  useEffect(() => {
    setActionsCtx(
      props.actions
        .map((item) => (
            <div key={"ac"+item.id} className="col-md">
              <input
                type="radio"
                name="actions"
                className="btn-check"
                id={item.id}
                onClick={onRadioClicked}
              />
              <label className="btn btn-outline-primary" htmlFor={item.id}>{item.name}</label>
            </div>
      )));
  }, [props.actions]);

  return (
      <div id="actionEditForm" className="p-1 mb-1 border rounded-2 shadow">
        <form id="file" onSubmit={submitForm}>
          <div className="row">
            {/* <div className="col-md">
              <input
                type="radio"
                name="actions"
                className="btn-check"
                id="0"
                onClick={onRadioClicked}
                disabled
              />
              <label className="btn btn-outline-primary" htmlFor="0">{t("new")}</label>
            </div> */}
            {actionsCtx}
          </div>

          <div className="mb-3">
            <label htmlFor="formImageFile" className="form-label">Obrázek o rozměrech 850x500</label>
            <input className="form-control" type="file" id="formImageFile" onChange={(e) => setSelectedImageFile(e.target.files)} />
          </div>

          <div className="mb-3">
            <label htmlFor="formOrderFile" className="form-label">PDF do 10MB</label>
            <input className="form-control" type="file" id="formOrderFile" onChange={(e) => setSelectedOrderFile(e.target.files)} />
          </div>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="showPlainText"
              checked={descriptionShow}
              onChange={(item) => {setDecriptionShow(item.target.checked)}}
              placeholder={t("showDecription")}
            />
            <label className="form-check-label" htmlFor="showPlainText">{t("showDecription")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(item) => setName(item.target.value)}
              placeholder={t("actionName")}
            />
            <label htmlFor="name">{t("actionName")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="place"
              value={place}
              onChange={(item) => setPlace(item.target.value)}
              placeholder={t("actionPlace")}
            />
            <label htmlFor="place">{t("actionPlace")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="text"
              value={text}
              onChange={(item) => setText(item.target.value)}
              placeholder={t("actionText")}
            />
            <label htmlFor="text">{t("actionText")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="price"
              value={price}
              onChange={(item) => setPrice(item.target.value)}
              placeholder={t("actionPrice")}
            />
            <label htmlFor="price">{t("actionPrice")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="date"
              className="form-control"
              id="from"
              name="from"
              value={fromDate}
              onChange={(item) => setFromDate(item.target.value)}
              placeholder={t("from")}
              required
            />
            <label htmlFor="from">{t("from")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="date"
              className="form-control"
              id="to"
              name="to"
              value={toDate}
              onChange={(item) => setToDate(item.target.value)}
              placeholder={t("to")}
              required
            />
            <label htmlFor="to">{t("to")}</label>
          </div>

          <button className="btn btn-primary">{t("save")}</button>
        </form>
      </div>
  );
};

export default ActionEdit;
