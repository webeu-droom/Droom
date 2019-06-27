import React from "react";
import { Input } from "../../~reusables/atoms/Inputs";

export default function(props) {
  return (
    <div>
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
