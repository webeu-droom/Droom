import React from "react";

class UserProfilePage extends React.Component {
  state = {
    editingProfile: false,
    name: this.props.user.name,
    title: this.props.user.title,
    experience: this.props.user.experience,
    location: this.props.user.location,
    biography: this.props.user.biography,
    education: this.props.user.education
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateHandler = e => {
    this.props.firestore
      .collection("users")
      .docs(this.props.user.id)
      .update();
  };
  render() {
    return (
      <div>
        {!this.state.editingProfile ? (
          <p>{this.props.user.name}</p>
        ) : (
          <input value={this.state.name} onChange={this.onChangeHandler} />
        )}
        {!this.state.editingProfile ? (
          <p>{this.props.user.name}</p>
        ) : (
          <input value={this.state.name} onChange={this.onChangeHandler} />
        )}
        {!this.state.editingProfile ? (
          <p>{this.props.user.name}</p>
        ) : (
          <input value={this.state.name} onChange={this.onChangeHandler} />
        )}
        {!this.state.editingProfile ? (
          <p>{this.props.user.name}</p>
        ) : (
          <input value={this.state.name} onChange={this.onChangeHandler} />
        )}
        {!this.state.editingProfile ? (
          <p>{this.props.user.name}</p>
        ) : (
          <input value={this.state.name} onChange={this.onChangeHandler} />
        )}
        {!this.state.editingProfile ? (
          <p>{this.props.user.name}</p>
        ) : (
          <input value={this.state.name} onChange={this.onChangeHandler} />
        )}
      </div>
    );
  }
}

export default UserProfilePage;
