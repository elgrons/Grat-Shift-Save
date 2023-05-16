import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Tip(props){

    const { onClickDelete, onClickEdit } = props;
  
    function handleClickEdit() {
      props.onTipSelection(props.id);
      onClickEdit(props.id)
    }
    
    return (
      <React.Fragment>
        <h1>GratShift Details</h1>
        <h2><strong>Shift Date:</strong> {props.shiftDate}</h2><br />
        <li><strong>Cash Tip:</strong> ${props.cashTip} | <strong>Credit Tip:</strong> ${props.creditTip} </li><br />
        <li><strong>Shift Sales:</strong> ${props.shiftSales}</li><br />
        <li><strong>Quantity Available:</strong> {props.quantity}</li><hr />
          <Link to="/edit"><button onClick={handleClickEdit}>Revise Grat Shift</button></Link>
          <button onClick={() => onClickDelete(props.id)}>Remove Grat Shift</button>
      </React.Fragment>
    );
  }
  
  Tip.propTypes = {
    cashTip: PropTypes.number.isRequired,
    creditTip: PropTypes.number.isRequired,
    shiftSales: PropTypes.string.isRequired,
    shiftDate: PropTypes.instanceOf(Date).isRequired,
    id: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    onTipSelection: PropTypes.func
  };
  
  export default Tip;