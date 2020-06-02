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
  getQuestions,
}) => {
  const [questionsData, setQuestionsData] = useState(componentData);
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
    removeMessage: false,
  });

  const {
    questions,
    gameId,
    questionDetail,
    choices,
    correctChoice,
    choicesNameArray,
    questionId,
  } = questionsData;

  const editQuestion = (data = "", questionIdToEdit) => {
    const answers = [];
    if (data) {
      data.answers.map((item, index) => {
        answers.push({ option: convertChoice(index), value: item });
      });
    }
    const dataWithAnswers = {
      ...data,
      answers,
    };
    const url = `${config.baseUrl  }/updatequestion/`;
    fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${  localStorage.getItem("access_token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataWithAnswers, id: questionIdToEdit }),
    })
      .then(res => res.json())
      .then(responseData => {
        alert(JSON.stringify(responseData));
        onCancel();
        setPopupState({ ...popupState, showMessage: false });

        getQuestions();
      })
      .catch(error => console.log(error)); // eslint-disable-line
  };

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
    removeMessage,
  } = popupState;

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
        value: activeGameName,
      },
      {
        key: "level",
        type: "text",
        title: "Level",
        value: questionDetail.difficulty_level,
      },
      {
        key: "question",
        type: "text",
        title: "Question",
        value: questionDetail.question_statement,
        multiline: true,
        editable: true,
      },
      {
        key: "answers",
        type: "options",
        title: "answers",
        value: choicesNameArray,
      },
      {
        key: "current_choice",
        type: "choice",
        title: "Current choice",
        value: correctChoice,
      },
    ],
  };

  const getChoices = (questionIdToGet, selectedQuestion) => {
    const url = `${config.baseUrl  }/choices/${questionIdToGet}`;
    fetch(url, {
      method: "get",
      headers: {
        authorization: `Bearer ${  localStorage.getItem("access_token")}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(responseData => {
        const choicesName = [];
        let correct = "";
        responseData.map((item, index) => {
          item.option = convertChoice(index);
          choicesName.push(item.choicestatement);
          if (item.answer === 1) {
            correct = convertChoice(index);
          }
        });

        setQuestionsData({
          ...questionsData,
          choices: data,
          choicesNameArray: choicesName,
          questionDetail: selectedQuestion,
          questionId: selectedQuestion.id,
          correctChoice: correct,
        });
      })
      .catch(err => console.log(err)); // eslint-disable-line
  };

  const editHandle = questionIdToHandle => {
    const selectedQuestion = questions.find(item => {
      return item.id === questionIdToHandle;
    });
    getChoices(id, selectedQuestion);
    setPopupState({ ...popupState, showMessage: showQuestionEdit });
  };

  useEffect(() => {
    editHandle(id);
    // setPopupState({ ...popupState, showMessage: showQuestionEdit });
  }, []);

  return (
    <>
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
    </>
  );
};

export default EditQuestion;
