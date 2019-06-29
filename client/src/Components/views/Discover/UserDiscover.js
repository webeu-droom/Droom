import React from "react";
import { firestoreConnect } from "react-redux-firebase";

class UserDiscover extends React.Component {
  render() {
    return (
      <div>
        <p>UserDiscoverTop</p>
        <p>UserDiscoverContent</p>
      </div>
    );
  }
}

export default firestoreConnect()(UserDiscover);
