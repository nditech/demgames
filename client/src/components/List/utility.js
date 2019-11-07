// Get all the choices related to a question
export const getChoices = async (
  questionId,
  selectedQuestion = null,
  callbackFunction
) => {
  const url = `http://localhost:9000/choices/${questionId}`;
  await fetch(url, {
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
      callbackFunction(data, selectedQuestion);
    })
    .catch(err => console.log(err));
};

// Get the choices referencing(linking) a Quesion
export const getChoiceLinkingQuestion = (questionId, callbackFunction) => {
  const url = `http://localhost:9000/choiceLinkingQuestion/${questionId}`;
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
      callbackFunction(data);
    })
    .catch(err => console.log(err));
};

// Get all the questions related to a game
export const getQuestions = (gameId, callbackFunction) => {
  const url = `http://localhost:9000/listquestions/${gameId}`;
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
      callbackFunction(data);
    })
    .catch(err => console.log(err));
};

// Add a New Question
export const addQuestion = (data, callbackFunction) => {
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
      callbackFunction();
    })
    .catch(error => console.log(error));
};

// Update Question
export const updateQuestion = (data = "", id, callbackFunction) => {
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
      callbackFunction();
    })
    .catch(error => console.log(error));
};

// Delete a question based on ID
export const deleteQuestion = (questionId, callbackFunction) => {
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
        callbackFunction();
      })
      .catch(error => console.log(error));
  }
};

// Add a New Cohort
export const addCohort = (data, callbackFunction) => {
  let url = "http://localhost:9000/AddCohort/";
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
      callbackFunction();
    })
    .catch(error => console.log(error));
};

// Delete a cohort based on ID
export const deleteCohort = (cohort_id, callbackFunction) => {
  let url = "http://localhost:9000/DeleteCohort/";
  fetch(url, {
    method: "POST",
    headers: {
      authorization: "Bearer " + localStorage.getItem("access_token"),
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cohort_id: cohort_id })
  })
    .then(res => res.json())
    .then(data => {
      alert(JSON.stringify(data));
      callbackFunction();
    })
    .catch(error => console.log(error));
};

// Update Cohort
export const updateCohort = (name = "", id, callbackFunction) => {
  let url = "http://localhost:9000/updatecohort/";
  fetch(url, {
    method: "POST",
    headers: {
      authorization: "Bearer " + localStorage.getItem("access_token"),
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: name, id: id })
  })
    .then(res => res.json())
    .then(data => {
      alert(JSON.stringify(data));
      callbackFunction();
    })
    .catch(error => console.log(error));
};
