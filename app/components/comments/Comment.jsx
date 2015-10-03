import React from 'react';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var imgSrc = this.props.creator && this.props.creator.smallAvatar
      ? this.props.creator.smallAvatar._url
      : require('../../assets/images/avatar.png');

    return (
      <div className='comment'>
        <img src={imgSrc} />

        <div className='text'>
          <p className='username'>{this.props.creator.username || 'Jane Doe'}</p>

          {this.props.content}
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

