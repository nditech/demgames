import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import DataTable from "react-data-table-component";
import { config } from "../../settings";

const ListChoices = () => {
  const deleteClickHandle = choiceId => {
    console.log("choice id ------------> ", choiceId); // eslint-disable-line
    if (window.confirm("Are you sure you want to delete the choice")) { // eslint-disable-line
      console.log("question will be deleted"); // eslint-disable-line
    } else {
      console.log("will not be deleted"); // eslint-disable-line
    }
  };
  const editClickHandle = () => { };

  const EditButton = (props) => (
    <button
      type="button"
      onClick={() => editClickHandle(props.row.id)}
      data-id={props.row.id}
      data-question-id={props.row.questionid}
      data-row={JSON.stringify(props)}
      className="dt-btn btn btn-info mr-1"
    >
      <i className="fa fa-edit" />
    </button>
  );

  const DeleteButton = props => (
    <button
      type="button"
      onClick={() => deleteClickHandle(props.row.id)}
      data-id={props.row.id}
      data-question-id={props.row.questionid}
      className="dt-btn btn btn-danger"
    >
      <i className="fa fa-trash" />
    </button>
  );

  const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "Question Id",
      selector: "questionid",
      sortable: true,
    },
    {
      name: "Choice Statement",
      selector: "choicestatement",
      sortable: true,
      searchable: true,
    },
    {
      name: "Choice Description",
      selector: "choicedescription",
      sortable: true,
    },
    {
      name: "Weight",
      selector: "weight",
      sortable: true,
    },
    {
      name: "Answer",
      selector: "answer",
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: row => (
        <>
          <EditButton row={row} />
          {' '}
          <DeleteButton row={row} />
        </>
      ),
    },
  ];

  const [choicesData, setChoicesData] = useState({ choices: [{}] });

  const { choices } = choicesData;

  const getChoices = () => {
    const url = `${config.basUrl}/listchoices`;
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
        const newChoices = [];
        data.map(choice => (
          choice.answer === 1
            ? (
              newChoices.push({
                ...choice,
                answer: "yes",
              })
            ) : (
              newChoices.push({
                ...choice,
                answer: "no",
              })
            )
        ));
        setChoicesData({ choices: newChoices });
      })
      .catch(err => console.log(err)); // eslint-disable-line
  };

  useEffect(() => {
    getChoices();
  }, []);

  const simpleTable = () => (
    <DataTable
      title="List of Choices"
      columns={columns}
      data={choices}
      pagination
    />
  );

  return (
    <div className="App">
      <div>{simpleTable()}</div>
    </div>
  );
};

ListChoices.propTypes = {
  row: PropTypes.shape({
    questionid: PropTypes.string,
    id: PropTypes.string,
  }),
};

ListChoices.defaultProps = {
  row: null,
};

export default ListChoices;
