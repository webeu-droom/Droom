import React from "react";

export default function ExperienceField(props) {
  console.log(props);
  return (
    <div>
      {!props.editingProfile ? (
        <p>{props.ex}</p>
      ) : (
        <input value={props.ex} id={props.id} placeholder="Experience" onChange={props.saveExperience} />
      )}
    </div>
  );
}
