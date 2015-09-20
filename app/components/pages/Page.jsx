import React from 'react';
import classNames from 'classnames';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      creator: this.props.creator,
      image: this.props.image,
      refPageId: this.props.refPageId,
      isSmall: this.props.isSmall
    };
  }

  smallAvatarUrl() {
    if (this.state.creator && this.state.creator.smallAvatar) {
      return (<img src={this.state.creator.smallAvatar._url} />);
    } else {
      return (<img src={require('../../assets/images/avatar.png')} />);
    }
  }

  contentText() {
    return (<p>{this.state.content}</p>);
  }

  imageContent() {
    if (this.state.image && this.state.refPageId) {
      return (<div><img src={this.state.image._url} /></div>);
    }
  }

  render() {
    return (
      <div className='grid-container'>
        <div className='page-row small-24 large-24 grid-block'>
          <div className="line"></div>
          <div className="avatar small-3">
            {this.smallAvatarUrl()}
          </div>
          <div className="content small-18">
            {this.contentText()}
            {this.imageContent()}
          </div>
        </div>
      </div>
    );
  }
}

Page.defaultProps = { isSmall: true };
