import React from 'react';
import ReactDOM from 'react-dom';
//Importar faker library to generate fake content
import faker from 'faker';
//To get a file that is exported we use import and provide the specific path to it 
import CommentDetail from './CommentDetail'; //If the file is at the same leve we just put ./ and if it is a js file we don't need to specify the extension, webpack do this for us
import ApprovalCard from './ApprovalCard'

const App = () => {
    return(
        <div className="ui container comments">
            <ApprovalCard>
                <CommentDetail 
                    author="Sam" 
                    timeAgo="Today at 4:45PM" 
                    commentText="Nice Post!" 
                    image={faker.image.avatar()} //Here we are passing the CommentDetail component as child, this child is storage in the prop object, but  due to it is not a defined attribute as it used to be, it's defined by default inside a property called children. These process is called Reusable Components
                />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail 
                    author="Jane" 
                    timeAgo="Today at 2:00AM" 
                    commentText="Congratulations!" 
                    image={faker.image.avatar()}
                />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail 
                    author="Ben" 
                    timeAgo="Yesterday at 11:00PM" 
                    commentText="Your doing a good job" 
                    image={faker.image.avatar()}
                />
            </ApprovalCard>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);