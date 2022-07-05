import React from "react";

function StatsCard({ title, description }) {
  return (
    <div className="status-show">
      <p>{title}</p>
      <h2>{description}</h2>
    </div>
  );
}

export default StatsCard;
