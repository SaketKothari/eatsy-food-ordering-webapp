import { Component } from 'react';
import UserClass from '../components/ClassComponent/UserClass';

class About extends Component {
  constructor(props) {
    super(props);
    console.log('Parent Constructor');
  }

  componentDidMount() {
    console.log('Parent componentDidMount');
  }

  render() {
    console.log('Parent Render');

    return (
      <div>
        <h1>About - Class based Component</h1>
        <h2>This is about page of our food ordering webapp</h2>
        <UserClass name={'First Child'} location={'Gotham'} />
        <UserClass name={'Second Child'} location={'Metropolis'} />
      </div>
    );
  }
}

export default About;
