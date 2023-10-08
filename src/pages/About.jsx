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
      <>
        <div className="mt-5 flex justify-evenly">
          <UserContext.Consumer>
            {({ loggedInUser }) => (
              <span className="font-bold">Logged In User - {loggedInUser}</span>
            )}
          </UserContext.Consumer>
        </div>
        <UserClass name={'First Child'} location={'Gotham'} />

        <div className="mx-auto max-w-7xl px-4">
          {/* Hero Map */}
          <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
            <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
              <p className="text-xs font-semibold leading-normal md:text-sm">
                About the company
              </p>
            </div>
            <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
              Made with love, right here in India
            </p>
            <p className="max-w-4xl text-base text-gray-600 md:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              veritatis voluptates neque itaque repudiandae sint, explicabo
              assumenda quam ratione placeat?
            </p>
          </div>
          <div className="w-full space-y-4">
            <img
              className="h-[200px] w-full rounded-xl object-cover md:h-full"
              src="https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/google-map.jpg"
              alt=""
            />
          </div>
        </div>
      </>
    );
  }
}

export default About;
