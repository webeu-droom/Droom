import React from "react";
import { Input } from "../../~reusables/atoms/Inputs";

export default function ExperienceField(props) {
  return (
    <div>
      {!props.editingProfile ? (
        <p className="divider">{props.ex}</p>
      ) : (
        <Input value={props.ex} id={props.id} placeholder="Experience" onChange={props.saveExperience} />
      )}
    </div>
  );
}
