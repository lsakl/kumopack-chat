import React from 'react';
import ChatAvatar from './../chatAvatar';

type Props = {
    data : {
        [key: string]: any
    };
    status : number;
};

const InfoCard: React.FC<Props> = ({ data, status }) => {

    return (
        <div className="chat-link chat-open current">
          <ChatAvatar image={data.image} status={status} />
          <div className="chat-info">
            <div className="chat-from">
              <div className="name name-text">{data.first_name} {data.last_name}</div>
              <span className="time">{data.time}</span>
            </div>
            <div className="chat-context">
              <div className="text username-text">{data.email}</div>
            </div>
          </div>
        </div>
    )
}

export default InfoCard