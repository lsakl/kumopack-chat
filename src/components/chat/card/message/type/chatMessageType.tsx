import React from 'react';

type Props = {
  value : string;
};

const ChatMessageType: React.FC<Props> = ({ value }) => {
  return (
    <div className="chat-msg">{value}</div>
  )
}

export default ChatMessageType