import Captcha from "../UI/Captcha";

const SignUpSecondStep = (props) => {

  const onCaptchaState = (state) => {
      if (state){
        props.onStepConfirm(state);
      }
  };

  return (
    <div id="signupSecond" className="row pt-1">
      <div className="col">
        <Captcha onCaptchaState={onCaptchaState} />
      </div>
      {/* <button className="btn btn-primary" onClick={()=>{onCaptchaState(true);}} >fill</button> */}
    </div>
  );
};

export default SignUpSecondStep;
