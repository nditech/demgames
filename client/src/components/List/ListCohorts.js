import React, { Fragment, useState, useEffect } from "react";
import ListTable from "../ListTable";
import DialogBox from "../DialogBox/DialogBox";

import { addCohort, deleteCohort, updateCohort } from "./utility";
import { config } from "../../settings";

const ListCohorts = () => {
  const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true
    },
    {
      name: "Name",
      selector: "name",
      sortable: true
    },
    {
      name: "Logo",
      selector: "logo",
      sortable: false
    }
  ];

  const addCohortFields = [
    {
      key: "name",
      type: "text",
      title: "Title",
      value: "",
      editable: true
    },
    {
      key: "logo",
      type: "file",
      title: "Logo",
      value: null,
      editable: true
    }
  ];

  const onCancel = () => {
    setPopupState({ ...popupState, showMessage: false });
  };

  const [popupState, setPopupState] = useState({
    showMessage: false,
    confirmButtonValue: "Update",
    messageTitle: "",
    messageDescription: "",
    onConfirm: "",
    isConfirmation: true,
    title: "Cohort detail",
    messageBox: false,
    edit: true,
    create: false,
    onDelete: null,
    removeMessage: false
  });
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
    removeMessage
  } = popupState;

  const [cohortData, setCohortData] = useState({
    cohort: [{}],
    selectedCohort: { id: "", name: "", logo: "" }
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
        editable: true
      },
      {
        key: "logo",
        type: "text",
        title: "Logo",
        value: selectedCohort.logo,
        editable: true
      }
    ]
  };

  const getCohort = () => {
    const url = config.baseUrl + "/listCohort";
    fetch(url, {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "Application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        const DataUpdate = [];

        Object.keys(data).map((Val, i) => {
          DataUpdate.push({
            id: data[i].id,
            name: data[i].name,
            logo: (
              <a
                href={window.location.origin + "/" + data[i].logo}
                target="new"
              >
                {data[i].logo.split("/")[1].split(".")[0]}
              </a>
            )
          });
          console.log("Received " + JSON.stringify(DataUpdate) + data[i].logo);
        });
        setCohortData({ ...cohortData, cohort: DataUpdate });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCohort();
  }, []);

  const deleteHandle = cohortId => {
    console.log("cohort id: ", cohortId);
    var r = window.confirm(
      "Are you sure you want to delete cohort with id=" + cohortId
    );
    if (r === true) {
      deleteCohort(cohortId, function() {
        getCohort();
      });
    } else {
      return;
    }
  };

  const editCohort = (data = null, id) => {
    console.log("dialogbox data", id, data);
    // return;
    updateCohort(data.name, data.logo, id, function() {
      setPopupState({ ...popupState, showMessage: false });
      getCohort();
    });
  };
  const editHandle = id => {
    // debugger;
    /*
    const textCohort = [{}];

    Object.keys(cohort).map((Val, i) => {
      textCohort.push({
        id: cohort[i].id,
        name: cohort[i].name,
        logo: cohort[i].logo
      });
      console.log(textCohort[i].log.toString());
    });
*/
    /*
    const selected_cohort = cohort.find(item => {
      return item.id === id;
    });
    setCohortData({ ...cohortData, selectedCohort: selected_cohort });
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
      removeMessage: false
    });
    */
  };

  const saveCohort = (data = null) => {
    console.log("final data: ", data);
    // return;
    addCohort(data, function() {
      setPopupState({ ...popupState, showMessage: false });
      true;
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
      edit: true,
      create: true,
      onDelete: null,
      removeMessage: false,
      isRemove: false
    });
  };

  const addCohortHandle = () => {
    addCohortPopup();
  };

  return (
    <Fragment>
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
      <div className="float-right" onClick={e => addCohortHandle(e)}>
        <button className="btn btn-info btn-sm">
          <i className="fa fa-plus"></i>
        </button>
        <span> Add Cohort</span>
      </div>
      <ListTable
        tableData={{
          title: "List of Cohort",
          columns: columns,
          hasActionBtns: true,
          data: cohort,
          deleteHandle: deleteHandle,
          editHandle: editHandle
        }}
      />
    </Fragment>
  );
};

export default ListCohorts;
