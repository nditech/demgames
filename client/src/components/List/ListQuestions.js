import React, { useEffect, useState, Fragment } from "react";
import ListTable from "../ListTable";
import DialogBox from "../DialogBox/DialogBox";

const ListQuestions = ({ activeGame, activeGameDetails }) => {
  //   console.log("active game ----> ", activeGame);
  //   console.log("active game details --- > ", activeGameDetails);
  // Set data table columns
  const columns = [
    // {
    //   name: "Id",
    //   selector: "id",
    //   sortable: true
    // },

    {
      name: "Question",
      selector: "question_statement",
      sortable: true
    },
    // {
    //   name: "Game Id",
    //   selector: "game_id",
    //   sortable: true
    // },

    {
      name: "Difficulty Level",
      selector: "difficulty_level",
      sortable: true
    },
    {
      name: "Weight",
      selector: "weight",
      sortable: true
    },
    {
      name: "Explanation",
      selector: "explanation",
      sortable: true
    }
  ];

  const [questionsData, setQuestionsData] = useState({
    questions: [{}],
    gameId: activeGame,
    questionId: null,
    questionDetail: {
      difficulty_level: "",
      question_statement: ""
    },
    choices: [],
    choicesNameArray: [],
    correctChoice: ""
  });
  const {
    questions,
    gameId,
    questionDetail,
    choices,
    correctChoice,
    choicesNameArray,
    questionId
  } = questionsData;

  console.log(
    "question =----------------------------------------------------------detail....",
    questionDetail
  );

  const getQuestions = () => {
    const url = `http://localhost:9000/listquestions/${activeGame}`;
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
        data.map(obj =>
          obj.isitmedia === 1 ? (obj.isitmedia = "yes") : (obj.isitmedia = "no")
        );
        setQuestionsData({
          ...questionsData,
          questions: data,
          gameId: activeGame
        });
      })
      .catch(err => console.log(err));
    console.log(questions);
  };
  useEffect(() => {
    getQuestions();
  }, []);

  if (gameId !== activeGame) {
    getQuestions();
  }

  const deleteHandle = questionId => {
    console.log("choice id ------------> ", questionId);
    if (window.confirm("Are you sure you want to delete the question")) {
      let url = "http://localhost:9000/questions/" + questionId;
      fetch(url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("access_token"),
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ questionId: questionId })
      })
        .then(res => res.json())
        .then(data => {
          alert(JSON.stringify(data));
          getQuestions();
        })
        .catch(error => console.log(error));
    }
  };

  const convertChoice = value => {
    return String.fromCharCode(value + 65);
  };

  const editQuestion = (data = "", id) => {
    console.log("dialogbox data", data);
    let answers = [];
    if (data) {
      data.options.map((item, index) => {
        answers.push({ option: convertChoice(index), value: item });
      });
    }
    data.options = answers;
    console.log("options data -----> ", data);
    let url = "http://localhost:9000/updatequestion/";
    fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: data, id: id })
    })
      .then(res => res.json())
      .then(data => {
        alert(JSON.stringify(data));
        setPopupState({ ...popupState, showMessage: false });
        getQuestions();
      })
      .catch(error => console.log(error));
  };

  //   Questions and choices

  const [popupState, setPopupState] = useState({
    showMessage: false,
    confirmButtonValue: "Update",
    messageTitle: "",
    messageDescription: "",
    onConfirm: editQuestion,
    isConfirmation: true,
    title: "Question detail",
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

  let activeGameName;
  activeGameDetails&&activeGameDetails.map(item => {
    if (item.key === "Name") {
      activeGameName = item.value;
    }
  });

  //   Pop up form data
  const data = {
    id: questionId,
    values: [
      {
        key: "game",
        type: "text",
        title: "Game",
        value: activeGameName
      },
      {
        key: "level",
        type: "text",
        title: "Level",
        value: questionDetail.difficulty_level
      },
      {
        key: "question",
        type: "text",
        title: "Question",
        value: questionDetail.question_statement,
        multiline: true,
        editable: true
      },
      {
        key: "options",
        type: "options",
        title: "answers",
        value: choicesNameArray
      },
      {
        key: "answers",
        type: "choice",
        title: "Current choice",
        value: correctChoice
      }
    ]
  };

  const getChoices = (questionId, selectedQuestion) => {
    const url = `http://localhost:9000/choices/${questionId}`;
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
        console.log("choices data -->", JSON.stringify(data));
        let choicesName = [];
        let correctChoice = "";
        data.map((item, index) => {
          item.option = convertChoice(index);
          choicesName.push(item.choicestatement);
          if (item.answer === 1) {
            correctChoice = convertChoice(index);
          }
        });

        setQuestionsData({
          ...questionsData,
          choices: data,
          choicesNameArray: choicesName,
          questionDetail: selectedQuestion,
          questionId: selectedQuestion.id,
          correctChoice: correctChoice
        });
      })
      .catch(err => console.log(err));
  };

  const onCancel = () => {
    setPopupState({ ...popupState, showMessage: false });
  };

  const editHandle = id => {
    // console.log("id --- ", id);
    const selectedQuestion = questions.find(item => {
      return item.id === id;
    });
    getChoices(id, selectedQuestion);
    // console.log("question detail selected", questionDetail);
    setPopupState({
      showMessage: true,
      confirmButtonValue: "Update",
      messageTitle: "",
      messageDescription: "",
      onConfirm: editQuestion,
      isConfirmation: true,
      title: "Question detail",
      messageBox: false,
      edit: true,
      create: false,
      onDelete: null,
      removeMessage: false
    });
  };

  //   ADD A NEW QUESTION

  const fields = [
    {
      key: "game",
      type: "text",
      title: "Game",
      value: activeGameName
    },
    {
      key: "level",
      type: "text",
      title: "Level",
      editable: true,
      value: ""
    },
    {
      key: "question",
      type: "text",
      title: "Question",
      multiline: true,
      editable: true,
      value: ""
    },
    {
      key: "options",
      type: "options",
      title: "answers",
      value: ["", "", "", ""]
    },
    {
      type: "choice",
      title: "Correct choice",
      value: "",
      editable: true,
      key: "answers"
    }
  ];

  const saveQuestion = (data = "") => {
    let answers = [];
    if (data) {
      data.options.map((item, index) => {
        answers.push({ option: convertChoice(index), value: item });
      });
    }
    data.options = answers;
    data.game_id = activeGame;
    console.log("options data -----> ", data);
    let url = "http://localhost:9000/addquestion/";
    fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: data })
    })
      .then(res => res.json())
      .then(data => {
        alert(JSON.stringify(data));
        setPopupState({ ...popupState, showMessage: false });
        getQuestions();
      })
      .catch(error => console.log(error));
  };

  const addQuestionHandle = e => {
    console.log("add question clicked ");
    setPopupState({
      showMessage: true,
      confirmButtonValue: "Save",
      messageTitle: "",
      messageDescription: "",
      onConfirm: saveQuestion,
      isConfirmation: true,
      title: "Question detail",
      messageBox: false,
      edit: false,
      create: true,
      onDelete: null,
      removeMessage: false,
      isRemove: false
    });
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
        data={create ? fields : data}
        messageBox={messageBox}
        edit={edit}
        create={create}
        onDelete={onDelete}
        removeMessage={removeMessage}
      />
      <div className="float-right" onClick={e => addQuestionHandle(e)}>
        <button className="btn btn-info btn-sm">
          <i className="fa fa-plus"></i>
        </button>
        <span> Add Question</span>
      </div>
      <ListTable
        tableData={{
          columns: columns,
          title: "List of Questions",
          hasActionBtns: true,
          data: questions,
          deleteHandle: deleteHandle,
          editHandle: editHandle
        }}
      />
    </Fragment>
  );
};

export default ListQuestions;
