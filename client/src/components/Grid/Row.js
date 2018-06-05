import React from 'react';

export const Row = ({fluid, children, custom}) => (
    <div className={`row${fluid ? "-fluid" : ""} ${custom ? custom : ""}`}>
        {children}
    </div>
)