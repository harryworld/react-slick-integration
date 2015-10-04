import React from 'react';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);

import Comment from '../comments/Comment';

export default class CommentsBox extends ParseComponent {
  constructor(props) {
    super(props);

    this.data = {
      comments: this.props.comments
    };
  }
  observe(props) {
    return {
      /**
       * Notice:
       * I removed:
       *
       *  .equalTo('page', this.props.pageId)
       *
       * because there are small amount of comments.
       * Right now you will see ALL comments for ALL pages in EACH comment box
       */
      comments: new Parse.Query('Comment').ascending('createdAt')
    };
  }

  handleAddComment(e) {
    e.preventDefault();

    var msg = React.findDOMNode(this.refs.message).value.trim();
    console.log('New message', msg);

    // clear input
    React.findDOMNode(this.refs.message).value = '';

    return;
  }

  render() {
    return (
      <div className='comment-box'>
        <p className='header'>Chat</p>

        <div className='message-area'>
          {this.data.comments.map(p =>
            <Comment key={p.id.objectId} {...p} />
          )}
    		</div>

        <form onSubmit={this.handleAddComment.bind(this)}>
        	<input type='text'
                 ref='message'
        			   placeholder='Your message' />
        </form>
      </div>
    );
  }
}

CommentsBox.propTypes = {
  pageId: React.PropTypes.string.isRequired,
};

CommentsBox.defaultProps = {
  comments: []
};
