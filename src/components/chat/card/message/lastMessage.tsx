import React from 'react';

type Props = {
    value : string;
};

const Profile: React.FC<Props> = ({ value }) => {
    return (
        <div className="chat-message-simple pt-0">
            {value && value!=='null' ? (
                <div className="text user-text-simple">{value}</div>
            ) : (
                <div className="text user-text-simple"><small><i>ยังไม่มีประวัติการสนทนา</i></small></div>
            )}
        </div>
    )
}

export default Profile