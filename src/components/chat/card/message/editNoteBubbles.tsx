import React from 'react';
import EditNoteType     from './type/editNoteType';
import ChatAvatar       from './../../profiles/chatAvatar';
import EditNoteMeta     from './editNoteMeta';

type Props = {
    type?     : string;
    who?      : string;
    name?     : string
    data?     : any;//urlImage, urlFile, Text, line
    datetime? : Date;
    image     : string;
  };

const EditNoteBubbles: React.FC<Props> = ({ type, who, name, data, datetime, image }) => {
    
    return (
        <div className={`chat is-${who}`}>
            { who==="you" && 
                <div className="chat-avatar">
                    <ChatAvatar image={image} alt={ `รูปของคุณ ${name}` } status={3} /> 
                </div>
            }
            <div className="chat-content">
                <EditNoteMeta time={(datetime||new Date())} who={(who||'')} name={(name||'')} />
                <div className="chat-bubbles">
                    <div className="chat-bubble">
                        <EditNoteType value={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditNoteBubbles