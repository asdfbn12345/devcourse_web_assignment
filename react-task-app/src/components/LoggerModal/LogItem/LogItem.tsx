import React from "react";
import { ILogItem } from "../../../types";
import { BsFilePersonFill } from "react-icons/bs";
import { author, date, logItemWrap, message } from "./LogItem.css";

type TLogItemProps = {
  logItem: ILogItem;
};

const LogItem: React.FC<TLogItemProps> = ({ logItem }) => {
  const timeOffset = new Date(Date.now() - Number(logItem.timestamp));
  const showOffsetTime = `
    ${timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}m` : ""}
    ${timeOffset.getSeconds() > 0 ? `${timeOffset.getSeconds()}s` : ""}
    ${timeOffset.getSeconds() === 0 ? `just now` : " ago"}
  `;

  return (
    <div className={logItemWrap}>
      <div className={author}>
        <BsFilePersonFill />
        {logItem.author}
      </div>
      <div className={message}>{logItem.message}</div>
      <div className={date}>{showOffsetTime}</div>
    </div>
  );
};

export default LogItem;
