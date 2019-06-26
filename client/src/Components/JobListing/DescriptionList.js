import React from "react";

export default function DescriptionList(props) {
  return (
    <div>
      {!props.isEditing ? (
        <p>{props.description}</p>
      ) : (
        <input
          defaultValue={props.description}
          value={props.stateDescription}
          onChange={props.editDescription}
          id={props.id}
        />
      )}
    </div>
  );
}
