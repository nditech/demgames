import React, { useState } from "react";
import PropTypes from 'prop-types';
import DataTable from "react-data-table-component";

const ListTable = ({
  tableData: {
    title,
    columns,
    data,
    hasActionBtns,
    deleteHandle,
    editHandle,
  },
}) => {
  const [listState, setListState] = useState({
    filteredData: "",
    searchText: "",
  });

  const { filteredData, searchText } = listState;

  const deleteClickHandle = choiceId => {
    deleteHandle(choiceId);
  };

  const EditButton = props => (
    <button
      type="button"
      onClick={() => editHandle(props.row.id)}
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

  if (hasActionBtns) {
    columns.push({ // eslint-disable-line
      name: "Actions",
      button: true,
      cell: row => (
        <>
          <EditButton row={row} />
          {' '}
          <DeleteButton row={row} />
        </>
      ),
    });
  }

  // Table Search
  const rowdata = JSON.parse(JSON.stringify(data));
  const handleSearch = e => {
    const text = e.target.value;
    const filterdata = [];
    setListState({
      ...listState,
      searchText: text,
    });

    window.filterDelay && clearTimeout(window.filterDelay);
    window.filterDelay = setTimeout(() => {
      rowdata.forEach(element => {
        let valueString = "";
        for (const lindex in element) {
          valueString += ` ${element[lindex]}`;
        }
        if (
          valueString.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        ) {
          filterdata.push(element);
        }
      });

      setListState({
        ...listState,
        filteredData: filterdata,
        searchText,
      });
    }, 300);
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={searchText}
          placeholder="Search..."
          className="tableSearchBox"
          onChange={e => handleSearch(e)}
        />
        <DataTable
          title={title}
          columns={columns}
          data={filteredData || data}
          pagination
        />
      </div>
    </div>
  );
};

ListTable.propTypes = {
  tableData: PropTypes.shape({
    title: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({})),
    data: PropTypes.arrayOf(PropTypes.shape({})),
    hasActionBtns: PropTypes.bool,
    deleteHandle: PropTypes.func,
    editHandle: PropTypes.func,
  }).isRequired,
  row: PropTypes.shape({
    id: PropTypes.string,
    questionid: PropTypes.string,
  }),
};

ListTable.defaultProps = {
  row: null,
};

export default ListTable;
