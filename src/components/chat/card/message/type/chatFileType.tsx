import React from 'react';

type Props = {
  value : {
    [key: string]: any
  }
};

const ChatFileType: React.FC<Props> = ({ value }) => {
  return (
    <div className="file-box p-2 card">
        <a href={value.url}>
            <div className="d-flex align-items-center">
                <div className="file-icon-box me-3 ms-0">
                    <div className="file-box-title rounded-5"><em className="icon ni ni-file"></em></div>
                </div>
                <div className="flex-grow-1">
                    <div className="text-start">
                        <p className="file-name mb-0">{value.fileName}</p>
                        <p className="text-muted mb-0">{value.size}</p>
                    </div>
                </div>
            </div>
        </a>
    </div>
  )
}

export default ChatFileType