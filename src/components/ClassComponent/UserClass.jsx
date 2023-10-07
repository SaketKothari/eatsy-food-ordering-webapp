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

  componentDidMount() {
    this.timer = setInterval(() => {
      console.log("I'm Batman");
    }, 1000);
    console.log(this.props.name + ' Child componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('componentWillUnmount');
  }

  render() {
    const { name, location } = this.state.userInfo;

    console.log(this.props.name + ' Child Render');

    return (
      <div className="user-card">
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
      </div>
    );
  }
}

export default UserClass;
