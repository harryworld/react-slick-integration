import React from 'react';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var creator = this.props.creator || {};
    var imgSrc = creator && creator.smallAvatar
      ? creator.smallAvatar._url
      : require('../../assets/images/avatar.png');

    return (
      <div className='comment'>
        <img src={imgSrc} />

        <div className='text'>
          <p className='username'>{creator.username || 'Jane Doe'}</p>
          <span className='content'>{this.props.content}</span>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  content: React.PropTypes.string,
  creator: React.PropTypes.object,
};

Comment.defaultProps = {
  content: '',
  creator: {},
};

