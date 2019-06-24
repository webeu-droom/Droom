import React, { Component } from "react";

class CompanyProfilePage extends Component {
  render() {
    return (
      <div>
        <p>{this.props.company.name}</p>
      </div>
    );
  }
}

export default CompanyProfilePage;
