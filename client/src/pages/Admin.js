import React, {Component} from 'react';
import {Wrap} from '../components/Grid';
// import {Button, FormGroup, Label, Input} from 'reactstrap';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import API from '../utils/API';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { Button, Card, CardText, CardBody,
    CardTitle, CardSubtitle, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            tags: [
                { id: "English", text: "Language: English", type: "language"  }
            ],
            suggestions: [
                { id: 'Guatemala', text: 'Location: Guatemala', type: "location" },
                { id: 'debate', text: 'Game: Debate', type: "game" },
                { id: 'Spanish', text: 'Language: Spanish', type: "language" },
                { id: 'English', text: 'Language: English', type: "language" }
            ],
            selectedOption: null,
            openHelp: false,
            searchDone: false /**searchDone prevents componentDidUpdate infinitive loops */
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openHelp = this.openHelp.bind(this);
        this.clickEdit = this.clickEdit.bind(this);
    }

    componentDidMount = () => {
        this.handleSearch(this.state.tags);
    }

    componentDidUpdate = () => {
        if (!this.state.searchDone) this.handleSearch(this.state.tags);
    }

    handleSearch = (tags) => {
        let params = {}
        
        tags.map((t) => {
            const key = t.type;
            const value = t.id.toLocaleLowerCase();
            params[key] = value;
        });

        API.getQuesitons(params)
        .then((res) => {
            const questions = res.data;
            const searchDone = true;
            this.setState({questions, searchDone});
        });
    }

    handleDelete = (i) => {
        const tags = this.state.tags.filter((tag, index) => index !== i);
        const searchDone = false;
        this.setState({tags, searchDone});
    }
 
    handleAddition = (tag) => {
        const tags = [...this.state.tags, tag];
        const searchDone = false;
        this.setState({tags, searchDone});
    }
 
    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }

    handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    openHelp = () => {
        this.setState({
            openHelp: !this.state.openHelp
        });
    }

    clickEdit = (id) => {
        console.log(`clicked question id: ${id}`);
        // TODO: send to page: id to edit OR expand div to edit
    }

    render = () => {
        const { tags, suggestions } = this.state;
        return (
            <div>
                This is Admin Page
                <ReactTags
                    placeholder={'Type to search, e.g. language'}
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    handleTagClick={this.handleTagClick}
                />
                <i className="material-icons" onClick={this.openHelp}>help</i>
                <Modal isOpen={this.state.openHelp} toggle={this.openHelp} className={this.props.className}>
                <ModalHeader toggle={this.openHelp}>Admin Help</ModalHeader>
                <ModalBody>
                    <p>Type in 'location', 'language' and or 'game' to search for questions.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.openHelp}>Close</Button>
                </ModalFooter>
                </Modal>
                {
                    this.state.questions.length > 0
                    ? (
                        <ListGroup>
                            {this.state.questions.map(q => (
                                <ListGroupItem key={q._id} id={q._id}>
                                    <p>Question: {q.question}</p>
                                    <p>Answer position: {q.answer}</p>
                                    <p>Option(s): {q.option1}</p>
                                    <div onClick={() => this.clickEdit(q._id)}>
                                    <i className="material-icons">edit</i>
                                    </div>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    )
                    : (<div>No question found.</div>)
                }
            </div>
        )
    }
}