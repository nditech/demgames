import React from 'react'
import './Game.css'

export const Progress = ({level, title, togo, num, complete, next}) => (
    <div>
        <div className={`row level-top bg-${level}`}>
            <div className="col-sm-12 col-md-10 col-lg-10 px-2 mt-2 score-board">
                <div><b>{title}</b></div>
                {togo !== 0
                    ? (<div className="text-center"><span className="display-4">{togo}</span>{togo > 1 ? ` questions remaining` : ` left!`}</div>)
                    : (<div className="text-center"><span className="display-4">Yay! All done!</span></div>)
                }
            </div>
            {complete
                ? (
                    <div className="col text-center mb-1">
                        <a href={next} className="btn btn-sm" role="button" aria-disabled="true">Next</a>
                    </div>
                )
                : ('')
            }
        </div>
        <div className="progress">
            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: `${num}%`}} aria-valuenow={num} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        
    </div>
)