import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";


function TipForm(props) {

  function handleNewSubmission(event) {
    event.preventDefault();
    props.onNewTipCreation({
      cashTip: event.target.cashTip.value,
      creditTip: event.target.creditTip.value,
      shiftSales: event.target.shiftSales.value,
      shiftDate: event.target.shiftDate.value,
      userId: props.uid,
      email: props.email,
    });
  }

  return (
    <>
    <ReusableForm
        formSubmissionHandler={handleNewSubmission}
        buttonText="Submit" />
    </>
  );
}

TipForm.propTypes = {
  onNewTipCreation: PropTypes.func,
  buttonText: PropTypes.string,
  tip: PropTypes.object,
  type: PropTypes.string,
  userId: PropTypes.string,
  email: PropTypes.string
};

export default TipForm;
