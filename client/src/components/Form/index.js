import React from "react";

export const Input = props => {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
};
