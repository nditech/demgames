import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import { ScenarioQuesAns } from './ScenarioQuesAns';
import { gameData } from '../QuestionsAnsPage/data';

Enzyme.configure({ adapter: new Adapter() });
let store;

const defaultProps = {
  // history: createMemoryHistory(),
  gameData: { gameData },
  location: {
    pathname: '/terms', search: '', state: '', hash: '',
  },
  match: {
    params: { moduleId: '1', levelId: 1, questionId: 1 }, isExact: true, path: '/terms', url: '/terms',
  },
};

describe('<ScenarioQuesAns/>', () => {
  beforeEach(() => {
    const mockStore = configureStore();

    store = mockStore({});
  });

  // it('nextQuestion()', () => {
  // 	const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
  // 	expect(wrapper.state('questionId')).toBe(1);
  // 	wrapper.instance().nextQuestion();
  // 	expect(wrapper.state('questionId')).toBe(2);
  // });

  it('handleNextClick()', () => {
    const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
    wrapper.setState({ answerClick: true });
    wrapper.instance().handleNextClick();
    expect(wrapper.state('answerClick')).toBeFalsy();
  });

  it('handleClick() when show answer is true', () => {
    const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
    wrapper.setState({ showAnswer: true });
    wrapper.instance().handleClick();
    expect(wrapper.state('showAnswer')).toBeFalsy();
  });

  it('handleClick() when show answer is false', () => {
    const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
    wrapper.setState({ showAnswer: false });
    wrapper.instance().handleClick();
    expect(wrapper.state('showAnswer')).toBeTruthy();
  });

  it('getProgress()', () => {
    const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
    expect(typeof wrapper.instance().getProgress()).toBe('number');
  });

  it('handleInfoOpen()', () => {
    const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
    wrapper.setState({ infoOpen: false });
    wrapper.instance().handleInfoOpen();
    expect(wrapper.state('infoOpen')).toBeTruthy();
  });

  it('handleInfoClose()', () => {
    const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
    wrapper.setState({ infoOpen: true });
    wrapper.instance().handleInfoClose();
    expect(wrapper.state('infoOpen')).toBeFalsy();
  });

  it('getModuleNames()', () => {
    const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
    expect(Array.isArray(wrapper.instance().getModuleNames())).toBe(true);
  });

  it('getTotalQuestions()', () => {
    const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
    expect(typeof wrapper.instance().getTotalQuestions()).toBe('number');
  });

  it('getParScores()', () => {
    const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
    expect(Array.isArray(wrapper.instance().getModuleNames())).toBe(true);
  });

  // it('handleScenarioProceed()', () => {
  // 	const wrapper = shallow(<ScenarioQuesAns {...defaultProps} />);
  // 	wrapper.setState({ selectedCard: 1, answerClicked: 1, clickedOptions: [ 0, 1, 2 ] });
  // 	wrapper.instance().handleScenarioProceed();
  // 	expect(wrapper.state('selectedCard')).toBe(null);
  // 	expect(wrapper.state('answerClicked')).toBe(0);
  // 	expect(wrapper.state('clickedOptions')).toEqual([]);
  // });
});
