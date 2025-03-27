import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, content, filters, created_at, username, userId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-lightest-blue br3 shadow-5 pa4 grow w-90 mw6 center ba b--light-gray">
      {/* Title with Line Below */}
      <h2 className="f3 fw6 tc mb2">{title}</h2>
      <hr className="ba black w-100 center mb3" />

      {/* Description */}
      <p className="gray f5 lh-copy mb3">{content}</p>

      {/* Show Username with Chat Button */}
      <div className="flex items-center justify-between mb3">
        <p className="dark-gray f5 fw6">By: {username}</p>
        <button
          className="bg-dark-blue white br-pill pa2 ph3 f6 fw6 grow pointer bn"
          onClick={() => navigate(`/chat/${username}`)}
        >
          Chat with {username}
        </button>
      </div>

      {/* Footer: Filters (Left) | Date (Right) */}
      <div className="flex justify-between items-center mt3">
        {/* Tags */}
        <div className="flex flex-wrap">
          {filters.length > 0 ? (
            filters.map((tag, index) => (
              <span key={index} className="bg-light-gray dark-gray br-pill ph3 pv1 f6 fw6 mr2 mb2">
                #{tag}
              </span>
            ))
          ) : (
            <p className="gray f6">No tags available</p>
          )}
        </div>

        {/* Date */}
        <p className="gray f6">{new Date(created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Card;
