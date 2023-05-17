import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogIn from "./LogIn";
import Header from "./Header";
import TipList from "./TipList";
import TipForm from "./TipForm";
import EditTip from "./EditTip";
import { Routes, Route } from "react-router-dom";

function TipControl() {
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

  const handleAddingNewTipToList = (newTipData) => {
    // Create new GratShift record
    axios
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

  function handleSettingCurrentUser(userObj) {
    setCurrentUser(userObj);
  }

  return (
    <>
      <div id="fancy-bg"></div>
      <Header />
      {currentUser ? (
        <Routes>
          <Route
            path="/"
            element={
              <TipList
                tipList={mainTipList}
                handleClickEdit={handleClickEdit}
                handleClickDelete={handleClickDelete}
                handleChangingSelectedTip={handleChangingSelectedTip}
              />
            }
          />
          <Route
            path="/add-tip"
            element={
              <TipForm handleAddingNewTipToList={handleAddingNewTipToList} />
            }
          />
          <Route
            path="/edit-tip/:id"
            element={
              <EditTip
                tipToEdit={selectedTip}
                handleEditingTipInList={handleEditingTipInList}
              />
            }
          />
        </Routes>
      ) : (
        <LogIn handleSettingCurrentUser={handleSettingCurrentUser} />
      )}
      {error && <p>{error}</p>}
    </>
  );
}

export default TipControl;
