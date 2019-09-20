import React from 'react';
import './styles.scss';

export const Details=({data})=>{
    console.log(data,"csdcd");
    return(
        <div className="details-container">
            {data&&data.map((d)=>
            <div className="details-box">
                
                    <div className="details-key">
                        {d.key}
                    </div>
                    
                    <div className="details-value">
                        {d.value}
                    </div>
               
                
            </div>
             )}
        </div>
    );
}