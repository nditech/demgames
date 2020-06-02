// Get all the choices related to a question
import { ToastContainer, toast } from 'react-toastify';
import { config } from "../../settings";

export const getChoices = async (
  questionId,
  selectedQuestion = null,
  callbackFunction
) => {
  const url = `${config.baseUrl  }/choices/${questionId}`;
  await fetch(url, {
    method: "get",
    headers: {
      authorization: `Bearer ${  localStorage.getItem("access_token")}`,
      "Content-Type": "Application/json",
      Accept: "application/json",
    },
  })
    .then(res => res.json())
    .then(data => {
      callbackFunction(data, selectedQuestion);
    })
    .catch(err => console.log(err)); // eslint-disable-line
};

// Get the choices referencing(linking) a Quesion
export const getChoiceLinkingQuestion = (questionId, callbackFunction) => {
  const url = `${config.baseUrl  }/choiceLinkingQuestion/${questionId}`;
  fetch(url, {
    method: "get",
    headers: {
      authorization: `Bearer ${  localStorage.getItem("access_token")}`,
      "Content-Type": "Application/json",
      Accept: "application/json",
    },
  })
    .then(res => res.json())
    .then(data => {
      callbackFunction(data);
    })
    .catch(err => console.log(err)); // eslint-disable-line
};

// Get all the questions related to a game
export const getQuestions = (gameId, callbackFunction) => {
  const url = `${config.baseUrl  }/listquestions/${gameId}`;
  fetch(url, {
    method: "get",
    headers: {
      authorization: `Bearer ${  localStorage.getItem("access_token")}`,
      "Content-Type": "Application/json",
      Accept: "application/json",
    },
  })
    .then(res => res.json())
    .then(data => {
      callbackFunction(data);
    })
    .catch(err => console.log(err)); // eslint-disable-line
};

// Add a New Question
export const addQuestion = (data, callbackFunction) => {
  const url = `${config.baseUrl  }/addquestion/`;
  fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${  localStorage.getItem("access_token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })
    .then(res => res.json())
    .then(data => {
      toast.info("Successfully Added !", {
        position: toast.POSITION.TOP_CENTER,
      });
      callbackFunction();
    })
    .catch(err=>toast.error("Sorry...some technical issue !", {
      position: toast.POSITION.TOP_CENTER,
    }));
};

// Update Question
export const updateQuestion = (data = "", id, callbackFunction) => {
  const url = `${config.baseUrl  }/updatequestion/`;
  fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${  localStorage.getItem("access_token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data, id }),
  })
    .then(res => res.json())
    .then(data => {
      toast.info("Updated Successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
      callbackFunction();
    })
    .catch(error => toast.error("Sorry...some technical issue !", {
      position: toast.POSITION.TOP_CENTER,
    }));
};

// Delete a question based on ID
export const deleteQuestion = (questionId, callbackFunction) => {
  if (window.confirm("Are you sure you want to delete the question")) {
    const url = `${config.baseUrl  }/questions/${  questionId}`;
    fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${  localStorage.getItem("access_token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionId }),
    })
      .then(res => res.json())
      .then(data => {
        toast.info("Deleted Successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
        callbackFunction();
      })
      .catch(error => toast.error("Sorry...some technical issue !", {
        position: toast.POSITION.TOP_CENTER,
      }));
  }
};

// Add a New Cohort
export const addCohort = (data, callbackFunction) => {
  const url = `${config.baseUrl  }/AddCohort/`;
  fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${  localStorage.getItem("access_token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: data.name }),
  })
    .then(res => {
      if(res.status == 400){
        throw new Error();
      }
      return res.json();
    }).then(data => {
      toast.info("Successfully Added !", {
        position: toast.POSITION.TOP_CENTER,
      });
      callbackFunction();
    })
    .catch(error => toast.error("Sorry...some technical issue !", {
      position: toast.POSITION.TOP_CENTER,
    }));
};

// Delete a cohort based on ID
export const deleteCohort = (cohort_id, callbackFunction) => {
  const url = `${config.baseUrl  }/DeleteCohort/`;
  fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${  localStorage.getItem("access_token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cohort_id }),
  })
    .then(res => res.json())
    .then(data => {
      
      if(JSON.stringify(data.message) === JSON.stringify("Server Error")) {
        toast.error("Sorry...some technical issue !", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.info("Deleted Successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
     }
      callbackFunction();
    })
    .catch(error => toast.error("Sorry...some technical issue !", {
      position: toast.POSITION.TOP_CENTER,
    }));
};

// Update Cohort
export const updateCohort = (name = "", id, callbackFunction) => {
  const url = `${config.baseUrl  }/updatecohort/`;
  fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${  localStorage.getItem("access_token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, id }),
  })
    .then(res => res.json())
    .then(data => {
      toast.info("Updated Successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
      callbackFunction();
    })
    .catch(error => toast.error("Sorry...some technical issue !", {
      position: toast.POSITION.TOP_CENTER,
    }));
};

// Update Player
export const updatePlayer = (data, id, callbackFunction) => {
  const url = `${config.baseUrl  }/updateUser/`;
  fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${  localStorage.getItem("access_token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      program: data.program, 
      id,
      gender : data.gender,
      country : data.country,
    }),
  })
    .then(res => res.json())
    .then(data => {
      toast.info("Updated Successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
      callbackFunction();
    })
    .catch(error => toast.error("Sorry...some technical issue !", {
      position: toast.POSITION.TOP_CENTER,
    }));
};

// Delete player
export const deletePlayer = (id, callbackFunction) => {
  const url = `${config.baseUrl  }/DeleteUser/`;
  fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${  localStorage.getItem("access_token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then(res => res.json())
    .then(data => {
      
      if(JSON.stringify(data.message) === JSON.stringify("Server Error")) {
        toast.error("Sorry...some technical issue !", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.info("Deleted Successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
     }
      callbackFunction();
    })
    .catch(error => toast.error("Sorry...some technical issue !", {
      position: toast.POSITION.TOP_CENTER,
    }));
};
