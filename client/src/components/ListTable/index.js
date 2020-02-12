import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";

const ListTable = ({
  tableData: {
    title,
    columns,
    data,
    hasActionBtns,
    deleteHandle,
    editHandle,
    minSearchLength = 3
  }
}) => {
  const [listState, setListState] = useState({
    filteredData: "",
    searchText: ""
  });

  const { filteredData, searchText } = listState;

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

  // Table Search
  const rowdata2 = [];

  if (JSON.stringify(data).search("logo") > -1) {
    Object.keys(data).map((Val, i) => {
      //if (i !== -1) {
      console.log(data[i].logo.props);
      rowdata2.push({
        id: data[i].id,
        name: data[i].name,
        logo: data[i].logo.props.href.substring(
          data[i].logo.props.href.lastIndexOf("/") + 1
        )
      });
      // }
    });
  } else rowdata2.push(JSON.parse(JSON.stringify(data)));

  const handleSearch = e => {
    let searchText = e.target.value;

    //   if (searchText.value !== "") {
    let filterdata = [];
    setListState({
      ...listState,
      searchText: searchText
    });

    window.filterDelay && clearTimeout(window.filterDelay);
    window.filterDelay = setTimeout(() => {
      rowdata2.forEach(element => {
        let valueString = "";
        for (let lindex in element) {
          valueString += " " + element[lindex];
        }
        if (
          valueString.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        ) {
          filterdata.push(data[rowdata2.indexOf(element)]);
          console.log(rowdata2.indexOf(element));
        }
      });

      setListState({
        ...listState,
        filteredData: filterdata,
        searchText: searchText
      });
    }, 300);
    // clearTimeout(filterDelay);
    /*} else {

            rowdata2 = JSON.stringfy(JSON.stringify(data));
            setListState({
              ...listState,
              filteredData: filterdata,
              searchText: searchText
            });
    }
  */
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
          data={filteredData ? filteredData : data}
          pagination
        />
      </div>
    </div>
  );
};

export default ListTable;
