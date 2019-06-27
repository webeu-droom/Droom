import React from "react";

export default function DescriptionList(props) {
  return (
    <div>
      {!props.isEditing ? (
        <p>{props.desc}</p>
      ) : (
        <input value={props.stateDesc[props.id]} onChange={props.editDescription} id={props.id} name="description" />
      )}
    </div>
  );
}
