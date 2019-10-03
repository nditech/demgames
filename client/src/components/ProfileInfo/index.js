import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileUrl from "../../images/profile.png";
import { connect } from "react-redux";
import moment from "moment";

import "./styles.scss";

const ProfileInfo = props => {
  console.log("player email", props.player.player_email);
  let userEmail = props.player.player_email;

  const [profileData, setProfileData] = useState({
    progressData: []
  });

  const { progressData } = profileData;

  const getPlayerProfile = async (email, callbackFunction) => {
    const url = `http://localhost:9000/user/get_profile/${email}`;
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
        console.log("profile data -->", JSON.stringify(data));
        callbackFunction(data);
      })
      .catch(err => console.log(err));
  };

  const setPlayerProgress = data => {
    let filteredData = data.map(item => {
      return {
        gameName: item["Game.caption"],
        score: item.score,
        cohort: item["Cohort.name"],
        cohort_id: item["Cohort.id"],
        playdate: item.playstartdate
      };
    });
    console.log("fil data", filteredData);
    setProfileData({ ...profileData, progressData: filteredData });
  };

  useEffect(() => {
    getPlayerProfile(userEmail, setPlayerProgress);
  }, []);

  const filterProgressData = data => {};

  console.log("progress data", progressData);

  return (
    <Fragment>
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
                  <h4 className="card-title text-primary">{`${props.player
                    .player_given_name || ""} ${props.player
                    .player_family_name || ""}`}</h4>
                  <p className="card-text mb-1 mt-3 text-secondary">
                    {"Email : "}
                    {props.player.player_email || ""}
                  </p>
                  <p className="card-text mt-0 text-secondary">
                    {"User Name : "}
                    {props.player.player_username || ""}
                  </p>

                  <Link to="editprofile" className="btn btn-primary w-100 mt-3">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-8 text-center">
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
                      {progressData &&
                        progressData.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.gameName}</td>
                              <td>{item.score}</td>
                              <td>{item.cohort}</td>
                              <td>
                                {moment(item.playdate).format(
                                  "Do MMM YYYY, h:mm:ss a"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  player: state.authDetail.authDetail
});

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
export default connect(
  mapStateToProps,
  null
)(ProfileInfo);
