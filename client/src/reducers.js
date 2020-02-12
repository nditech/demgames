import { combineReducers } from "redux";
import landingPageReducer from "./pages/LandingPage/reducers";
import LandingPage from "./pages/LandingPage/LandingPage";
import landingPageAuthReducer from "./pages/LandingPage/reducerAuth";
import profileinfoReducer from "./components/ProfileInfo/reducers";

export const rootReducer = combineReducers({
  gameData: landingPageReducer,
  authDetail: landingPageAuthReducer,
  scoreDetail: profileinfoReducer
});

export default rootReducer;
