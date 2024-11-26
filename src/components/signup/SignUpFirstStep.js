import { useEffect, useState } from "react";
import { format } from "date-fns";

const SignUpFirstStep = (props) => {
  const [actionsCtx, setActionsCtx] = useState();
  const [actionId, setActionId] = useState(0);

  useEffect(() => {
    const temp = props.actions.find(
      (item) => parseInt(item.id, 10) === actionId
    );
    if (temp) {
      props.onStepConfirm({
        id: temp.id,
        actionName: temp.name,
        actionPlace: temp.place,
        actionDate: format(new Date(temp.fromDate), "yyyyMMdd"),
        actionFrom: new Date(temp.fromDate),
        actionTo: new Date(temp.toDate),
        actionPrice: temp.price,
      });
    }
  }, [props, actionId, props.actions]);

  useEffect(() => {
    setActionsCtx(
      props.actions.map((item) => (
        <div key={"sac" + item.id} className="col-md-auto">
          <input
            type="radio"
            name="sign-actions"
            value={item.name}
            id={item.id}
            className="btn-check"
            onChange={(e) => setActionId(parseInt(e.target.id, 10))}
          />
          <label className="btn btn-outline-primary" htmlFor={item.id}>
            {item.name}
          </label>
        </div>
      ))
    );
  }, [props.actions]);

  return (
    <div id="signupFirst" className="row pt-1">
      <div className="col">
        <div className="row justify-content-md-center">{actionsCtx}</div>
      </div>
    </div>
  );
};

export default SignUpFirstStep;
