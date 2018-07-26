import React from 'react'
import './GameItem.css'

const displayNum = n => {
    if (n !== 0) {
        if (n > 1) return (<div className="text-center">Quedan <span className="display-4">{n}</span> preguntas</div>)
        else return (<div className="text-center"><span className="display-4">{n}</span> pregunta más</div>)
    }
    else return ''
}

export const Progress = ({level, title, togo, num, complete, next}) => (
    <div>
        <div className={`row level-top bg-${level}`}>
            <div className="col-sm-12 col-md-10 col-lg-10 px-2 mt-2 score-board">
                <div><b>{title}</b></div>
                {displayNum(togo)}
            </div>
            {complete
                ? (
                    <div className="text-center notification">
                        <span className="h3">¡Hurra! ¡Todo listo!</span>
                        <div className="col text-center mb-1">
                            <a href={next} className="btn btn-sm btn-success" role="button" aria-disabled="true">Siguiente</a>
                        </div>
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