import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {

  return (
    <React.Fragment>
      <form onSubmit={props.handleNewSubmission}>
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
        <input
          type="date"
          name="shiftDate"
          defaultValue={props.type === "edit" ? props.tip.shiftDate : ""}
        />
        <button type="submit">{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  handleNewSubmission: PropTypes.func,
  buttonText: PropTypes.string,
  tip: PropTypes.object,
  type: PropTypes.string,
  userId: PropTypes.string,
  email: PropTypes.string
};

export default ReusableForm;
