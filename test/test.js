import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme';
import QuestionsAnsPage from '../client/src/pages/QuestionsAnsPage/QuestionsAnsPage';
import { wrap } from 'module';

Enzyme.configure({ adapter: new Adapter() });

test('QuestionsAnsPage', () => {
	const wrapper = shallow(<QuestionsAnsPage />);
	expect(wrapper.exists()).toBe(true);
});
// test('showRightAnswer()', () => {
// 	const wrapper = shallow(<QuestionsAnsPage />);
// 	const instance = wrapper.instance();
// 	instance.showRightAnswer();
// 	expect(wrapper.state().showCorrectAns).toBeTruthy();

// test('hideRightAnswer()', () => {
// 	const wrapper = shallow(<QuestionsAnsPage />);
// 	const instance = wrapper.instance();
// 	instance.hideRightAnswer();
// 	expect(wrapper.state().showCorrectAns).toBeFalsy();
// });

function getCorrectAns() {
	return [ 0 ];
}

test('checkCorrectAnswer()', () => {
	const wrapper = shallow(<QuestionsAnsPage />);
	wrapper.setState({ selectedValue: [ 0 ] });
	const correctAns = getCorrectAns();
	const ansRight = JSON.stringify(wrapper.state().selectedValue) === JSON.stringify(correctAns);
	expect(ansRight).toBe(true);
});

test('nextQuestion()', () => {
	const wrapper = shallow(<QuestionsAnsPage />);
	const instance = wrapper.instance();
	// expect(wrapper.state('questionId')).toBe(1);
	// wrapper.instance.nextQuestion()
	// expect(wrapper.state().questionId).toBe(2);
});

// test('handleNextClick()', () => {
// 	const wrapper = shallow(<QuestionsAnsPage />);
// 	const instance = wrapper.instance();
// 	instance.handleNextClick();
// 	expect(wrapper.state().answerClick).toBeFalsy();
// });

// test('handleProceedNext()', () => {
// 	const wrapper = shallow(<QuestionsAnsPage />);
// 	const instance = wrapper.instance();
// 	instance.handleProceedNext();
// 	expect(wrapper.state().answerClick).toBeFalsy();
// 	expect(wrapper.state().answerClick).toBeFalsy();
// 	expect(wrapper.state().answerClick).toBeFalsy();
// 	expect(wrapper.state().answerClick).toBeFalsy();
// });

