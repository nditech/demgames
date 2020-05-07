import React, { Fragment, useState, useEffect } from "react";
import ListTable from "../ListTable";
import DialogBox from "../DialogBox/DialogBox";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchScoreDetail, updateRouteDetail } from "../../components/ProfileInfo/action";
import { addCohort, deleteCohort, updateCohort } from "./utility";
import { config } from "../../settings";

const ListCohorts = (props) => {

    const columns = [{
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

    const addCohortFields = [{
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
        setPopupState({...popupState, showMessage: false });
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
       // console.log(selectedCohort.name.props),
        id: selectedCohort.id,
        values: [{
                key: "name",
                type: "text",
                title: "Title",
                value: String((String(JSON.stringify(selectedCohort.name.props)).split('"'))[3]).split('/')[3],
                editable: true
            },
            {
                key: "logo",
                type: "file",
                title: "Logo",
                value: selectedCohort.logo,
                editable: true
            }
        ]
    };

    const getName = n => {
        return (selected_cohort.name.props.href).split("/")[3];
    }

    const getCohort = () => {
        const url = config.baseUrl + "/listCohort";
        fetch(url, {
                method: "get",
                headers: {
                    // authorization: "Bearer " + localStorage.getItem("access_token"),
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
                        name: ( <
                            a href = { window.location.origin + "/" + data[i].name + "/landingpage" }
                            target = "_self"
                            onClick = {
                                e => {
                                    console.log(data[i]);
                                    props.updateRoute(data[i]);
                                    console.log(props.scoreDetail);
                                }
                            } > { data[i].name } 
                            </a>
                        ),
                        //nameOnly:data[i].name,
                        logo: ( <
                            a href = { window.location.origin + "/" + data[i].logo }
                            target = "new"
                            onClick = {
                                e => {
                                    console.log(data[i]);
                                    props.updateRoute(data[i]);
                                    console.log(props.scoreDetail);
                                }
                            } > { data[i].logo.split("/")[1].split(".")[0] } 
                            </a>
                        )
                    });

                    console.log("Received " + JSON.stringify(DataUpdate) + data[i].logo);
                });
                setCohortData({...cohortData, cohort: DataUpdate });
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
            setPopupState({...popupState, showMessage: false });
            getCohort();
        });
    };

    const editHandle = id => {
        const textCohort = [{}];

        const selected_cohort = cohort.find(item => {
            return item.id === id;
        });

        console.log("Selected Cohort"+ (selected_cohort.name.props.href).split("/")[3]);

        setCohortData({...cohortData, selectedCohort: selected_cohort });
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

    };

    const saveCohort = (data = null) => {
        console.log("final data: ", data);
        // return;
        addCohort(data, function() {
            setPopupState({...popupState, showMessage: false });
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
            <
                DialogBox confirmButtonValue = { confirmButtonValue }
                showMessage = { showMessage }
                messageTitle = { messageTitle }
                messageDescription = { messageDescription }
                onConfirm = { onConfirm }
                isConfirmation = { isConfirmation }
                onCancel = { onCancel }
                title = { title }
                data = { create ? addCohortFields : editCohortFields }
                messageBox = { messageBox }
                edit = { edit }
                create = { create }
                onDelete = { onDelete }
                removeMessage = { removeMessage }
                hasChoices = { false }
            /> 
            <div className = "float-right"
                onClick = { e => addCohortHandle(e) } >
                <button className = "btn btn-info btn-sm" >
                    <i className = "fa fa-plus" > </i> 
                </button> 
                <span > Add Cohort </span> 
            </div> 
            <ListTable tableData = {
                {
                    title: "List of Cohort",
                    columns: columns,
                    hasActionBtns: true,
                    data: cohort,
                    deleteHandle: deleteHandle,
                    editHandle: editHandle
                }
            }
            /> 
        </Fragment>
    );
}

//export default ListCohorts;
const mapStateToProps = state => ({
    routeDetail: state.scoreDetail.routeDetail,
    cohortData: state.gameData.cohortData,
    scoreDetail: state.scoreDetail
});

//Dispatch action to fetch game data and scores.
const mapDispatchToProps = dispatch => {
    // console.log(cohortData);
    return {
        getGameData: gameData => dispatch(fetchGameData(gameData)),
        getScores: scores => dispatch(fetchScores(scores)),
        getCohorts: cohortData => dispatch(fetchCohorts(cohortData)),
        setAuth: authDetail => dispatch(fetchAuthDetails(authDetail)),
        clearAuth: authDetail => dispatch(clearAuthDetails(authDetail)),
        setScoreDetail: scoreDetail => dispatch(fetchScoreDetail(scoreDetail)),
        updateRoute: routeDetail => dispatch(updateRouteDetail(routeDetail))
    };
};

ListCohorts.propTypes = {
    getGameData: PropTypes.func,
    getScores: PropTypes.func,
    gameData: PropTypes.object,
    authDetail: PropTypes.object,
    setAuth: PropTypes.func,
    clearAuth: PropTypes.func,
    scoreDetail: PropTypes.object,
    cohortData: PropTypes.object,
    getCohorts: PropTypes.func,
    routeDetail: PropTypes.object,
    updateRoute: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCohorts);