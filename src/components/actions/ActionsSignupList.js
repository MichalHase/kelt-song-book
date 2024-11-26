import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { DATABASE_MAIN } from "../contexts/api";
import "../localization/i18n";
import DataGrid from "react-data-grid";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import ReactExport from "react-export-excel";
import AuthContext from "../contexts/auth";

const ActionsSignupList = () => {
  const { t } = useTranslation();
  const authCtx = useContext(AuthContext);
  const [signupRows, setSignupRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPdf, setRowsPdf] = useState([]);
  const [actionNames, setActionsNames] = useState([]);
  const [actionYears, setActionsYears] = useState([]);

  const [year, setYear] = useState("all");
  const [name, setName] = useState("all");

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  useEffect(() => {
    let actionsSignupUrl = "actionsSignup.php";
    if (year) {
      actionsSignupUrl += "?year=" + year;
      if (name !== "all") {
        actionsSignupUrl += "&name=" + name;
      }
    }
    fetchActionsSignup(actionsSignupUrl);
  }, [year, name]);

  async function fetchActionsSignup(actionsSignupUrl) {
    setIsLoading(true);
    
    //await fetch(`${DATABASE_MAIN}actionsSignup.php?year=${year}&name=${name}`)
    await fetch(`${DATABASE_MAIN}${actionsSignupUrl}`)
      .then((response) => {
        response.json().then((data) => {
          const rows = data.map((rep) => {return [rep.actionName,
            rep.firstName,
            rep.lastName,
            rep.birthNumber,
            rep.tShirtSize,
            rep.address,
            rep.parentName,
            rep.parentPhone,
            rep.parentEmail,
            rep.note,]})
            setRowsPdf(rows);
          const action = data.map((rep) => {
            return {
              id: rep.id,
              created: rep.created,
              actionName: rep.actionName,
              actionYear: new Date(rep.actionFrom).getFullYear(),
              actionFrom: rep.actionFrom,
              actionTo: rep.actionTo,
              firstName: rep.firstName,
              lastName: rep.lastName,
              birthNumber: rep.birthNumber,
              tShirtSize: rep.tShirtSize,
              address: rep.address,
              parentName: rep.parentName,
              parentPhone: rep.parentPhone,
              parentEmail: rep.parentEmail,
              note: rep.note,
            };
          });
          setIsLoading(false);
          return setSignupRows(action);
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }
  useEffect(() => {

    const sorterAR = [];
    const sorterYR = [];
    signupRows.forEach((item) => {
      let name = sorterAR.find((cat) => cat.actionName === item.actionName);
      if (!name) {
        name = {
          id: item.id,
          actionName: item.actionName,
        };
        sorterAR.push(name);
      }
      let year = sorterYR.find((y) => y.actionYear === item.actionYear);
      if (!year) {
        year = {
          id: item.id,
          actionYear: item.actionYear,
        };
        sorterYR.push(year);
      }
    });

    //console.log(sorterYR);

    setActionsYears(
      sorterYR.map((item) => (
        <option key={item.id} value={item.actionYear}>{item.actionYear}</option>
      ))
    );

    setActionsNames(
      sorterAR.map((item) => (
        <option key={item.id} value={item.actionName}>{item.actionName}</option>
      ))
    );

  }, [signupRows]);
  
  /*async function fetchActionNames(actionsSignupUrl) {
    setIsLoading(true);
    
    //await fetch(`${DATABASE_MAIN}actionsSignup.php?year=${year}&name=${name}`)
    await fetch(`${DATABASE_MAIN}${actionsSignupUrl}`)
      .then((response) => {
        response.json().then((data) => {
          setActionsNames(
            data.map((item) => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))
          );
          setIsLoading(false);
          //return setSignupRows(action);
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }*/

  useEffect(() => {
    fetchActionsSignup("actionsSignup.php");
    //fetchActionNames("actions.php");
  }, []);

  class DownloadXLS extends React.Component {
    render() {
        return (
            <ExcelFile filename="SeznamDeti" element={<button className="btn btn-primary">{t("ExportToXLSX")}</button>}>
                <ExcelSheet data={signupRows} name="Employees">
                    <ExcelColumn label={t("actionName")} value="actionName"/>
                    <ExcelColumn label={t("firstName")} value="firstName"/>
                    <ExcelColumn label={t("lastName")} value="lastName"/>
                    <ExcelColumn label={t("birthNumber")} value="birthNumber"/>
                    <ExcelColumn label={t("tShirtSize")} value="tShirtSize"/>
                    <ExcelColumn label={t("address")} value="address"/>
                    <ExcelColumn label={t("parentName")} value="parentName"/>
                    <ExcelColumn label={t("parentPhone")} value="parentPhone"/>
                    <ExcelColumn label={t("parentEmail")} value="parentEmail"/>
                </ExcelSheet>
            </ExcelFile>
        );
     }
  }

  const columns = [
    //{ key: "created", name: t("created") },
    { key: "actionName", name: t("actionName") },
    { key: "firstName", name: t("firstName") },
    { key: "lastName", name: t("lastName") },
    { key: "birthNumber", name: t("birthNumber") },
    { key: "tShirtSize", name: t("tShirtSize") },
    { key: "address", name: t("address") },
    { key: "parentName", name: t("parentName") },
    { key: "parentPhone", name: t("parentPhone") },
    { key: "parentEmail", name: t("parentEmail"), width: 200 },
    //{ key: "note", name: t("note") },
  ];

  const columnsPdf = [
     t("actionName") ,
     t("firstName") ,
    t("lastName") ,
    t("birthNumber") ,
    t("tShirtSize") ,
    t("address") ,
    t("parentName") ,
    t("parentPhone") ,
    t("parentEmail"),
  ];

  const onButtonPDFClicked = () =>{
    let doc = new jsPDF('landscape', 'mm', 'a4');
    
    doc.setProperties({
        title: 'Seznam',
        subject: 'Seznam dětí',
        author: authCtx.name,
        keywords: 'seznam, oskelt, tabor',
        creator: authCtx.name});

    doc.autoTable({
          head: [columnsPdf],
          body: rowsPdf,
        })
    doc.output("dataurlnewwindow");
    //doc.save("Seznam.pdf");
  }

  return (
    <div id="actionsSignupList">
      <div className="row">
        <div className="form-floating mb-3 mt-3 col-md-6">
          <select
            className="form-select"
            id="floatingSelectYear"
            aria-label="Floating label select example"
            onChange={(e)=>{setYear(e.target.value);}}>
            <option value="all">{t("all")}</option>
            {actionYears}
          </select>
          <label htmlFor="floatingSelectYear">{t("selectYear")}</label>
        </div>
        <div className="form-floating mb-3 mt-3 col-md-6">
          <select
            className="form-select"
            id="floatingSelectName"
            aria-label="Floating label select example"
            onChange={(e)=>{setName(e.target.value);}}
            //{ year === "all" ? "disabled": ""}
            >
            <option value="all">{t("all")}</option>
            {actionNames}
          </select>
          <label htmlFor="floatingSelectName">{t("selectAction")}</label>
        </div>
      </div>
      
      <DataGrid columns={columns} rows={signupRows} />
      
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <button className="btn btn-primary" onClick={onButtonPDFClicked}>{t("ExportToPDF")}</button>
        </div>
        <div className="col-md-auto"><DownloadXLS /></div>
      </div>
      {isLoading && <div className="spinner-border text-info"></div>}
    </div>
  );
};

export default ActionsSignupList;

