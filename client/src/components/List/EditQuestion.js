import React, { Fragment, useState, useEffect } from "react";
import DialogBox from "../DialogBox/DialogBox";
import Auth from '../../Auth';
import { config } from "../../settings";
const auth0=new Auth();

const EditQuestion = ({
  id,
  componentData,
  activeGameDetails,
  showQuestionEdit,
  onCancel,
  getQuestions
}) => {
  const [questionsData, setQuestionsData] = useState(componentData);
  const {
    questions,
    gameId,
    questionDetail,
    choices,
    correctChoice,
    choicesNameArray,
    questionId
  } = questionsData;

  const editQuestion = (data = "", id) => {
    console.log(data);
    let answers = [];
    if (data) {
      data.answers.map((item, index) => {
        answers.push({ option: convertChoice(index), value: item });
      });
    }
    data.answers = answers;
    console.log("options data -----> ", data);
    let url = config.baseUrl + "/updatequestion/";
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
        onCancel();
        setPopupState({ ...popupState, showMessage: false });

        getQuestions();
      })
      .catch(error => console.log(error));
  };

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

  useEffect(() => {
    console.log("showquestionedit----------", showQuestionEdit);
    editHandle(id);
    // setPopupState({ ...popupState, showMessage: showQuestionEdit });
  }, []);

  const convertChoice = value => {
    return String.fromCharCode(value + 65);
  };

  //   Questions and choices

  let activeGameName;
  activeGameDetails.map(item => {
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
        key: "answers",
        type: "options",
        title: "answers",
        value: choicesNameArray
      },
      {
        key: "current_choice",
        type: "choice",
        title: "Current choice",
        value: correctChoice
      }
    ]
  };

  const getChoices = (questionId, selectedQuestion) => {
    const url = config.baseUrl + `/choices/${questionId}`;
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

  //   const onCancel = () => {
  //     setPopupState({ ...popupState, showMessage: false });
  //   };

  const editHandle = id => {
    // console.log("id --- ", id);
    const selectedQuestion = questions.find(item => {
      return item.id === id;
    });
    getChoices(id, selectedQuestion);
    // console.log("question detail selected", questionDetail);
    setPopupState({ ...popupState, showMessage: showQuestionEdit });
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
        data={data}
        messageBox={messageBox}
        edit={edit}
        create={create}
        onDelete={onDelete}
        removeMessage={removeMessage}
      />
    </Fragment>
  );
};

export default EditQuestion;
