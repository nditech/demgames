import React, { useState, useEffect } from "react";
import ListTable from "../ListTable";
import DialogBox from "../DialogBox/DialogBox";
import { addCohort, deleteCohort, updateCohort } from "./utility";
import { config } from "../../settings";
import confirmation from "../Confirm/Confirm";

const ListCohorts = () => {
  const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
  ];

  const addCohortFields = [
    {
      key: "name",
      type: "text",
      title: "Title",
      value: "",
      editable: true,
    },
  ];

  const [popupState, setPopupState] = useState({
    showMessage: false,
    confirmButtonValue: "Update",
    messageTitle: "",
    messageDescription: "",
    onConfirm: () => {},
    isConfirmation: true,
    title: "Cohort detail",
    messageBox: false,
    edit: false,
    create: false,
    onDelete: () => {},
    removeMessage: false,
  });

  const onCancel = () => {
    setPopupState({ ...popupState, showMessage: false });
  };

  const {
    showMessage,
    confirmButtonValue,
    messageTitle,
    messageDescription,
    onConfirm,
    isConfirmation,
    title,
    messageBox,
    edit,
    create,
    onDelete,
    removeMessage,
  } = popupState;

  const [cohortData, setCohortData] = useState({
    cohort: [{}],
    selectedCohort: { id: "", name: "" },
  });

  const { cohort, selectedCohort } = cohortData;

  const editCohortFields = {
    id: selectedCohort.id,
    values: [
      {
        key: "name",
        type: "text",
        title: "Title",
        value: selectedCohort.name,
        editable: true,
      },
    ],
  };

  const getCohort = () => {
    const url = `${config.baseUrl}/listCohort`;
    fetch(url, {
      method: "get",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setCohortData({ ...cohortData, cohort: data });
      })
      .catch(err => console.log(err)); // eslint-disable-line
  };

  useEffect(() => {
    getCohort();
  }, []);

  const deleteHandle = cohortId => {
    confirmation('DemGames', `Are you sure you want to delete cohort with id=${cohortId}?`, () => deleteCohort(cohortId, () => { getCohort(); }));
  };

  const editCohort = (data = "", id) => {
    // return;
    updateCohort(data.name, id, () => {
      setPopupState({ ...popupState, showMessage: false });
      getCohort();
    });
  };
  const editHandle = id => {
    // debugger;
    const selectedCohortToSet = cohort.find(item => item.id === id);
    setCohortData({ ...cohortData, selectedCohort: selectedCohortToSet });
    setPopupState({
      showMessage: true,
      confirmButtonValue: "Update",
      messageTitle: "",
      messageDescription: "",
      onConfirm: editCohort,
      isConfirmation: true,
      title: "Cohort detail",
      messageBox: false,
      edit: true,
      create: false,
      onDelete: null,
      removeMessage: false,
    });
  };

  const saveCohort = (data = "") => {
    // return;
    addCohort(data, () => {
      setPopupState({ ...popupState, showMessage: false });
      getCohort();
    });
  };

  const addCohortPopup = () => {
    setPopupState({
      showMessage: true,
      confirmButtonValue: "Save",
      messageTitle: "",
      messageDescription: "",
      onConfirm: saveCohort,
      isConfirmation: true,
      title: "Cohort detail",
      messageBox: false,
      edit: false,
      create: true,
      onDelete: () => {},
      removeMessage: false,
      isRemove: false,
    });
  };

  const addCohortHandle = () => {
    addCohortPopup();
  };

  return (
    <>
      <DialogBox
        confirmButtonValue={confirmButtonValue}
        showMessage={showMessage}
        messageTitle={messageTitle}
        messageDescription={messageDescription}
        onConfirm={onConfirm}
        isConfirmation={isConfirmation}
        onCancel={onCancel}
        title={title}
        data={create ? addCohortFields : editCohortFields}
        messageBox={messageBox}
        edit={edit}
        create={create}
        onDelete={onDelete}
        removeMessage={removeMessage}
        hasChoices={false}
      />
      <div
        className="float-right"
        onClick={e => addCohortHandle(e)}
        role="button"
        tabIndex={0}
      >
        <button type="submit" className="btn btn-info btn-sm">
          <i className="fa fa-plus" />
        </button>
        <span> Add Cohort</span>
      </div>
      <ListTable
        tableData={{
          title: "List of Cohort",
          columns,
          hasActionBtns: true,
          data: cohort,
          deleteHandle,
          editHandle,
        }}
      />
    </>
  );
};

export default ListCohorts;
