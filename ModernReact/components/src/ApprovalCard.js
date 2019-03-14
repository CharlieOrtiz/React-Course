import React from 'react';

const ApprovalCard = (props) => {
    return(
        <div className="ui card">
                <div className="content">
                    {props.children} {/* Here we get access to the child that is inside our component */}
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button">Approve</div>
                        <div className="ui basic red button">Reject</div>
                    </div>
                </div>
        </div>
    );

}

export default ApprovalCard;