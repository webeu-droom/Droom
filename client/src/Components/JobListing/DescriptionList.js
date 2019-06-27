import React from "react";

export default function DescriptionList(props) {
  return (
    <div>
      {!props.isEditing ? (
        <p>{props.desc}</p>
      ) : (
        <input defaultValue={props.desc} value={props.stateDesc} onChange={props.editDescription} id={props.id} />
      )}
    </div>
  );
}
