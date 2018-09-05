import React, {Component} from 'react';
import {Wrap} from '../components/Grid';
// import {Button, FormGroup, Label, Input} from 'reactstrap';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import API from '../utils/API';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            tags: [
                { id: "English", text: "Language: English" }
            ],
            suggestions: [
                { id: 'Guatemala', text: 'Location: Guatemala' },
                { id: 'debate', text: 'Game: Debate' },
                { id: 'Spanish', text: 'Language: Spanish' },
                { id: 'English', text: 'Language: English' }
            ],
            selectedOption: null,
            openHelp: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openHelp = this.openHelp.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i)
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
        this.handleSearch();
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }

    handleTagClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    handleSearch() {
        const tags = this.state.tags;
        const params = tags.map(t => t.text.toLowerCase());
        console.log(params);
        // console.log(values);
        API.getQuesitons(params)
        .then(res => {
            console.log(res.data);
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    openHelp() {
        this.setState({
            openHelp: !this.state.openHelp
        });
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <Wrap>
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
            </Wrap>
        )
    }
}