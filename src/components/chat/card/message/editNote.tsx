import React from 'react';
import EditNoteBubbles  from './editNoteBubbles';

type Props = {
  type?      : string;
  who?      : string;
  name?     : string
  data?     : string[];//urlImage, urlFile, Text
  datetime? : Date;
  image     : string;
};

const EditNote: React.FC<Props> = ({ type, who, name, data, datetime, image }) => {
  return (
    <>
      <EditNoteBubbles type={type} who={who} name={name} data={data} datetime={datetime} image={image} />
    </>
  )
}

export default EditNote