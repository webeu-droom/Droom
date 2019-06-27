import React from "react";

export default function(props) {
  return (
    <div>
      {!props.isEditing ? (
        <p>{props.req}</p>
      ) : (
        <input
          value={props.stateReq[props.id]}
          onChange={props.editRequirements}
          placeholder="Requirements"
          id={props.id}
          name="requirements"
        />
      )}
    </div>
  );
}
