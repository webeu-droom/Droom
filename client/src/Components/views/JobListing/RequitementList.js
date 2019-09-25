import React from "react";
import { Input } from "../../~reusables/atoms/Inputs";

export default function(props) {
  return (
    <div>
      <p className="label">Requirement {props.id + 1}</p>
      {!props.isEditing ? (
        <p className="divider">{props.req}</p>
      ) : (
        <Input
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
