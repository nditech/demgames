import React, {Component} from 'react';

export class QuestionItem extends Component {
    clickEdit = () => {
        this.props.onClick(this.props.question._id);
    }
    render() {
        return (
            <div>
                <div><b>Question:</b> {this.props.question.question}</div>
                {this.props.children}
                <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.clickEdit}
                >
                    <i className="material-icons">edit</i>
                    Edit Question
                </button>
            </div>
        )
    }
}