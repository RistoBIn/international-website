import React from 'react';
import Button from './index';

const ButtonsList = ({ buttons }) => {
  if (!buttons || buttons.length < 1) {
    return <></>;
  }
  if (!buttons[0].text || !buttons[0].path) {
    return <></>;
  }
  return (
    <div className="buttons-wrap">
      {buttons.map((item, i) => {
        if (i % 2 === 0) {
          return <Button className="is-primary" {...item} />;
        }
        return <Button className="is-transparent" {...item} />;
      })}
    </div>
  );
};

export default ButtonsList;
