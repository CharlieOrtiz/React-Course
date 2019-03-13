import React from 'react';
//Importar faker library to generate fake content
import faker from 'faker';

const CommentDetail = () => {
    return(
        <div className="comment">
            <a href="/" className="avatar">
                <img alt="avatar" src={faker.image.avatar()} /> {/* Here we get a faker image */}
            </a>
            <div className="content">
                <a href="/" className="author">Sam</a>
                <div className="metadata">
                    <span className="date">Today at 6:00PM</span>
                </div>
                <div className="text">Nice Blog Post!</div>
            </div>
        </div>
    )
}

//Doing this we make our Comment file available to the other files in our project
export default CommentDetail; //Here we specify the CommentDetail function or in other word the CommentDetail component