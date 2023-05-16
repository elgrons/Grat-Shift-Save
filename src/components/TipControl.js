import { useState, useEffect } from "react";
import LogIn from "./authorization/Login";
import Header from "./Header";
import TipList from "./TipList";
import TipForm from "./TipForm";
import EditTip from "./EditTip";
import { db, auth } from "./../firebase.js";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import React from "react";
import { useNavigate } from 'react-router-dom';

function App() {

const navigate = useNavigate();
useEffect(() => {
  const unSubscribe = onSnapshot(
    collection(db, "gratShifts"),
    (collectionSnapshot) => {
      const gratShifts = [];
      collectionSnapshot.forEach((doc) => {
        gratShifts.push({
          creditTip: doc.data().creditTip,
          cashTip: doc.data().cashTip,
          shiftSales: doc.data().shiftSales,
          shiftDate: doc.data().shiftDate,
          userId: doc.data().userId,
          username: doc.data().username,
          id: doc.id,
          email: doc.data().email,
        });
      });
      setMainTipList(gratShifts);
    },
    (error) => {
      setError(error.message);
    }
  );
  return () => unSubscribe();
}, []);

const [mainTipList, setMainTipList] = useState([]);
const [selectedTip, setSelectedTip] = useState(null);
const [editing, setEditing] = useState(false);
const [error, setError] = useState(null);
const [currentUser, setCurrentUser] = useState(null);

const handleClickEdit = () => {
  setEditing(true);
};

async function handleEditingTipInList(tipToEdit) {
  if (auth.currentUser) {
    const tipRef = doc(db, "gratShifts", tipToEdit.id);
    await updateDoc(tipRef, tipToEdit);
    navigate('/');
    setEditing(false);
    setSelectedTip(null);
  }
};

const handleClickDelete = async (userId) => {
  if (auth.currentUser) {
    await deleteDoc(doc(db, "gratShifts", userId));
    setSelectedTip(null);
  }
};

async function useHandleAddingNewTipToList(newTipData) {
  console.log('useHandleAddingNewTipToList newTipData', newTipData)
  await addDoc(collection(db, "gratShifts"), newTipData);
  navigate('/');
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
  <div id='fancy-bg'></div>
  <React.Fragment>
    <Header 
      currentUser={currentUser} 
      handleSettingCurrentUser={handleSettingCurrentUser}
    />
    <Routes>
      <Route path="/sign-in" element={
        <LogIn 
          handleSettingCurrentUser={handleSettingCurrentUser}
        />
      } />
      {currentUser && <Route
        path="/add-new"
        element={
          <TipForm
            onNewTipCreation={useHandleAddingNewTipToList} 
            currentUser={currentUser}
          />
        }
      />}
      {currentUser && <Route
        path="/edit"
        element={<EditTip
          tip={selectedTip}
          onEditTip={handleEditingTipInList} />}
      />}
      <Route
        path="/"
        element={
          <TipList
            tipList={mainTipList}
            onTipSelection={handleChangingSelectedTip}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
            
          />
        }
      />
    </Routes>
  </React.Fragment>
  </>
  );
}

export default App;