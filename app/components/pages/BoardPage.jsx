import React from 'react';
import Transition from 'react-motion-ui-pack';
import classNames from 'classnames';

import Page from './Page';
import PageSlider from './PageSlider';
import Comments from '../comments/Comments';

export default class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: this.props.viewType,
      commentBoxOpen: true
    };
    this.onClickComment = this.onClickComment.bind(this);
  }

  handleOnToggleViewType() {
    this.setState({
      viewType: this.state.viewType == 'PAGE' ? 'SLIDER' : 'PAGE'
    });
  }

  onClickComment() {
    console.log(this);
    this.setState({commentBoxOpen: !this.state.commentBoxOpen});
  }

  renderPage() {
   return (
      <div className='page-wrapper grid-container'>
        <Page {...this.props} onClickComment={this.onClickComment} />

        <div className='toggle-view-button'
             onClick={this.handleOnToggleViewType.bind(this)}>
          Show more
        </div>
      </div>
    );
  }

  renderSlider() {
    return (
      <PageSlider {...this.props}
                  onClose={this.handleOnToggleViewType.bind(this)} />
    );
  }

  render() {
    var contentElement = {
      PAGE: this.renderPage(),
      SLIDER: this.renderSlider(),
    }[this.state.viewType];

    return (
      <div className='board-page'>
        {contentElement}

        <Transition
          onlyChild={true}
          appear={true}
          enter={{
            opacity: {val: 1},
            translateY: {val: 0, config: [400, 10]}
          }}
          leave={{
            opacity: {val: 0},
            translateY: {val: 250}
          }}
        >
        {
          this.state.commentBoxOpen &&
          <div className='comment-box-wrapper'>
            <Comments />
          </div>
        }

        </Transition>
      </div>
    );
  }
}

BoardPage.propTypes = {
  viewType: React.PropTypes.oneOf(['PAGE', 'SLIDER'])
};

BoardPage.defaultProps = {
  viewType: 'PAGE'
};
