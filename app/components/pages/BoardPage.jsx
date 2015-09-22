import React from 'react';
import Page from './Page';
import PageSlider from './PageSlider';
import classNames from 'classnames';

export default class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: this.props.viewType,
    };
  }

  handleOnToggleViewType() {
    this.setState({
      viewType: this.state.viewType == 'PAGE' ? 'SLIDER' : 'PAGE'
    });
  }

  renderPage() {
   return (
      <div className='page-wrapper grid-container'>
        <Page {...this.props} />

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
