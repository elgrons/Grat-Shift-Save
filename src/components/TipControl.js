import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogIn from "./LogIn";
import Header from "./Header";
import TipList from "./TipList";
import TipForm from "./TipForm";
import EditTip from "./EditTip";
import { Routes, Route } from "react-router-dom";
import { db, auth } from "./../firebase.js";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

function TipControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTipList, setMainTipList] = useState([]);
  const [selectedTip, setSelectedTip] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      (querySnapshot) => {
        const tips = [];
        querySnapshot.forEach((doc) => {
          tips.push({
            cashTip: doc.data().cashTip,
            creditTip: doc.data().creditTip,
            shiftSales: doc.data().shiftSales,
            shiftDate: doc.data().shiftDate,
            id: doc.id,
          });
        });
        setMainTipList(tips);
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedTip != null) {
      setFormVisibleOnPage(false);
      setSelectedTip(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleDeletingTip = async (id) => {
    await deleteDoc(doc(db, "tips", id));
    setSelectedTip(null);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditingTipInList = async (tipToEdit) => {
    const tipRef = doc(db, "tips", tipToEdit.id);
    await updateDoc(tipRef, tipToEdit);
    setEditing(false);
    setSelectedTip(null);
  };

  const handleAddingNewTipToList = async (newTipData) => {
    await addDoc(collection(db, "tips"), newTipData);
    setFormVisibleOnPage(false);
  };

  const handleChangingSelectedTip = (id) => {
    const selection = mainTipList.filter((tip) => tip.id === id)[0];
    setSelectedTip(selection);
  };

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access the grat shifts.</h1>
      </React.Fragment>
    );
  } else if (auth.currentUser != null) {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>;
    } else if (editing) {
      currentlyVisibleState = (
        <TipForm
          tip={selectedTip}
          onEditTicket={handleEditingTipInList}
        />
      );
      buttonText = "Return to Grat Shift List";
    } else if (selectedTip != null) {
      currentlyVisibleState = (
        <TipList
          tip={selectedTip}
          onClickingDelete={handleDeletingTip}
          onClickingEdit={handleEditClick}
        />
      );
      buttonText = "Return to Grat Shift List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = (
        <TipForm onNewTipCreation={handleAddingNewTipToList} />
      );
      buttonText = "Return to Grat Shift List";
    } else {
      currentlyVisibleState = (
        <TipList
          onTipSelection={handleChangingSelectedTip}
          tipList={mainTipList}
        />
      );
      buttonText = "Add Grat Shift";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>}
      </React.Fragment>
    );
  }
}

export default TipControl;