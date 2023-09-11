import React, {useContext}  from 'react';
import ChatMessageType      from './type/chatMessageType';
import ChatFileType         from './type/chatFileType';
import ChatImageType        from './type/chatImageType';
import ChatAvatar           from './../../profiles/chatAvatar';
import ChatMeta             from './chatMeta';
import { PartnerContext }   from './../../context/centerContext';

type Props = {
    type?     : string;
    who?      : string;
    name?     : string
    data?     : any;//urlImage, urlFile, Text, line
    datetime? : Date;
  };

const ChatBubbles: React.FC<Props> = ({ type, who, name, data, datetime }) => {
    const { partner } = useContext(PartnerContext);
    
    return (
        <div className={`chat is-${who}`}>
            { who==="you" && 
                <div className="chat-avatar">
                    <ChatAvatar image={partner.image} alt={ `รูปของคุณ ${partner.firstName} ${partner.lastName}` } status={partner.status} /> 
                </div>
            }
            <div className="chat-content">
                <ChatMeta time={(datetime||new Date())} who={(who||'')} name={(name||'')} />
                <div className="chat-bubbles">
                    <div className="chat-bubble">
                        { type === "message" && <ChatMessageType value={data} /> }
                        { type === "file" && <ChatFileType value={data} /> }
                        { type === "image" && <ChatImageType value={data} /> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBubbles