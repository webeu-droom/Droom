import React from "react";

export default function NavBar(props) {
  return (
    <div>
      <p>NavBar</p>
      <button onClick={props.handleLogout}>Logout</button>
    </div>
  );
}
