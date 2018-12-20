import React from 'react';
import {
    Alert,
    Button,
    Form, FormGroup, Input, Label,
    Modal, ModalHeader, ModalBody, ModalFooter 
} from 'reactstrap';

export const QuestionModal = ({open, toggle, className, notice, noticeColour, questionType, questionLanguage, answer, saveQuestion, handleInputChange}) => (
    <Modal isOpen={open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Question</ModalHeader>
        <ModalBody>
            {
                notice !== ''
                ? (<Alert color={noticeColour}>{notice}</Alert>)
                : (null)
            }
        
            <Form>
                <FormGroup>
                    <Label for="language">Language:</Label>
                    <Input type="select" name="language" id="language"
                        value={questionLanguage}
                        onChange={handleInputChange}
                    >
                        <option>English</option>
                        <option>Spanish</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="questionType">Type:</Label>
                    <Input type="select" name="type" id="questionType"
                        value={questionType}
                        onChange={handleInputChange}
                    >
                        <option>Matching</option>
                        <option>Multiple Choice</option>
                        <option>Scenario</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="question" id="question" placeholder="Question" 
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="option1" id="option1" placeholder="Option 1" 
                        onChange={handleInputChange}
                    />
                    {
                        questionType === 'Matching'
                        ? (null)
                        : (
                            <div>
                                <Input type="text" name="option2" id="option2" placeholder="Option 2" 
                                onChange={handleInputChange}
                                />
                                <Input type="text" name="option3" id="option3" placeholder="Option 3" 
                                    onChange={handleInputChange}
                                />
                                <Input type="text" name="option4" id="option4" placeholder="Option 4" 
                                    onChange={handleInputChange}
                                />
                            </div>   
                        )
                    }
                </FormGroup>
                {
                    questionType === 'Matching'
                    ? (
                        <FormGroup>
                            <Label for="rightAnswer">Right Answer:</Label>
                            <Input type="select" name="answer" id="rightAnswer"
                                value={answer}
                                onChange={handleInputChange}
                            >
                                <option>1</option>
                            </Input>
                        </FormGroup>
                    )
                    : (
                        <FormGroup>
                            <Label for="rightAnswer">Right Answer:</Label>
                            <Input type="select" name="answer" id="rightAnswer"
                                value={answer}
                                onChange={handleInputChange}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Input>
                        </FormGroup>
                    )
                }
                <Button color="success" onClick={saveQuestion}>Save</Button>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
    </Modal>
);
