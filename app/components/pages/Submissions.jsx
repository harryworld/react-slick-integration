import React from 'react';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);
import classNames from 'classnames';
import Page from './Page';
import Slider from 'react-slick';

export default class Submissions extends ParseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: props.isShowing,
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
  }

  renderPending() {
    if (this.state.isShowing && this.data.pages.length) {
      var settings = {
        className: 'submissions-slider',
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        // adaptiveHeight: true
      };


      return (
        <div className="pending-pages small-up-3 grid-block">
          <Slider {...settings}>
            {this.data.pages.map((p,i) => {
              return (
                <div key={p.id.objectId}>
                  <Page {...p} isSmall={false} />
                </div>
              );
            }, this)}
          </Slider>
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
              <div className="button hollow" onClick={this.toggleShowHide.bind(this)}>
                {this.state.isShowing ? 'Hide submissions' : 'See current submissions'}
              </div>
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
  isSmall: React.PropTypes.bool.isRequired,
  pages: React.PropTypes.array.isRequired
};

Submissions.defaultProps = {
  isShowing: false,
  isSmall: true,
  pages: []
};
