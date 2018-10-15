import React from 'react'

export const Question = ({match}) => (
    <div> This is the question page for question Id: {match.params.id} </div>
);