import React, { Fragment } from "react";
import DataTable from "react-data-table-component";

const ListTable = ({
  tableData: { title, columns, data, hasActionBtns, deleteHandle, editHandle }
}) => {
  const deleteClickHandle = choiceId => {
    deleteHandle(choiceId);
  };
  const editClickHandle = choiceId => {};

  const EditButton = props => (
    <button
      type="button"
      onClick={e => editHandle(props.row.id)}
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

  if (hasActionBtns) {
    columns.push({
      name: "Actions",
      button: true,
      cell: row => (
        <Fragment>
          <EditButton row={row} /> <DeleteButton row={row} />
        </Fragment>
      )
    });
  }

  return (
    <div className="App">
      <div>
        <DataTable title={title} columns={columns} data={data} pagination />
      </div>
    </div>
  );
};

export default ListTable;
