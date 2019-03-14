import React from 'react';

const CommentDetail = props => {
    return(
        <div className="comment">
            <a href="/" className="avatar">
                <img alt="avatar" src={props.image} /> {/* Here we get a faker image */}
            </a>
            <div className="content">
                <a href="/" className="author">{props.author}</a>
                <div className="metadata">
                    <span className="date">{props.timeAgo}</span>
                </div>
                <div className="text">{props.commentText}</div>
            </div>
        </div>
    )
}

//Doing this we make our Comment file available to the other files in our project
export default CommentDetail; //Here we specify the CommentDetail function or in other word the CommentDetail component