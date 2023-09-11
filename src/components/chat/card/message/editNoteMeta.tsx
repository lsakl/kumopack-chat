import React from 'react';

type Props = {
  who   : string;
  name  : string;
  time  : Date;
};

const EditNoteMeta: React.FC<Props> = ({ who, name, time }) => {

  const currentDate = new Date(time);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <ul className="editNote-meta">
        { who==="you" && <li className='edit-note-meta-name'>{name}</li> }
        <li>{formattedDate} {formattedTime}</li>
    </ul>
  )
}

export default EditNoteMeta