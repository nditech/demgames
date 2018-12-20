import React from 'react';

/**
 * Component renders Dashboard items based on items in an object.
 * @param {obj} obj Object used to render Dashboard items.
 */
const Dashboard = ({obj}) => (
    <div className="dashboard">
        {obj
            ? (
                obj.map((i) => (
                    <div id={i.id} key={i.id} onClick={i.action}>{i.text}: {i.num}</div>
                ))
            )
            : ('No data')
        }
    </div>
);

export default Dashboard;
