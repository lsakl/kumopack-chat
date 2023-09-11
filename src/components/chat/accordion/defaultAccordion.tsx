import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  title: string;
  icon: string;
};

const DefaultAccordion: React.FC<Props> = ({ children, setShow, show, title, icon }) => {
  return (
    <div className="chat-profile-group">
      <div onClick={() => setShow(!show)} className="chat-profile-head" data-bs-toggle="collapse" data-bs-target="#basic-information" style={{cursor:"pointer"}}>
        <h6 className="title overline-title"><em className={icon}></em> {title}</h6>
        <span className="indicator-icon"><em className="icon ni ni-chevron-right" style={{ transform: `${show ? "rotate(90deg)" : ""}`, transition: "all 0.5s", }}></em></span>
      </div>
      <div className={` overflow-hidden`} style={{ transition: "all 0.5s", maxHeight: `${show ? "1000px" : "0px"}` }}  >
        {children}
      </div>
    </div>
  );
};

export default DefaultAccordion;
