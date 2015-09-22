import React from 'react';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);
import Page from './Page';
import SlickSlider from './SlickSlider';

export default class PageSlider extends ParseComponent {
  constructor(props) {
    super(props);
    this.state = {
      savedPages: props.savedPages
    };
    this.data = {
      pages: props.pages
    };
  }

  observe(props) {
    return {
      pages: new Parse.Query('Page').equalTo('statusRaw', 2).ascending('createdAt').include('creator'),
    };
  }

  render() {
    return (
      <div className='page-slider-wrapper'>
        <SlickSlider settings={{className: 'page-slider-slick'}}>
          {this.data.pages.map((p,i) => {
            return (
              <div key={p.id.objectId}>
                <Page key={p.id.objectId} {...p} />
              </div>
            );
          }, this)}
        </SlickSlider>

        <div className='close-slider-button button'
             onClick={this.props.onClose}>
          Close
        </div>
      </div>
    );
  }
}

PageSlider.propTypes = {
  pages: React.PropTypes.array.isRequired,
  onClose: React.PropTypes.func.isRequired,
};

PageSlider.defaultProps = {
  pages: []
};
