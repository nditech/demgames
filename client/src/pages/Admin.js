import React, {Component} from 'react';
import {Wrap} from '../components/Grid';
import {Button, FormGroup, Label, Input} from 'reactstrap';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import API from '../utils/API';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const colourOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
   
const delimiters = [KeyCodes.comma, KeyCodes.enter];  

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            tags: [
                { id: "English", text: "English" }
            ],
            suggestions: [
                { id: 'Guatemala', text: 'Guatemala' },
                { id: 'debate', text: 'debate' },
                { id: 'Spanish', text: 'Spanish' },
                { id: 'English', text: 'English' }
            ],
            selectedOption: null
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // API.getQuesitons()
        // .then(res => {
        //     const questions = res.data;
        //     this.setState({questions});
        //     console.log(this.state);
        // });
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

    render() {
        const { tags, suggestions } = this.state;
        return (
            <Wrap>
                This is Admin Page
                <FormGroup>
                    <Input type="search" name="search" placeholder="Search" />
                    <Button outline color="success">Search</Button>
                </FormGroup>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
                <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                defaultValue={[colourOptions[4], colourOptions[5]]}
                isMulti
                options={colourOptions}
                onChange={this.handleChange}
                />
            </Wrap>
        )
    }
}