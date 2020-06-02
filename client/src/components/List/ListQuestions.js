import React, { useEffect, useState, Fragment } from "react";
import ListTable from "../ListTable";
import DialogBox from "../DialogBox/DialogBox";
import {
  getChoices,
  getQuestions,
  deleteQuestion,
  updateQuestion,
  addQuestion,
  getChoiceLinkingQuestion,
} from "./utility";

const ListQuestions = ({ activeGame, activeGameDetails }) => {
  // Question Table Headers
  const questionTableColumns = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "Question",
      selector: "question_statement",
      sortable: true,
    },
    {
      name: "Difficulty Level",
      selector: "difficulty_level",
      sortable: true,
    },
    {
      name: "Weight",
      selector: "weight",
      sortable: true,
    },
    {
      name: "",
      selector: "second_weight",
      sortable: false,
    },/* ,
    {
      name: "Explanation",
      selector: "explanation",
      sortable: true
    } */
  ];

  const [questionsData, setQuestionsData] = useState({
    questions: [{}],
    gameId: activeGame,
    questionId: null,
    questionDetail: {
      difficulty_level: "",
      question_statement: "",
    },
    choices: [],
    choicesNameArray: [],
    correctChoice: "",
    scenarioFields: [],
    scenarioEditFields: [],
    previousQuestionText: "",
    previousChoiceText: "",
    weight: "",
    second_weight: "",
  });

  useEffect(() => {
    refreshQuestionList();
  }, []);
  const {
    questions,
    gameId,
    questionDetail,
    choices,
    correctChoice,
    choicesNameArray,
    questionId,
    scenarioFields,
    scenarioEditFields,
    previousQuestionText,
    previousChoiceText,
    weight,
    second_weight,
  } = questionsData;

  const populateQuestions = data => {
    data.map(obj =>
      obj.isitmedia === 1 ? (obj.isitmedia = "yes") : (obj.isitmedia = "no")
    );
    setQuestionsData({
      ...questionsData,
      questions: data,
      gameId: activeGame,
    });
  };

  const refreshQuestionList = () => {
    getQuestions(activeGame, populateQuestions);
  };

  if (gameId !== activeGame) {
    refreshQuestionList();
  }

  const deleteHandle = questionId => {
    const r = window.confirm("Are you sure you want to delete the Question ?");
    if (r === true) {
      deleteQuestion(questionId, refreshQuestionList);
    } else {
      
    }
  };

  const updateHandle = (data = "", id) => {
    const answers = [];
    if (data) {
      data.options.map((item, index) => {
        answers.push({ option: convertChoice(index), value: item });
      });
    }
    data.options = answers;
    updateQuestion(data, id, function() {
      setPopupState({ ...popupState, showMessage: false });
      refreshQuestionList();
    });
  };

  const convertChoice = value => {
    return String.fromCharCode(value + 65);
  };

  //   Questions and choices

  const [popupState, setPopupState] = useState({
    showMessage: false,
    confirmButtonValue: "Update",
    messageTitle: "",
    messageDescription: "",
    onConfirm: updateHandle,
    isConfirmation: true,
    title: "Question detail",
    messageBox: false,
    edit: false,
    create: false,
    onDelete: null,
    removeMessage: false,
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
    removeMessage,
  } = popupState;

  let activeGameName;
  let activeGameType;
  activeGameDetails &&
    activeGameDetails.map(item => {
      if (item.key === "Name") {
        activeGameName = item.value;
      }
      if (item.key === "Game Type") {
        activeGameType = item.value;
      }
    });

  //   Pop up form data - Edit Question
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
        key: "options",
        type: "options",
        title: "answers",
        value: choicesNameArray,
      },
      {
        key: "answers",
        type: "choice",
        title: "Current choice",
        value: correctChoice,
      },
      {
        key: "weight",
        type: "text",
        title: "Weight",
        value: weight,
	editable: false,
      },
    ],
  };

  const onCancel = () => {
    setPopupState({ ...popupState, showMessage: false });
  };

  const populateChoices = (data, selectedQuestion) => {
    const choicesName = [];
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
      correctChoice,
      weight: selectedQuestion.weight,
      second_weight: selectedQuestion.second_weight,
    });
  };

  const editHandle = id => {
    debugger;
    const selectedQuestion = questions.find(item => {
      return item.id === id;
    });
    getChoices(id, selectedQuestion, populateChoices);
    setPopupState({
      showMessage: true,
      confirmButtonValue: "Update",
      messageTitle: "",
      messageDescription: "",
      onConfirm: updateHandle,
      isConfirmation: true,
      title: "Question detail",
      messageBox: false,
      edit: true,
      create: false,
      onDelete: null,
      removeMessage: false,
    });
  };

  //   ADD A NEW QUESTION

  const fields = [
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
      editable: true,
      value: "",
    },
    {
      key: "question",
      type: "text",
      title: "Question",
      multiline: true,
      editable: true,
      value: "",
    },
    {
      key: "weight",
      type: "text",
      title: "Weight",
      editable: true,
      value: "",
    },
    {
      key: "options",
      type: "options",
      title: "answers",
      value: ["", "", "", ""],
    },
    {
      type: "choice",
      title: "Correct choice",
      value: "",
      editable: true,
      key: "answers",
    },
  ];

  // const setChoicesForSelectedQuestion = choices => {
  //   for (let i = 0; i < scenarioFields.length; i++) {
  //     if (scenarioFields[i].key === "previous_question_choice") {
  //       // Insert choices data
  //       scenarioFields[i].options = choices.map(choice => {
  //         return { id: choice.id, title: choice.choicestatement };
  //       });
  //     }
  //   }
  //   setQuestionsData({ ...questionsData, scenarioFields: scenarioFields });
  // };

  // const handleChangeQuestion = e => {
  //   let questionId = e.target.value;
  //   getChoices(questionId, null, setChoicesForSelectedQuestion);
  // };

  const saveQuestion = (data = "") => {
    // return;
    const answers = [];
    if (data) {
      data.options.map((item, index) => {
        answers.push({ option: convertChoice(index), value: item });
      });
    }
    data.options = answers;
    data.game_id = activeGame;
    // return;
    addQuestion(data, function() {
      setPopupState({ ...popupState, showMessage: false });
      refreshQuestionList();
    });
  };

  const previousQuestions = questions.map(item => {
    return { id: item.id, title: item.question_statement };
  });
  previousQuestions.unshift({ id: "", title: "Select Question" });

  const addQuestionHandle = e => {
    if (activeGameType === "scenario") {
      const scenario_data = [
        {
          key: "game",
          type: "text",
          title: "Game",
          value: activeGameName,
        },
        {
          key: "previous_question",
          type: "dropdown",
          title: "Select Previous Question",
          options: previousQuestions,
          value: "",
          editable: true,
        },
        {
          key: "previous_question_choice",
          type: "dropdown",
          title: "Select Previous Question Choice",
          options: [{ id: "", title: "Select Previous Question First" }],
          value: "",
          editable: true,
        },
        {
          key: "level",
          type: "text",
          title: "Level",
          editable: true,
          value: "",
        },
        {
          key: "question",
          type: "text",
          title: "Question",
          multiline: true,
          editable: true,
          value: "",
        },
        {
          key: "options",
          type: "options",
          title: "answers",
          value: ["", ""],
        },
        {
          key: "weight",
          type: "text",
          title: "Weight for Choice A",
          editable: true,
          value: "",
        },
        {
          key: "second_weight",
          type: "text",
          title: "Weight for Choice B",
          editable: true,
          value: "",
        },
      ];

      setQuestionsData({ ...questionsData, scenarioFields: scenario_data });
    }

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
      isRemove: false,
    });
  };

  const scenario_edit_data = {
    id: questionId,
    values: [
      {
        key: "game",
        type: "text",
        title: "Game",
        value: activeGameName,
      },
      {
        key: "previous_question",
        type: "text",
        title: "Previous Question",
        value: previousQuestionText,
      },
      {
        key: "previous_question_choice",
        type: "text",
        title: "Previous Question Choice",
        value: previousChoiceText,
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
        key: "options",
        type: "options",
        title: "answers",
        value: choicesNameArray,
      },
      {
        key: "weight",
	type: "text",
	title: "Weight for Choice A",
	editable: false,
	value: questionDetail.weight,
      },
      {
        key: "second_weight",
        type: "text",
        title: "Weight for Choice B",
        editable: false,
        value: questionDetail.second_weight,
      },
    ],
  };

  let choice_linked;
  let choice_name;
  let selected_question;

  const getQuestionLinkedToChoice = choice => {
    if (choice.length > 0) {
      const previousQuestionId = choice[0].QuestionId;
      const previousQuestion = questions.find(question => {
        return question.id === previousQuestionId;
      });

      setQuestionsData({
        ...questionsData,
        choices: choice_linked,
        choicesNameArray: choice_name,
        questionDetail: selected_question,
        questionId: selected_question.id,
        previousChoiceText: choice[0].choicestatement,
        previousQuestionText: previousQuestion.question_statement,// ,
	// weight: weight,
	// second_weight: second_weight
      });
    } else {
      setQuestionsData({
        ...questionsData,
        choices: choice_linked,
        choicesNameArray: choice_name,
        questionDetail: selected_question,
        questionId: selected_question.id,
        previousChoiceText: "NA",
        previousQuestionText: "No Linked Question Found",
        weight: "",
	second_weight: "",
      });
    }
  };

  const getChoiceLinkedToQuestion = (
    choices,
    choicesName,
    selectedQuestion
  ) => {
    choice_linked = choices[0];
    choice_name = choicesName;
    selected_question = selectedQuestion;
    getChoiceLinkingQuestion(selectedQuestion.id, getQuestionLinkedToChoice);
  };

  const populateScenarioChoices = (data, selectedQuestion) => {
    // return;
    const choicesName = [];
    // let correctChoice = "";
    data.map((item, index) => {
      item.option = convertChoice(index);
      choicesName.push(item.choicestatement);
      // if (item.answer === 1) {
      //   correctChoice = convertChoice(index);
      // }
    });

    getChoiceLinkedToQuestion(data, choicesName, selectedQuestion);
  };

  const editScenarioHandle = id => {
    try {
      if (activeGameType === "scenario") {
        const previousQuestions = questions.map(item => {
          return { id: item.id, title: item.question_statement };
        });
        previousQuestions.unshift({ id: "", title: "Select Question" });
        const selectedQuestion = questions.find(item => {
          return item.id === id;
        });
        getChoices(id, selectedQuestion, populateScenarioChoices);

        setQuestionsData({
          ...questionsData,
          scenarioEditFields: scenario_edit_data,
        });
      }
      setPopupState({
        showMessage: true,
        confirmButtonValue: "Update",
        messageTitle: "",
        messageDescription: "",
        onConfirm: updateHandle,
        isConfirmation: true,
        title: "Question detail",
        messageBox: false,
        edit: true,
        create: false,
        onDelete: null,
        removeMessage: false,
      });
    } catch (error) {
      console.error("Problem", error); // eslint-disable-line
    }
  };

  let hasChoices = true;
  const dialogboxData = () => {
    if (create) {
      if (activeGameType === "scenario") {
        return scenarioFields;
      } 
        return fields;
      
    } if (edit) {
      if (activeGameType === "scenario") {
        hasChoices = false;
        // return scenarioEditFields;
        return scenario_edit_data;
      } 
        return data;
      
    }
    // create ? (activeGameType === "scenario" ? scenarioFields : fields) : data;
  };

  return (
    <>
      {(edit || create) && (
        <DialogBox
          confirmButtonValue={confirmButtonValue}
          showMessage={showMessage}
          messageTitle={messageTitle}
          messageDescription={messageDescription}
          onConfirm={onConfirm}
          isConfirmation={isConfirmation}
          onCancel={onCancel}
          title={title}
          data={dialogboxData()}
          // data={create ? scenarioFields : data}
          messageBox={messageBox}
          edit={edit}
          create={create}
          onDelete={onDelete}
          removeMessage={removeMessage}
          hasChoices={hasChoices}
        />
      )}
      <div className="float-right" onClick={e => addQuestionHandle(e)}>
        <button className="btn btn-info btn-sm">
          <i className="fa fa-plus" />
        </button>
        <span> Add Question</span>
      </div>
      <ListTable
        tableData={{
          columns: questionTableColumns,
          title: "List of Questions",
          hasActionBtns: true,
          data: questions,
          deleteHandle,
          editHandle:
            activeGameType === "scenario" ? editScenarioHandle : editHandle,
        }}
      />
    </>
  );
};

export default ListQuestions;
