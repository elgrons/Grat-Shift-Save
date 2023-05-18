import React from "react";
import PropTypes from "prop-types";

function TipForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type="number"
          name="cashTip"
          defaultValue={props.type === "edit" ? props.tip.cashTip : ""}
          placeholder={props.type !== "edit" ? "0" : ""}
        />
        <input
          type="number"
          name="creditTip"
          defaultValue={props.type === "edit" ? props.tip.creditTip : ""}
          placeholder={props.type !== "edit" ? "0" : ""}
        />
        <input
          type="number"
          name="shiftSales"
          defaultValue={props.type === "edit" ? props.tip.shiftSales : ""}
          placeholder={props.type !== "edit" ? "0" : ""}
        />
        <textarea
          type="date"
          name="shiftDate"
          defaultValue={props.type === "edit" ? props.tip.shiftDate : ""}
        />
        <button type="submit" buttonText="Submit">{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

TipForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
  tip: PropTypes.object,
  type: PropTypes.string,
};

export default TipForm;
