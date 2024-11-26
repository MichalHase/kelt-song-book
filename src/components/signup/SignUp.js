import { useEffect, useState } from "react";
import SignUpFirstStep from "./SignUpFirstStep";
import SignUpSecondStep from "./SignUpSecondStep";
import SignUpThirdStep from "./SignUpThirdStep";
import SignUpLastStep from "./SignUpLastStep";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import SignUpCheckers from "./SignUpChecker";

const SignUp = (props) => {
  const { t } = useTranslation();
  const [showFirstStep, setShowFirstStep] = useState(true);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [showThirdStep, setShowThirdStep] = useState(false);
  const [showLastStep, setShowLastStep] = useState(false);

  const [firstStepConfirmed, setFirstStepConfirmed] = useState(false);
  const [secondStepConfirmed, setSecondStepConfirmed] = useState(false);
  const [thirdStepConfirmed, setThirdStepConfirmed] = useState(false);
  const [lastStepConfirmed, setLastStepConfirmed] = useState(false);

  const [actions, setActions] = useState([]);
  const [actionValues, setActionValues] = useState(null);
  const [enteredValues, setEnteredValues] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    setActions(props.actions);
  }, [props.actions]);

  useEffect(() => {
    if (item) {
      setShowLastStep(true);
    }
  }, [item]);

  useEffect(() => {
    if (actionValues && enteredValues) {
      const remapItem = {
        actionName: actionValues.actionName,
        actionFrom: actionValues.actionFrom,
        actionTo: actionValues.actionTo,
        actionDate: actionValues.actionDate,
        actionPlace: actionValues.actionPlace,
        actionPrice: actionValues.actionPrice,

        firstName: enteredValues.firstName,
        lastName: enteredValues.lastName,
        birthNumber: enteredValues.birthNumber,
        tShirtSize: enteredValues.tShirtSize,
        address: enteredValues.address,
        parentName: enteredValues.parentName,
        parentPhone: enteredValues.parentPhone,
        parentEmail: enteredValues.parentEmail,
        note: enteredValues.note,
      };
      setItem(remapItem);
    }
  }, [enteredValues, actionValues]);

  const onFirstStepConfirm = (event) => {
    setFirstStepConfirmed(true);
    setShowFirstStep(false);
    setShowSecondStep(true);
    setActionValues(event);
  };

  const onSecondStepConfirm = (event) => {
    setSecondStepConfirmed(event);
    setShowSecondStep(false);
    setShowThirdStep(true);
  };

  const onThirdStepConfirm = (event) => {
    setEnteredValues(event);
    setThirdStepConfirmed(true);
    setShowThirdStep(false);
  };
  const onLastStepConfirm = (event) => {
    setLastStepConfirmed(true);
    setShowFirstStep(false);
    setShowSecondStep(false);
    setShowThirdStep(false);
    setShowLastStep(false);
  };

  return (
    <div id="actionSignup" className="container">
      <div className="p-1 mb-1 border rounded-2 shadow">
        <h2 className="text-center">{t("digitalSignup")}</h2>
        <SignUpCheckers
          firstState={firstStepConfirmed}
          firstShow={showFirstStep}
          secondState={secondStepConfirmed}
          secondShow={showSecondStep}
          thirdState={thirdStepConfirmed}
          thirdShow={showThirdStep}
          lastState={lastStepConfirmed}
          lastShow={showLastStep}
        />

        {showFirstStep && (
          <SignUpFirstStep
            onStepConfirm={onFirstStepConfirm}
            actions={actions}
          />
        )}
        {showSecondStep && (
          <SignUpSecondStep onStepConfirm={onSecondStepConfirm} />
        )}
        {showThirdStep && (
          <SignUpThirdStep onStepConfirm={onThirdStepConfirm} />
        )}
        {showLastStep && (
          <SignUpLastStep
            onStepConfirm={onLastStepConfirm}
            enteredValues={item}
          />
        )}
        {firstStepConfirmed &&
          secondStepConfirmed &&
          thirdStepConfirmed &&
          lastStepConfirmed && (
            <div className="row">
              <i className="bi bi-check-circle fa-4x text-success text-center" />
              <div className="text-center">Potvrzeno</div>
            </div>
          )}
      </div>
    </div>
  );
};

export default SignUp;
