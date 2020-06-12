import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import DialogBox from "../DialogBox/DialogBox";
import { config } from "../../settings";

const EditQuestion = ({
  id,
  componentData,
  activeGameDetails,
  showQuestionEdit,
  onCancel,
  getQuestions,
}) => {
  const [questionsData, setQuestionsData] = useState(componentData);
  const convertChoice = value => String.fromCharCode(value + 65);

  const editQuestion = (questionData = "", questionIdToEdit) => {
    const answers = [];
    if (questionData) {
      questionData.answers.map((item, index) => {
        answers.push({ option: convertChoice(index), value: item });
      });
    }
    const dataWithAnswers = {
      ...questionData,
      answers,
    };
    const url = `${config.baseUrl}/updatequestion/`;
    fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataWithAnswers, id: questionIdToEdit }),
    })
      .then(res => res.json())
      .then(responseData => {
        alert(JSON.stringify(responseData)); // eslint-disable-line
        onCancel();
        setPopupState({ ...popupState, showMessage: false });

        getQuestions();
      })
      .catch(error => console.log(error)); // eslint-disable-line
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
    onDelete: () => {},
    removeMessage: false,
  });

  const {
    questions,
    questionDetail,
    correctChoice,
    choicesNameArray,
    questionId,
  } = questionsData;

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

  //   Questions and choices

  let activeGameName;
  activeGameDetails.map(item => { // eslint-disable-line
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
    const url = `${config.baseUrl}/choices/${questionIdToGet}`;
    fetch(url, {
      method: "get",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
    const selectedQuestion = questions.find(item => item.id === questionIdToHandle);
    getChoices(id, selectedQuestion);
    setPopupState({ ...popupState, showMessage: showQuestionEdit });
  };

  useEffect(() => {
    editHandle(id);
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

EditQuestion.propTypes = {
  id: PropTypes.string,
  componentData: PropTypes.shape({}),
  activeGameDetails: PropTypes.arrayOf(PropTypes.shape({})),
  showQuestionEdit: PropTypes.bool,
  onCancel: PropTypes.func,
  getQuestions: PropTypes.func,
};

EditQuestion.defaultProps = {
  id: null,
  componentData: null,
  activeGameDetails: null,
  showQuestionEdit: false,
  onCancel: null,
  getQuestions: null,
};

export default EditQuestion;
