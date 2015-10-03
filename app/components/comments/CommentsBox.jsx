import React from 'react';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);

import Comment from '../comments/Comment';

export default class CommentsBox extends ParseComponent {
  constructor(props) {
    super(props);

    this.data = {
      comments: []
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

  render() {
    return (
      <div className='comment-box'>
        <p className='header'> Chat </p>

        <div className='message-area'>
          {this.data.comments.map(p => {
            return <Comment {...p} />;
          })}
    		</div>

    	<input type='text'
			   placeholder='Your message' />
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
