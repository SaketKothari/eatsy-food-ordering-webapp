import React from 'react';

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: 'Initial name',
        location: 'Default',
      },
    };

    console.log(this.props.name + ' Child Constructor');
  }

  async componentDidMount() {
    console.log(this.props.name + ' Child componentDidMount');
    // API Call
    const data = await fetch('https://api.github.com/users/SaketKothari');
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    console.log(this.props.name + ' Child Render');

    return (
      <div className="user-card">
        <img src={avatar_url} alt="avatar" />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
      </div>
    );
  }
}

export default UserClass;
