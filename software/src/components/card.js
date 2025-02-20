import React from "react";

const Card = ({ title, content, filter, created_at }) => {
  return (
    <div 
      className="bg-light-blue dib br3 pa3 grow bw2 shadow-5 notice-card"
      style={{ 
        width: "90%",  // Responsive width
        maxWidth: "600px",  // Prevents oversized cards
        margin: "10px auto", // Centers the card
      }}
    >
      {/* Title with Bottom Line */}
      <h2 className="fc mb-2 tc b notice-title">{title}</h2> {/* Bolded Title */}
      <hr className="mb-3" />

      {/* Description */}
      <p className="f5 mb-4 notice-content">{content}</p>

      {/* Footer: Filter Left | Date Right */}
      <div className="flex justify-between items-center mt-2">
        <p className="f6 gray notice-tags">{filter ? `#${filter}` : "No tags"}</p>
        <p className="f6 gray notice-date">{new Date(created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Card;



