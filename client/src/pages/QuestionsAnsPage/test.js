import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { QuestionsAnsPage } from './QuestionsAnsPage';
import { gameData } from './data';

Enzyme.configure({ adapter: new Adapter() });
let store;

const defaultProps = {
	// history: createMemoryHistory(),
	gameData: { gameData: gameData },
	location: { pathname: '/terms', search: '', state: '', hash: '' },
	match: { params: { moduleId: '1', levelId: 1, questionId: 1 }, isExact: true, path: '/terms', url: '/terms' }
};

describe('<QuestionsAnsPage/>', () => {
	beforeEach(() => {
		const mockStore = configureStore();

		store = mockStore({});
	});

	it('showRightAnswer()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		expect(wrapper.state('showCorrectAns')).toBeFalsy();
		wrapper.instance().showRightAnswer();
		expect(wrapper.state('showCorrectAns')).toBeTruthy();
	});

	it('hideRightAnswer()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		wrapper.instance().showRightAnswer();
		expect(wrapper.state('showCorrectAns')).toBeTruthy();
		wrapper.instance().hideRightAnswer();
		expect(wrapper.state('showCorrectAns')).toBeFalsy();
	});

	it('checkCorrectAnswer() when selected answer is correct', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		expect(wrapper.state('answerCorrect')).toBeTruthy();
		expect(wrapper.state('currentScore')).toBe(0);
		wrapper.setState({ selectedAnswer: [ 0 ] });
		wrapper.instance().checkCorrectAnswer();
		expect(wrapper.state('answerCorrect')).toBeTruthy();
		expect(wrapper.state('currentScore')).toBe(10);
	});

	it('checkCorrectAnswer() when selected answer is wrong', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		expect(wrapper.state('answerCorrect')).toBeTruthy();
		expect(wrapper.state('currentScore')).toBe(0);
		wrapper.setState({ selectedAnswer: [ 1 ] });
		wrapper.instance().checkCorrectAnswer();
		expect(wrapper.state('answerCorrect')).toBeFalsy();
		expect(wrapper.state('currentScore')).toBe(-10);
	});

	it('nextQuestion()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		expect(wrapper.state('questionId')).toBe(1);
		wrapper.instance().nextQuestion();
		expect(wrapper.state('questionId')).toBe(2);
	});

	it('handleNextClick()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		wrapper.setState({ answerClick: true });
		wrapper.instance().handleNextClick();
		expect(wrapper.state('answerClick')).toBeFalsy();
	});

	it('handleProceedNext()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		expect(wrapper.state('showAnswer')).toBeFalsy();
		wrapper.setState({ selectedCard: 2 });
		wrapper.setState({ answerClicked: 2 });
		wrapper.setState({ clickedOptions: [ 0, 1 ] });
		wrapper.instance().handleProceedNext();
		expect(wrapper.state('showAnswer')).toBeTruthy();
		expect(wrapper.state('selectedCard')).toBe(null);
		expect(wrapper.state('answerClicked')).toBe(0);
		expect(wrapper.state('clickedOptions')).toEqual([]);
	});

	it('handleClick() when show answer is true', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		wrapper.setState({ showAnswer: true });
		wrapper.instance().handleClick();
		expect(wrapper.state('showAnswer')).toBeFalsy();
	});

	it('handleClick() when show answer is false', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		wrapper.setState({ showAnswer: false });
		wrapper.instance().handleClick();
		expect(wrapper.state('showAnswer')).toBeTruthy();
	});

	it('getCorrectAnswer()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		expect(wrapper.instance().getCorrectAnswer()).toEqual([ 0 ]);
	});

	it('getProgress()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		expect(typeof wrapper.instance().getProgress()).toBe('number');
	});

	it('handleInfoOpen()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		wrapper.setState({ infoOpen: false });
		wrapper.instance().handleInfoOpen();
		expect(wrapper.state('infoOpen')).toBeTruthy();
	});

	it('handleInfoClose()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		wrapper.setState({ infoOpen: true });
		wrapper.instance().handleInfoClose();
		expect(wrapper.state('infoOpen')).toBeFalsy();
	});

	it('handleClickOpen()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		wrapper.setState({ infoOpen: false });
		wrapper.instance().handleClickOpen();
		expect(wrapper.state('open')).toBeTruthy();
	});

	it('checkAnsClicked()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		wrapper.setState({ answerClicked: 1 });
		const answerClicked = wrapper.state('answerClicked');
		wrapper.instance().checkAnsClicked(answerClicked);
		expect(wrapper.state('answerClick')).toBeTruthy();
	});

	it('getModuleNames()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		expect(Array.isArray(wrapper.instance().getModuleNames())).toBe(true);
	});

	it('getTotalQuestions()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		expect(typeof wrapper.instance().getTotalQuestions()).toBe('number');
	});

	it('getParScores()', () => {
		const wrapper = shallow(<QuestionsAnsPage {...defaultProps} />);
		expect(Array.isArray(wrapper.instance().getModuleNames())).toBe(true);
	});
});
