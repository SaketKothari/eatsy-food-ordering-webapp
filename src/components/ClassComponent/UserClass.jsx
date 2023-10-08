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

    // console.log(this.props.name + ' Child Constructor');
  }

  componentDidMount() {
    // this.timer = setInterval(() => {
    //   console.log("I'm Batman");
    // }, 1000);
    // console.log(this.props.name + ' Child componentDidMount');
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    // console.log('componentWillUnmount');
  }

  render() {
    const { name, location } = this.state.userInfo;
    // console.log(this.props.name + ' Child Render');

    return (
      <div className="flex justify-center gap-5 items-center">
        <span>Name: {name}</span>
        <span>Location: {location}</span>
      </div>
    );
  }
}

export default UserClass;
