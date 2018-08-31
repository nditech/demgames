import React from 'react';

export const Wrap = ({children}) => (
    <div className="wrap">
        <div className="phone-wrap">
            {children}
        </div>
    </div>
);