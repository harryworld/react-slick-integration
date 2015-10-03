import React from 'react';

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
    this.handleClickComment = this.handleClickComment.bind(this);
  }

  handleClickComment() {
    this.props.onClickComment(this.props.objectId);
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
      <div className='page-row small-24 large-24 grid-block'>
        <div className='line'></div>
        <div className='avatar small-3'>
          {this.smallAvatarUrl()}
        </div>
        <button className='comment-button' onClick={this.handleClickComment}><i className='fa fa-comment'></i></button>
        <div className='content small-18'>
          {this.contentText()}
          {this.imageContent()}
        </div>
      </div>
    );
  }
}

Page.defaultProps = { isSmall: true };
