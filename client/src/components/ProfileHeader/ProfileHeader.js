import React from "react";
// import { Redirect } from "react-router-dom";
import NdiLogoUrl from "../../images/ndiLogo.png";
import { withRouter } from "react-router";
import { Dropdown, Image } from "semantic-ui-react";
import profileUrl from "../../images/profile.png";
import { connect } from "react-redux";
import { clearAuthDetails } from "../../pages/LandingPage/actions";
import Auth from "../../Auth";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { Redirect } from 'react-router';
import { createHistory } from 'history'
import { config } from "../../settings";
import { updateRouteDetail } from "../../components/ProfileInfo/action";

const auth0 = new Auth();

//let history = createHistory();
//const ProfileHeader = props => {
class ProfileHeader extends React.Component {  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      const path = window.location.pathname;
      const slicedPath = path.slice(1);
      const pushedPath = slicedPath.split("/");

      
      if(pushedPath[0]==="/")
      {    
          console.log(window.location.href+" is different from Profile mount to :- "+pushedPath[0]);
          //getCohortAssign(pushedPath.split('/')[1]);
      }
      else if (pushedPath[0]==="")
      {  
          console.log(window.location.href+" Profile mount to:-"+pushedPath[0]);
          this.getCohortAssign("demo");
      }
      else if (pushedPath[0]==="landingpage")
      {  
          console.log(window.location.href+" Profile mount to:-"+pushedPath[0]);
          //getCohortAssign(pushedPath.split('/')[0]);
      }
      else
      {
          console.log(window.location.href+" All different profile mount to:-"+pushedPath[0]);
          if(pushedPath[0]!=="callback")
          {
            this.getCohortAssign(pushedPath[0]);
          }
      } 
      /*
      this.props.history.listen((location, action) => {
          console.log("You changed the page to: " + location.pathname+ "was at"+this.props.routeDetail.name);
          
      });
      */ 
  }  

  getCohortAssign = (cohortName) => {
        //const url = config.baseUrl + "/listCohort";
        fetch(config.baseUrl + "/listCohort/"+ cohortName, {
              method: "get",
              headers: {
                    // authorization: "Bearer " + localStorage.getItem("access_token"),
                    "Content-Type": "Application/json",
                    Accept: "application/json"
              }
        })
        .then(res => res.json())
        .then(data => {
              if(JSON.parse(JSON.stringify(data)).length>0){
                  console.log("We updated the Route Information in Header as "+JSON.stringify(data[0]));
                  //console.log(JSON.parse(JSON.stringify(data[0])));
                  this.props.updateRoute(data[0]);
                  console.log("The updated Route Information in Header is "+JSON.stringify(this.props.routeDetail));
              }
              else if((Array.isArray(JSON.parse(JSON.stringify(data))))&&(JSON.parse(JSON.stringify(data)).length===0))
              {
                  console.log("Array is empty");
                  alert("There is no such Cohort or Subdomain. We will redirect you to the default cohort");
                  window.location.href=window.location.origin;
              }
              else
              {   
                  console.log("There is no update to the Route Information in Header ");
              }
        })
        .catch(err => console.log(err));
  };

  componentWillUnmount() {
      //this.unlisten()
      //window.removeEventListener("hashchange", console.log("Profile mount:-"+window.location.pathname), false);
  }
    
 //handle Login in action
  handleLogIn = () => {
    if (!auth0.isAuthenticated()) {
      auth0.login();
    }
  };

  //handle Logout in action
  handleLogOut = () => {
    if (auth0.isAuthenticated()) {
      this.props.authDetail.player_given_name = "";
      this.props.authDetail.player_family_name = "";
      this.props.authDetail.player_email = "";
      this.props.authDetail.player_username = "";
      this.props.authDetail.player_picture = "";
      this.props.authDetail.player_gender = "";
      console.log(this.props.authDetail);
      this.props.clearAuth(this.props.authDetail);
      auth0.logout();
      window.location.href=window.location.origin+"/"+this.props.routeDetail.name;
    }
  };

  getCohort = () => {
    //const url = config.baseUrl + "/listCohort";
    fetch(config.baseUrl + "/listCohort", {
            method: "get",
            headers: {
                // authorization: "Bearer " + localStorage.getItem("access_token"),
                "Content-Type": "Application/json",
                Accept: "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            const DataUpdate = [];
            Object.keys(data).map((Val, i) => {
                DataUpdate.push({
                    id: data[i].id,
                    name: ( <
                        a href = { window.location.origin + "/" + data[i].name + "/landingpage" }
                        target = "_self"
                        onClick = {
                            e => {
                                  console.log(data[i]);
                                  this.props.updateRoute(data[i]);
                                  console.log(this.props.scoreDetail);
                            }
                        } > { data[i].name } 
                        </a>
                    ),
                    logo: ( <
                        a href = { window.location.origin + "/" + data[i].logo }
                        target = "new"
                        onClick = {
                            e => {
                                console.log(data[i]);
                                this.props.updateRoute(data[i]);
                                console.log(this.props.scoreDetail);
                            }
                        } > { data[i].logo.split("/")[1].split(".")[0] } 
                        </a>
                    )
                });
                console.log("Received " + JSON.stringify(DataUpdate) + data[i].logo);
            });
            setCohortData({...cohortData, cohort: DataUpdate });
        })
        .catch(err => console.log(err));
  };

  getLogoPath = () => {
    
    try {
            let LOCATION = window.location.href;

            if (LOCATION.search("landingpage")>0){
              console.log("Has Landing Page "+window.location.href)
            }
                
            let cohort_name = (window.location.pathname.split("/landingpage")[0].split("/")[1]||this.props.routeDetail.name);
            console.log(cohort_name+" "+window.location.pathname.split("/landingpage")[0].split("/")[1]);
            
            fetch(config.baseUrl + "/listCohort/"+cohort_name, {
                method: "get",
                headers: {
                    // authorization: "Bearer " + localStorage.getItem("access_token"),
                    "Content-Type": "Application/json",
                    Accept: "application/json"
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
           
            if (cohort_name === "demo") {
              return "/client/src/images/ndiLogo.png";
            } else {
              return "/"+ this.props.cohortData.logo;
            } 
          //}

    } catch (err) {
          return "/client/src/images/ndiLogo.png";
    }
    
   // console.log(props.gameData.cohortData.logo);
  //  return "/"+props.gameData.cohortData.logo;
  };

  handleAdmin = () => {
    //console.log(props.history.location);
    this.props.history.push(`/${this.props.routeDetail.name}/admin`);
  };

  handleProfile = () => {
      console.log("profile clicked");
      this.props.history.push(`/${this.props.routeDetail.name}/profile`);
  };
  
  render(){
    
    let trigger;
    let options = [];  
    
    if (
      this.props.location.pathname.includes("/landingpage") &&
      this.props.location.pathname.length >= 14
    ){
      auth0.setCohort(this.props.location.pathname);
      
    }

    if (auth0.isAuthenticated()) {
      trigger = (
        <span>
          <Image avatar src={`${profileUrl}`} />{" "}
          {`${this.props.player_given_name || ""} ${this.props.player_family_name || ""}`}
        </span>
      );
      options = [
        {
          key: "profile",
          text: "Profile",
          icon: "user",
          onClick: this.handleProfile
        },
        {
          key: "sign-out",
          text: "Sign Out",
          icon: "sign out",
          onClick: this.handleLogOut
        }
      ];
  
      if (
        auth0.getProfile() &&
        auth0.getProfile()["http://demGames.net/roles"] &&
        auth0.getProfile()["http://demGames.net/roles"][0] === "admin"
      ) {
        options.unshift({
          key: "adminPage",
          text: "Admin Page",
          icon: "settings",
          onClick: this.handleAdmin
        });
      }
    } else {
      trigger = (
        <span>
          <Image avatar src={profileUrl} /> {`Hello. Sign In`}
        </span>
      );
      options = [
        {
          key: "login",
          text: "Login / Sign Up",
          icon: "user",
          onClick: this.handleLogIn
        }
      ];
    }

    return (
      <div className="main-header">
        <div className="logo-header">
          <img className="company-logo" src={this.getLogoPath()} alt="ndi-logo" />
        </div>
        <div className="profile-header">
          <a
            href={this.props.routeDetail.name != null ? `/${this.props.routeDetail.name}` : "/landingpage"}
            style={{ verticalAlign: "middle", paddingRight: "30px" }}
          >
            <Icon>home</Icon>{" "}
          </a>
          <Dropdown
            trigger={trigger}
            options={options}
            pointing="top left"
            icon={null}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
          getCohorts:cohortData=>dispatch(fetchCohorts(cohortData)),
          clearAuth: authDetail => dispatch(clearAuthDetails(authDetail)),
          updateRoute: routeDetail => dispatch(updateRouteDetail(routeDetail))
  };
};

const mapStateToProps = state => ({
    gameData: state.gameData,
    cohortData: state.gameData.cohortData,
    routeDetail : state.scoreDetail.routeDetail,
    authDetail: state.authDetail.authDetail
});

ProfileHeader.propTypes={
    getGameData: PropTypes.func,
    getScores: PropTypes.func,
    gameData: PropTypes.object,
    authDetail: PropTypes.object,
    setAuth: PropTypes.func,
    clearAuth: PropTypes.func,
    scoreDetail: PropTypes.object,
    cohortData: PropTypes.object,
    getCohorts: PropTypes.func,
    routeDetail: PropTypes.object,
    updateRoute: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileHeader));