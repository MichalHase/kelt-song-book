import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
//import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import { DATABASE_MAIN } from "../contexts/api";
import { amiriFont} from "../../assets/AmiriFont";
import { format } from "date-fns";

const SignUpLastStep = (props) => {
  const { t } = useTranslation();
  const accountNumber = "2101593334";
  const bankCode = "2010";
  const [actionItem, setActionItem] = useState({
    actionName: "",
    actionFrom: "",
    actionDate: "",
    actionPlace: "",
    actionPrice: "",
    firstName: "",
    lastName: "",
    birthNumber: "",
    tShirtSize: "",
    address: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    note: "",
  });
  const [qrLink, setQRLink] = useState(
    "https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=2101593334&bankCode=2010"
  );

  useEffect(() => {
    if(props.enteredValues){
      setActionItem(props.enteredValues);
    }
  }, [props.enteredValues]);

   useEffect(() => {
    setQRLink(
      `https://api.paylibo.com/paylibo/generator/czech/image?compress=false&size=220&accountNumber=${accountNumber}&bankCode=${bankCode}&amount=${actionItem.actionPrice}&currency=CZK&vs=${actionItem.actionDate}&message=${actionItem.firstName} ${actionItem.lastName}`
    );
  }, [actionItem]);


  const onPrintDocument = () => {
    let doc = new jsPDF('p', 'mm', 'a4');
    doc.setProperties({
      title: 'Zavazná přihláška',
      subject: 'Generovaná přihláška',
      author: 'Michal Hase',
      keywords: 'prihlaska, oskelt, tabor',
      creator: 'Hasman'});
    /* const input = document.getElementById("signupLast");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 10, 10);
      pdf.addImage(qrLink, "PNG", 10, 120);
      pdf.output('dataurlnewwindow');
      //pdf.save("download.pdf");
    }) */;
    
    doc.setFontSize(22);
    doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
		doc.setFont("Amiri");
    doc.text(65, 25, actionItem.actionName);
    doc.setFontSize(16);
    doc.setTextColor(150);
    doc.text(70, 35, "Závazná přihláška");

    doc.setTextColor(0);
    doc.setFontSize(8);
    doc.text(20, 50, "Provozovatel:");
    doc.setFontSize(10);
    //doc.setFontType("bold");
    doc.text(50, 50, "Občanský spolek KELT, IČO: 26581507");
    doc.setFontSize(8);
    doc.text(20, 55, "Termín:");
    doc.setFontSize(10);
    //doc.setFontType("bold");
    doc.text(50, 55, format(actionItem.actionFrom, "dd MM yyyy"));
    doc.text(75, 55, "-");
    doc.text(80, 55, format(actionItem.actionTo, "dd MM yyyy"));
    doc.setFontSize(8);
    doc.text(20, 60, "Místo konání:");
    doc.setFontSize(10);
    doc.text(50, 60, actionItem.actionPlace);
    doc.setFontSize(8);
    doc.text(20, 65, "Cena pobytu:");
    doc.setFontSize(10);
    doc.text(50, 65, actionItem.actionPrice+",-");
    doc.setFontSize(8);
    doc.text(70, 65, "(strava 5x denně, ubytování, doprava z F-M, programové a materiální zabezpečení)");
    
    doc.setFontSize(10);
    doc.setDrawColor(0,0,0);
    doc.rect(55, 75, 45, 18); // empty red square
    doc.addImage(qrLink, "PNG", 125, 70);
    doc.setFontSize(8);
    doc.text(20, 80, "Číslo učtu:");
    doc.setFontSize(10);
    doc.text(60, 80, accountNumber +"/"+bankCode);
    doc.setFontSize(8);
    doc.text(20, 85, "Variabilní symbol:");
    doc.setFontSize(10);
    doc.text(60, 85, actionItem.actionDate);
    doc.setFontSize(8);
    doc.text(20, 90, "Do poznámky:");
    doc.setFontSize(10);
    doc.text(60, 90, actionItem.firstName + " " + actionItem.lastName);

    doc.setFontSize(8);
    doc.text(20, 150, "Učastník:");
    doc.setFontSize(10);
    doc.text(50, 150, actionItem.firstName + " "+ actionItem.lastName);
    doc.setFontSize(8);
    doc.text(20, 155, "Adresa:");
    doc.setFontSize(10);
    doc.text(50, 155, actionItem.address);
    doc.setFontSize(8);
    doc.text(20, 160, "Rodné číslo:");
    doc.setFontSize(10);
    doc.text(50, 160, actionItem.birthNumber);
    doc.setFontSize(8);
    doc.text(80, 160, "Velikost trička:");
    doc.setFontSize(10);
    doc.text(120, 160, actionItem.tShirtSize);
        
    //doc.addPage();
    //doc.output("dataurlnewwindow");
    var blob = doc.output('blob', {filename:"prihlaska.pdf"});
    //var blob = doc.output('blob');

    const mail = {
      to: actionItem.parentEmail,
      subject: "Závazná přihláška KELT na akci "+actionItem.actionName,
      message: "Dobrý den, tímto potvrzujeme přihlášku vašeho syna/dcery "+actionItem.firstName + " "+ actionItem.lastName+" na akci KELT.",
      from: "oskelt@oskelt.cz",
    };

    const dataArray = new FormData();
      dataArray.append("pdf", blob);
      dataArray.append("mail", JSON.stringify(mail));

      fetch(`${DATABASE_MAIN}mailer2.php`, {
        method: "POST",
        body: dataArray,
        mode: "no-cors",
      }).catch((error) => console.log(error));

    //doc.save("Prihlaska-"+actionItem.firstName + " "+ actionItem.lastName+".pdf");
    
  };

  const onSave = (e) => {
     const dataToDatabase = {
      //id: props.enteredValues.id,
      actionName: actionItem.actionName,
      actionFrom: actionItem.actionFrom,
      //actionPlace: actionItem.actionPlace,
      firstName: actionItem.firstName,
      lastName: actionItem.lastName,
      birthNumber: actionItem.birthNumber,
      tShirtSize: actionItem.tShirtSize,
      address: actionItem.address,
      parentName: actionItem.parentName,
      parentPhone: actionItem.parentPhone,
      parentEmail: actionItem.parentEmail,
      note: actionItem.note,
    };
    
    fetch(`${DATABASE_MAIN}addActionSignup.php`, {
      method: "POST",
      body: JSON.stringify(dataToDatabase),
      //headers: { "Access-Control-Allow-Origin": "*","Content-Type": "multipart/form-data", },
      mode: "no-cors",
    }).catch((error) => console.log(error));

    onPrintDocument();    

    props.onStepConfirm();
  };

  return (
    <div  id="signupLast" className="row">
      <div className="col-sm">
        <b>Jméno:</b>
        <p>{actionItem.firstName + " " + actionItem.lastName}</p>
        <b>Bydliště:</b>
        <p>{actionItem.address}</p>
        <b>Věk:</b>
        <p>{actionItem.birthNumber}</p>
        <b>Velikost trička:</b>
        <p>{actionItem.tShirtSize}</p>
        <b>Jméno rodiče:</b>
        <p>{actionItem.parentName}</p>
        <b>Telefon rodiče:</b>
        <p>{actionItem.parentPhone}</p>
        <b>Email rodiče:</b>
        <p>{actionItem.parentEmail}</p>
      </div>
      <div className="col-sm">
        <b>Na akci:</b><p>{actionItem.actionName}</p>
        <b>Místo konání:</b><p>{actionItem.actionPlace}</p>
        <b>Číslo účtu:</b><p>{accountNumber+"/"+bankCode}</p>
        <b>VS:</b><p>{actionItem.actionDate}</p>
        <b>Cena:</b><p>{actionItem.actionPrice},-</p>
      </div>
      <div className="col-sm">
        <img alt="QRcode" src={qrLink} />
      </div>
      <button className="btn btn-primary" onClick={onSave}>{t("confirm")}</button>
    </div>
  );
};

export default SignUpLastStep;
