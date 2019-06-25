import React from "react";
import { Input } from "../~reusables/atoms/Inputs";

export default function ExperienceField(props) {
  console.log(props);
  return (
    <div>
      {!props.editingProfile ? (
        <p>{props.ex}</p>
      ) : (
        <Input value={props.ex} id={props.id} placeholder="Experience" onChange={props.saveExperience} />
      )}
    </div>
  );
}
