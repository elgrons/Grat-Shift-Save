import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogIn from "./LogIn";
import PropTypes from "prop-types";
import TipList from "./TipList";
import TipForm from "./TipForm";
import EditTip from "./EditTip";
// import Header from "./Header";
import { Routes, Route } from "react-router-dom";

function TipControl(props) {
  const [mainTipList, setMainTipList] = useState([]);
  const [selectedTip, setSelectedTip] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all GratShifts
    axios
      .get("https://grat-shift-save-api.azurewebsites.net/api/GratShift/")
      .then((response) => {
        setMainTipList(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleClickEdit = () => {
    setEditing(true);
  };

  const handleEditingTipInList = (tipToEdit) => {
    // Update GratShift record
    axios
      .put(
        `https://grat-shift-save-api.azurewebsites.net/api/GratShift/${tipToEdit.id}`,
        tipToEdit
      )
      .then((response) => {
        setEditing(false);
        setSelectedTip(null);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleClickDelete = (tipId) => {
    // Delete GratShift record
    axios
      .delete(
        `https://grat-shift-save-api.azurewebsites.net/api/GratShift/${tipId}`
      )
      .then((response) => {
        setSelectedTip(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  async function handleAddingNewTipToList(newTipData) {
    console.log('handleAddingNewTipToList newTipData', newTipData)
    // Create new GratShift record
      await axios
      .post(
        "https://grat-shift-save-api.azurewebsites.net/api/GratShift/",
        newTipData
      )
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleChangingSelectedTip = (id) => {
    const selection = mainTipList.filter((gratShift) => gratShift.id === id)[0];
    setSelectedTip(selection);
  };

  // const handleSettingCurrentUser = (user) => {
  //   setCurrentUser(user);
  // }

  return (
    <>
      {/* <div id="fancy-bg"></div> */}
      {/* <Header /> */}
      {/* {currentUser ? ( */}
        <Routes>
          <Route
            path="/"
            element={
              <TipList
                // currentUser={currentUser}
                // handleSettingCurrentUser={handleSettingCurrentUser}
                tipList={mainTipList}
                handleClickEdit={handleClickEdit}
                handleClickDelete={handleClickDelete}
                handleChangingSelectedTip={handleChangingSelectedTip}
              />
            }
          />
          <Route path="/add-new" 
          element={
          <TipForm 
          onNewTipCreation={handleAddingNewTipToList} />} />
          <Route
            path="/edit-tip"
            element={
              <EditTip
                // currentUser={currentUser}
                // handleSettingCurrentUser={handleSettingCurrentUser}
                tipToEdit={selectedTip}
                handleEditingTipInList={handleEditingTipInList}
              />
            }
          />
        </Routes>
      {/* ) : ( */}
        <LogIn 
        // currentUser={currentUser}
        //   handleSettingCurrentUser={handleSettingCurrentUser}
      />
      {/* )} */}
    </>
  );
}

TipControl.propTypes = {
  currentUser: PropTypes.object
};

export default TipControl;
