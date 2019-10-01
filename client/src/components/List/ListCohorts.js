import React, { Fragment, useState, useEffect } from "react";

import ListTable from "../ListTable";

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
    }
  ];

  const [cohortData, setCohortData] = useState({ cohort: [{}] });

  const { cohort } = cohortData;

  const getCohort = () => {
    const url = "http://localhost:9000/listCohort";
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
        console.log("cohort api data -->", JSON.stringify(data));
        setCohortData({ cohort: data });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCohort();
  }, []);

  const deleteHandle = questionId => {
    console.log("quest id: ", questionId);
    alert("Are you sure you want to delete cohort with id=" + questionId);
  };

  const editHandle = id => {
    // debugger;
    // // console.log("id --- ", id);
    // const selectedQuestion = questions.find(item => {
    //   return item.id === id;
    // });
    // getChoices(id, selectedQuestion, populateChoices);
    // // console.log("question detail selected", questionDetail);
    // setPopupState({
    //   showMessage: true,
    //   confirmButtonValue: "Update",
    //   messageTitle: "",
    //   messageDescription: "",
    //   onConfirm: updateHandle,
    //   isConfirmation: true,
    //   title: "Question detail",
    //   messageBox: false,
    //   edit: true,
    //   create: false,
    //   onDelete: null,
    //   removeMessage: false
    // });
  };

  return (
    <Fragment>
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
