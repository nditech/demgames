import React from 'react';

export const Col = ({size, custom, children}) => (
    <div className={`${size.split(" ").map(size => "col-" + size).join(" ")} ${custom ? custom : ""}`}>
        {children}
    </div>
)