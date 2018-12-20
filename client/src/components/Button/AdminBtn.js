import React from 'react';

/**
 * Component renders Admin buttons from an object.
 * @param {buttons} buttons Buttons object contains details of all Admin buttons.
 */
export const AdminBtn = ({buttons}) => (
    <div>
        {buttons
            ? (
                buttons.map((button) => (
                    <button 
                        type="button" 
                        className={`btn btn-${button.style}`} 
                        id={button.id} key={button.id}
                        onClick={button.action}
                    >
                        <i className="material-icons">{button.icon}</i>
                        {button.text}
                    </button>
                ))
            )
            : ('No button data')
        }
    </div>
);
