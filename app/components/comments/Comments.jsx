import React from 'react';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false
    };
  }

  render() {
    return (
      <div className='comment-box'>Comments</div>
     );
  }
}
