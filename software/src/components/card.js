import React from "react";

const Card = ({ title, content, filter,created_at }) => {
  return (
    <div className="bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 ">
      <h2 className="f3">{title}</h2>
      <p className="f5">{content}</p>
      <p className="f6">{filter}</p>
      <p className="f6 gray">{new Date(created_at).toLocaleString()}</p>
    </div>
  );
};

export default Card;
