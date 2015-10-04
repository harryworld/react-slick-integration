import React from 'react';
import Transition from 'react-motion-ui-pack';
import classNames from 'classnames';
import $ from 'jQuery';
import Page from './Page';
import PageSlider from './PageSlider';
import CommentsBox from '../comments/CommentsBox';

const BRING_TO_STATUS = {
  NONE: 'none',
  TOP: 'top',
  DOWN: 'down',
};

export default class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: this.props.viewType,
      isCommentBoxOpen: false,
      bringToButtonStatus: BRING_TO_STATUS.NONE
    };
    this.handleClickComment = this.handleClickComment.bind(this);

    this.handleScroll = function() {
      var rootElementTop = React.findDOMNode(this).offsetTop;
      if (rootElementTop < window.scrollY) {
        this.setState({ bringToButtonStatus: BRING_TO_STATUS.TOP });
      } else if (rootElementTop > window.scrollY + window.innerHeight) {
        this.setState({ bringToButtonStatus: BRING_TO_STATUS.DOWN });
      } else {
        this.setState({ bringToButtonStatus: BRING_TO_STATUS.NONE });
      }
    }.bind(this);
  }

  /*----------  Life cycle  ----------*/
  componentDidUpdate() {
    if(this.state.isCommentBoxOpen) {
      window.addEventListener('scroll', this.handleScroll);
    } else {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /*----------  Public API  ----------*/
  hideCommentBox() {
    this.setState({isCommentBoxOpen: false});
  }

  /*----------  Handlers  ----------*/
  handleOnToggleViewType() {
    this.setState({
      viewType: this.state.viewType == 'PAGE' ? 'SLIDER' : 'PAGE',
      isCommentBoxOpen: this.state.viewType == 'PAGE' ? false : this.state.isCommentBoxOpen
    });
  }

  handleBringTo() {
    $('html, body').animate({
      scrollTop: React.findDOMNode(this).offsetTop
    });
  }

  handleClickComment() {
    this.setState({isCommentBoxOpen: !this.state.isCommentBoxOpen});
    this.props.onShowComentsBox();
  }

  /*----------  Render  ----------*/
  renderPage() {
   return (
      <div className='page-wrapper grid-container'>
        <Page {...this.props} onClickComment={this.handleClickComment} />

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

  renderBringTo(direction) {
    var iconClass = classNames({
      'fa': true,
      'fa-angle-up': this.state.bringToButtonStatus == BRING_TO_STATUS.TOP,
      'fa-angle-down': this.state.bringToButtonStatus == BRING_TO_STATUS.DOWN,
    });
    return this.state.bringToButtonStatus == direction
      ? (<div className={`bring-to ${direction}`}
              onClick={this.handleBringTo.bind(this)}>
            <i className={iconClass} />
          </div>)
      : null;
  }


  render() {
    var contentElement = {
      PAGE: this.renderPage(),
      SLIDER: this.renderSlider(),
    }[this.state.viewType];

    var rootClass = classNames({
      'board-page': true,
      'visibleComentBox': this.state.isCommentBoxOpen
    });

    return (
      <div className={rootClass}
            ref='myRoot'>
        {contentElement}

        <Transition onlyChild appear
                    enter={{
                      opacity: {val: 1},
                      translateY: {val: 0, config: [200, 10]}
                    }}
                    leave={{
                      opacity: {val: 0},
                      translateY: {val: 250}
                    }}>
          { this.state.isCommentBoxOpen &&
            <div className='comment-box-wrapper'>
              {this.renderBringTo(BRING_TO_STATUS.TOP)}
              <CommentsBox pageId={this.props.id.objectId}/>
              {this.renderBringTo(BRING_TO_STATUS.DOWN)}
            </div> }
        </Transition>
      </div>
    );
  }
}

BoardPage.propTypes = {
  viewType: React.PropTypes.oneOf(['PAGE', 'SLIDER']),
  onShowComentsBox: React.PropTypes.func.isRequired
};

BoardPage.defaultProps = {
  viewType: 'PAGE'
};
