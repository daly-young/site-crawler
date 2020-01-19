import React from 'react';
import { demoApi } from '../api/demo';

class Demo extends React.Component {
  componentDidMount() {
    demoApi({ test: 1 }).then(res => {
      console.log(res);
    });
  }
  render() {
    return (
      <div>
        <h2>Demo</h2>
      </div>
    );
  }
}
export default Demo;
