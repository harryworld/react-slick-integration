import React from 'react';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);
import classNames from 'classnames';
import Page from './Page';

export default class Submissions extends ParseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: props.isShowing,
      showHideText: props.showHideText,
      isSmall: this.props.isSmall
    };
    this.data = {
      pages: props.pages
    };
  }

  observe(props) {
    return {
      pages: new Parse.Query('Page').equalTo('statusRaw', 0).ascending('createdAt').include('creator'),
    };
  }

  toggleShowHide() {
    this.state.isShowing = !this.state.isShowing;
    this.setState({isSmall: !this.state.isShowing});

    if (this.state.isShowing) {
      this.setState({showHideText: 'Hide submissions'});
    } else {
      this.setState({showHideText: 'See current submissions'});
    }
  }

  renderPending() {
    if (this.state.isShowing && this.data.pages.length) {
      return (
        <div className="pending-pages small-up-3 grid-block">
          {this.data.pages.map((p) => {
            return (
              <Page key={p.id.objectId} {...p} isSmall={false} />
            );
          }, this)}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className='grid-container'>
          <div className='submissions vertical grid-block'>
            <div className='show-hide'>
              <div className="button hollow" onClick={this.toggleShowHide.bind(this)}>{this.state.showHideText}</div>
            </div>
          </div>
        </div>
        {this.renderPending()}
      </div>
    );
  }
}

Submissions.propTypes = {
  isShowing: React.PropTypes.bool.isRequired,
  showHideText: React.PropTypes.string.isRequired,
  isSmall: React.PropTypes.bool.isRequired,
  pages: React.PropTypes.array.isRequired
};

Submissions.defaultProps = {
  isShowing: false,
  showHideText: 'See current submissions',
  isSmall: true,
  pages: []
};
