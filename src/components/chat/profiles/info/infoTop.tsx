import React from 'react';
import ChatAvatar from './../chatAvatar';

type Props = {
  data: {
    [key: string]: any
  };
  status  : number;
  type?   : string; // card, top
};

const InfoTop: React.FC<Props> = ({ data, status, type }) => {

  return (
    <div className={(type === "top") ? "lead-text name-text-title" : "name name-text"}>
      <ChatAvatar image={data.image} status={status} />
      <div className="user-info">
        <div className="chat-from">
          <div className={(type === "top") ? "lead-text name-text-title pr-1" : "name name-text"}>
            {data.first_name} {data.last_name}
          </div>
          {(type === "top") ? 
          <span className="badge span-online">
            <i className="status dot dot-text-lg dot-text-success"></i>
            <small className="text-status">Online</small>
          </span> : <span className="time">{data.time}</span>}
        </div>
        <div className="chat-context">
          <div className="text username-text">{data.email}</div>
        </div>
      </div>
    </div>
  )
}

export default InfoTop