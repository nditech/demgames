import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import profileUrl from "../../images/profile.png";
import arrowBackUrl from "../../images/back.png";
import editUrl from "../../images/edit.png";
import changePassUrl from "../../images/changePass.svg";
import PropTypes from "prop-types";
import Auth from "../../Auth";
import { connect } from "react-redux";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";

import "./styles.scss";

const ProfileInfo = props => {
  return (
    <Fragment>
      <div className="profile-page">
        <div className="profile-header">
          <ProfileHeader />
        </div>
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
                        <th>Cohort Rank</th>
                        <th>Global Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John</td>
                        <td>20pts</td>
                        <td>13542</td>
                        <td>43487</td>
                      </tr>
                      <tr>
                        <td>Mary</td>
                        <td>60pts</td>
                        <td>87542</td>
                        <td>64387</td>
                      </tr>
                      <tr>
                        <td>July</td>
                        <td>140pts</td>
                        <td>67542</td>
                        <td>98487</td>
                      </tr>
                      <tr>
                        <td>July</td>
                        <td>140pts</td>
                        <td>67542</td>
                        <td>98487</td>
                      </tr>
                      <tr>
                        <td>July</td>
                        <td>140pts</td>
                        <td>67542</td>
                        <td>98487</td>
                      </tr>
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
