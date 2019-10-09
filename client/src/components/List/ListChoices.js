import React, { Fragment, useState, useEffect } from "react";

import DataTable from "react-data-table-component";
import { config } from "../../settings";

const ListChoices = () => {
  const deleteClickHandle = choiceId => {
    console.log("choice id ------------> ", choiceId);
    if (window.confirm("Are you sure you want to delete the choice")) {
      console.log("question will be deleted");
    } else {
      console.log("will not be deleted");
    }
  };
  const editClickHandle = choiceId => {};

  const EditButton = props => (
    <button
      type="button"
      onClick={e => editClickHandle(props.row.id)}
      data-id={props.row.id}
      data-question-id={props.row.questionid}
      data-row={JSON.stringify(props)}
      className="dt-btn btn btn-info mr-1"
    >
      <i className="fa fa-edit"></i>
    </button>
  );

  const DeleteButton = props => (
    <button
      type="button"
      onClick={e => deleteClickHandle(props.row.id)}
      data-id={props.row.id}
      data-question-id={props.row.questionid}
      className="dt-btn btn btn-danger"
    >
      <i className="fa fa-trash"></i>
    </button>
  );

  const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true
    },
    {
      name: "Question Id",
      selector: "questionid",
      sortable: true
    },
    {
      name: "Choice Statement",
      selector: "choicestatement",
      sortable: true,
      searchable: true
    },
    {
      name: "Choice Description",
      selector: "choicedescription",
      sortable: true
    },
    {
      name: "Weight",
      selector: "weight",
      sortable: true
    },
    {
      name: "Answer",
      selector: "answer",
      sortable: true
    },
    {
      name: "Actions",
      button: true,
      cell: row => (
        <Fragment>
          <EditButton row={row} /> <DeleteButton row={row} />
        </Fragment>
      )
    }
  ];

  const [choicesData, setChoicesData] = useState({ choices: [{}] });

  const { choices } = choicesData;

  const getChoices = () => {
    const url = config.basUrl + "/listchoices";
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
        console.log("api data -->", JSON.stringify(data));
        data.map(choice =>
          choice.answer === 1 ? (choice.answer = "yes") : (choice.answer = "no")
        );
        setChoicesData({ choices: data });
      })
      .catch(err => console.log(err));
    console.log(choices);
  };

  useEffect(() => {
    getChoices();
  }, []);

  const simpleTable = () => {
    return (
      <DataTable
        title="List of Choices"
        columns={columns}
        data={choices}
        pagination
      />
    );
  };

  return (
    <div className="App">
      <div>{simpleTable()}</div>
    </div>
  );
};

export default ListChoices;
