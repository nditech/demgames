import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import profileUrl from "../../images/profile.png";
import { config } from "../../settings";

import "./styles.scss";

const ProfileInfo = props => {
  let profileProgressData = null;
  const userEmail = props.player.player_email;

  const [profileData, setProfileData] = useState({
    progressData: [],
    cohortRank: "0",
    globalRank: "0",
    cohorts: [],
  });

  const {
    progressData, cohortRank, globalRank, cohorts,
  } = profileData;

  const getPlayerProfile = async (email) => {
    const url = `${config.baseUrl}/user/get_profile/${email}`;
    await fetch(url, {
      method: "get",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        profileProgressData = data;
      })
      .catch(err => console.log(err)); // eslint-disable-line
  };

  const getCohort = async () => {
    const url = `${config.baseUrl}/listCohort`;
    await fetch(url, {
      method: "get",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        getRank(data[0].id, data);
      })
      .catch(err => console.log(err)); // eslint-disable-line
  };

  const setRank = (rankObject, cohortsToSet, changeCohort = false) => {
    let filteredData = progressData;
    if (!changeCohort) {
      filteredData = profileProgressData.map(item => ({
        gameName: item["Game.caption"],
        score: item.score,
        cohort: item["Cohort.name"],
        cohort_id: item["Cohort.id"],
        playdate: item.playstartdate,
      }));
    }
    setProfileData({
      ...profileData,
      progressData: filteredData,
      cohortRank: rankObject.cohort_rank,
      globalRank: rankObject.global_rank,
      cohorts: cohortsToSet,
    });
  };

  const getRank = (cohortId, cohortsToSet, changeCohort = false) => {
    const url = `${config.baseUrl}/get_cohort_rank/${userEmail}/${cohortId}`;
    fetch(url, {
      method: "get",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setRank(data, cohortsToSet, changeCohort);
      })
      .catch(err => console.log(err)); // eslint-disable-line
  };

  const handleCohortChange = e => {
    const cohortId = e.target.value;
    getRank(cohortId, cohorts, true);
  };

  useEffect(() => {
    getPlayerProfile(userEmail);
    getCohort(userEmail);
  }, []);

  return (
    <>
      <div className="profile-page">
        <div className="container profile-content">
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow pt-5">
                <img
                  className="card-img-top img-fluid rounded p-1"
                  src={`${props.player.player_picture || profileUrl}`}
                />
                <div className="card-body">
                  <h4 className="card-title text-primary">
                    {`${props.player
                      .player_given_name || ""} ${props.player
                      .player_family_name || ""}`}
                  </h4>
                  <p className="card-text mb-1 mt-3 text-secondary">
                    {"Email : "}
                    {props.player.player_email || ""}
                  </p>
                  <p className="card-text mt-0 text-secondary">
                    {"User Name : "}
                    {props.player.player_username || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-8 text-center">
              <div className="row card-row">
                <div className="col-md-6 shadow bg-primary text-white">
                  <select
                    name="cohorts"
                    className="custom-select mt-3"
                    onChange={e => handleCohortChange(e)}
                  >
                    {cohorts.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className="card-body text-center">
                    <h2>Cohort Rank</h2>
                  </div>
                  <div className="text-center mb-4">
                    <h3>{cohortRank}</h3>
                  </div>
                </div>

                <div className="col-md-6 shadow bg-primary text-white">
                  <div className="card-body text-center">
                    <h2>Global Rank</h2>
                  </div>
                  <div className="text-center mb-4">
                    <h3>{globalRank}</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="shadow progress-status">
                    <div className="jumbotron">
                      <h1>Your Progress</h1>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Game</th>
                            <th>Score</th>
                            <th>Cohort</th>
                            <th>Play Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {progressData
                            && progressData.map((item) => (
                              <tr key={item.playdate}>
                                <td>{item.gameName}</td>
                                <td>{item.score}</td>
                                <td>{item.cohort}</td>
                                <td>
                                  {moment(item.playdate).format(
                                    "Do MMM YYYY, h:mm:ss a",
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  player: state.authDetail.authDetail,
});

ProfileInfo.propTypes = {
  player: PropTypes.shape({
    player_email: PropTypes.string.isRequired,
    player_picture: PropTypes.string.isRequired,
    player_given_name: PropTypes.string.isRequired,
    player_family_name: PropTypes.string.isRequired,
    player_username: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(ProfileInfo);
