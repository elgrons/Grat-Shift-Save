import React from "react";
import PropTypes from "prop-types";
import TipForm from "./TipForm";

function EditTip(props) {
  const { tip } = props;
  
  function handleEditingTipInList(event) {
    event.preventDefault();
    props.onEditTip({
      cashTip: event.target.cashTip.value,
      creditTip: event.target.creditTip.value,
      shiftSales: event.target.shiftSales.value,
      shiftDate: event.target.shiftDate.value,
      id: tip.id
    });
  }

  return (
    <>
      <TipForm
        type='edit'
        formSubmissionHandler={handleEditingTipInList}
        tip={tip}
        buttonText="Edit Grat Shift" />
    </>
  );
}

EditTip.propTypes ={
  onEditTip: PropTypes.func,
  tip: PropTypes.object
};

export default EditTip;