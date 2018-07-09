import React from 'react';
import formatDate from '../../utils/formatDate';

export const ListItem = ({source, id, imgURL, userName, date, content, shareType, retweetCount}) => (
    <div className="col-12 col-md-6 p-0 mx-1">
        <div className="card p-2 h-100">
            <div className="card-body">
                <div className="row">
                    <div>
                        <img className="profileImg" src={imgURL} alt={userName}/>
                    </div>
                    <div>
                        <div>
                            <a href={`https://twitter.com/${userName}`} rel="noopener noreferrer" target="_blank"><b>@{userName}</b></a>
                        </div>
                        <span className="badge badge-info badge-pill ml-1">
                            {retweetCount}
                            {source === "facebook"
                                ? (" shares")
                                : (" retweets")
                            }
                        </span>
                        <span className="ml-1"><small><i className="far fa-calendar-alt"></i> {formatDate(date)}</small></span>
                    </div>
                </div>
                <p className="mb-1"><a href={`https://twitter.com/statuses/${id}`} rel="noopener noreferrer" target="_blank">{content}</a></p>
            </div>
        </div>
    </div>
)