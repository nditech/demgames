import React from 'react'
import './Progress.css'

export const Progress = ({level, title, text, num, notice}) => (
    <div>
        <div className={`row level-top bg-${level}`}>
            <div className="align-self-center col-sm-12 col-md-10 col-lg-10 pr-0">
                <p><b>{title}</b></p>
                <p><small>{text}</small></p>
            </div>
            <div className="col align-self-center text-center">
                <button type="button" className="btn btn-sm">Matching</button>
            </div>
        </div>
        <div className="progress">
            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: `${num}%`}} aria-valuenow={num} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        {notice}
    </div>
)