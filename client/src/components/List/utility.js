// Get all the choices related to a question
import { config } from "../../settings";
import { ToastContainer, toast } from "react-toastify";

export const getChoices = async (
  questionId,
  selectedQuestion = null,
  callbackFunction
) => {
  const url = config.baseUrl + `/choices/${questionId}`;
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
  const url = config.baseUrl + `/choiceLinkingQuestion/${questionId}`;
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
  const url = config.baseUrl + `/listquestions/${gameId}`;
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
  let url = config.baseUrl + "/addquestion/";
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
      toast.info("Successfully Added !", {
        position: toast.POSITION.TOP_CENTER
      });
      callbackFunction();
    })
    .catch(err =>
      toast.error("Sorry...some technical issue !", {
        position: toast.POSITION.TOP_CENTER
      })
    );
};

// Update Question
export const updateQuestion = (data = "", id, callbackFunction) => {
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
      toast.info("Updated Successfully !", {
        position: toast.POSITION.TOP_CENTER
      });
      callbackFunction();
    })
    .catch(error =>
      toast.error("Sorry...some technical issue !", {
        position: toast.POSITION.TOP_CENTER
      })
    );
};

// Delete a question based on ID
export const deleteQuestion = (questionId, callbackFunction) => {
  if (window.confirm("Are you sure you want to delete the question")) {
    let url = config.baseUrl + "/questions/" + questionId;
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
        toast.info("Deleted Successfully !", {
          position: toast.POSITION.TOP_CENTER
        });
        callbackFunction();
      })
      .catch(error =>
        toast.error("Sorry...some technical issue !", {
          position: toast.POSITION.TOP_CENTER
        })
      );
  }
};

// Add a New Cohort
export const addCohort = (data, callbackFunction) => {
  const formData = new FormData();

  formData.append("file", data.logo, data.logo.name);
  formData.append("name", data.name);
  console.log("File" + data.logo + data.logo.name);
  console.log(formData);

  let url = config.baseUrl + "/AddCohort/";
  fetch(url, {
    method: "POST",
    headers: {
      authorization: "Bearer " + localStorage.getItem("access_token")
    },
    body: formData
  })
    .then(res => {
      if (res.status == 400) {
        throw new Error();
      }
      return res.json();
    })
    .then(data => {
      toast.info("Successfully Added !", {
        position: toast.POSITION.TOP_CENTER
      });
      callbackFunction();
    })
    .catch(error =>
      toast.error("Sorry...some technical issue here!", {
        position: toast.POSITION.TOP_CENTER
      })
    );
};

// Delete a cohort based on ID
export const deleteCohort = (cohort_id, callbackFunction) => {
  let url = config.baseUrl + "/DeleteCohort/";
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
      if (JSON.stringify(data.message) === JSON.stringify("Server Error")) {
        toast.error("Sorry...some technical issue !", {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        toast.info("Deleted Successfully !", {
          position: toast.POSITION.TOP_CENTER
        });
      }
      callbackFunction();
    })
    .catch(error =>
      toast.error("Sorry...some technical issue !", {
        position: toast.POSITION.TOP_CENTER
      })
    );
};

// Update Cohort
export const updateCohort = (name = "", logo = null, id, callbackFunction) => {
  let url = config.baseUrl + "/updatecohort/";
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
      toast.info("Updated Successfully !", {
        position: toast.POSITION.TOP_CENTER
      });
      callbackFunction();
    })
    .catch(error =>
      toast.error("Sorry...some technical issue !", {
        position: toast.POSITION.TOP_CENTER
      })
    );
};

// Update Player
export const updatePlayer = (data, id, callbackFunction) => {
  let url = config.baseUrl + "/updateUser/";
  fetch(url, {
    method: "POST",
    headers: {
      authorization: "Bearer " + localStorage.getItem("access_token"),
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      program: data.program,
      id: id,
      gender: data.gender,
      lastname: data.lastname,
      firstname: data.firstname,
      country: data.country,
      city: data.city,
      email: data.email,
      dateofbirth: data.dateofbirth,
      username: data.username
    })
  })
    .then(res => res.json())
    .then(data => {
      toast.info("Updated Successfully !", {
        position: toast.POSITION.TOP_CENTER
      });
      callbackFunction();
    })
    .catch(error =>
      toast.error("Sorry...some technical issue !", {
        position: toast.POSITION.TOP_CENTER
      })
    );
};

// Delete player
export const deletePlayer = (id, callbackFunction) => {
  let url = config.baseUrl + "/DeleteUser/";
  fetch(url, {
    method: "POST",
    headers: {
      authorization: "Bearer " + localStorage.getItem("access_token"),
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id })
  })
    .then(res => res.json())
    .then(data => {
      if (JSON.stringify(data.message) === JSON.stringify("Server Error")) {
        toast.error("Sorry...some technical issue !", {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        toast.info("Deleted Successfully !", {
          position: toast.POSITION.TOP_CENTER
        });
      }
      callbackFunction();
    })
    .catch(error =>
      toast.error("Sorry...some technical issue !", {
        position: toast.POSITION.TOP_CENTER
      })
    );
};