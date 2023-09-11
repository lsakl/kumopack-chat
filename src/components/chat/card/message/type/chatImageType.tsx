import React from 'react';

type Props = {
  value : any;
};

const ChatImageType: React.FC<Props> = ({ value }) => {
  return (
    <div className="file-box p-2 card w-50">
      <img src={value} alt="" />
    </div>
  )
}

export default ChatImageType