import React from 'react';

type Props = {
  value : string[];
};

const EditNoteType: React.FC<Props> = ({ value }) => {
  return (
    <div className="edit-note-msg">Edit Note.<br/>
      
      <ul className='edit-note-ul'>
        { (value.length)? value.map((item) => (
          <li className='edit-note-li' key={item}>{item}</li>
        )) :
          <li className='edit-note-li'>N/A</li>
        }
      </ul>
    </div>
  )
}

export default EditNoteType