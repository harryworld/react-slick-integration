import React from 'react';

export default class ErrorMessages extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const messageNodes = this.props.messages.map((message, i) => {
      return(<p key={i}>{ message }</p>);
    });
    return (
      <div className='error-messages'>
        <h1>Uh oh!</h1>
        { messageNodes }
      </div>
    );
  }
}
