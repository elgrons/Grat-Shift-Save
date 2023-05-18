import React from "react";
import Tip from './Tip';
import PropTypes from "prop-types";

function TipList(props) {
  console.log('TipList props.tipList is');
  console.table(props.tipList);
  return (
    <React.Fragment>
      <h1 style={{display: 'flex', justifyContent: 'center', gap: '0.5rem'}}><div style={{ transform: 'scaleX(-1)'}}>✨</div> Shift & Sales History <div>✨</div></h1>
      <ul>
        {props.tipList.map((tip) =>
          <Tip
            {...tip}
            key={tip.id}
            onClickEdit={props.handleClickEdit}
            onClickDelete={props.handleClickDelete}
            onDreamSelection={props.onTipSelection}
          />
        )}
      </ul>
      
    </React.Fragment>
  );
}

TipList.propTypes = {
  tipList: PropTypes.array,
  handleClickEdit: PropTypes.func,
  handleClickDelete: PropTypes.func,
  onTipSelection: PropTypes.func
}

export default TipList;