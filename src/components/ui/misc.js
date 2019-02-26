import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = props => {
  const template = (
    <div
      style={{
        background: props.bck,
        color: props.color,
        fontSize: props.size,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...props.add
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkto}>{template}</Link>;
  } else {
    return template;
  }
};