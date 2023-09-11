import React from 'react';

type Props = {
  image?    : string;
  status   : number;//dot-success, dot-light, dot-warning //offline, online, busy
  alt?      : string;
};

const ChatAvatar: React.FC<Props> = ({ image, status, alt }) => {
    const statusData = ['dot-light', 'dot-success', 'dot-warning'];//['Offline', 'online', 'busy']

    return (
        <div className="chat-media user-avatar">
            <img src={image||'/assets/images/avatar/avatar-man.jpg'} alt={alt||''} />
            {status<3 && <span className={`status dot dot-lg ${statusData[status||0]}`}></span>}
        </div>
    )
}

export default ChatAvatar