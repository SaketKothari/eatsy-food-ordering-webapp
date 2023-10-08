import { Component } from 'react';
import UserClass from '../components/ClassComponent/UserClass';
import UserContext from '../context/UserContext';

class About extends Component {
  constructor(props) {
    super(props);
    // console.log('Parent Constructor');
  }

  componentDidMount() {
    // console.log('Parent componentDidMount');
  }

  render() {
    // console.log('Parent Render');

    return (
      <div>
        <h1>About - Class based Component</h1>
        <div>
          LoggedIn User
          <UserContext.Consumer>
            {({ loggedInUser }) => (
              <h1 className="font-bold text-lg">{loggedInUser}</h1>
            )}
          </UserContext.Consumer>
        </div>
        <h2>This is about page of our food ordering webapp</h2>
        <UserClass name={'First Child'} location={'Gotham'} />
        {/* <UserClass name={'Second Child'} location={'Metropolis'} /> */}
      </div>
    );
  }
}

export default About;
