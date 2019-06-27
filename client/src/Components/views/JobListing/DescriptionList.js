import React from "react";
import { Input } from "../../~reusables/atoms/Inputs";

export default function DescriptionList(props) {
  return (
    <div>
      {!props.isEditing ? (
        <p className="divider">{props.desc}</p>
      ) : (
        <Input value={props.stateDesc[props.id]} onChange={props.editDescription} id={props.id} name="description" />
      )}
    </div>
  );
}
