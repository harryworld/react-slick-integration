import React from 'react';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);
import classNames from 'classnames';
import PageEdit from './PageEdit';
import SlickSlider from './SlickSlider';
import objectAssign from 'object-assign';

export default class FilterSlider extends ParseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFiltering: props.isFiltering,
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

  toggleFilter() {
    this.setState({
      isFiltering: !this.state.isFiltering
    });
  }

  renderSlider() {
    var pages = this.data.pages || [];

    if (this.state.isFiltering) {
      pages = pages.filter(p => this.state.savedPages[p.id.objectId]);
    }

    if (!pages || !pages.length) {
      return null;
    }

    var settings = {
      className: 'filter-slide-slick',
      // slidesToShow: pages.length > 3 ? 3 : pages.length,
    };

    return (
      <div className='filter-slide-slick-wrapper small-up-3 grid-block'>
        <SlickSlider settings={settings} key={this.state.isFiltering ? 'filterOn' : 'filterOff' }>
          {pages.map((p,i) => {
            return (
              <div key={p.id.objectId}>
                <PageEdit
                  key={p.id.objectId}
                  onSaveClick={this.handlePageSave.bind(this, p)}
                  isSaved={this.state.savedPages[p.id.objectId]}
                  {...p} />
              </div>
            );
          }, this)}
        </SlickSlider>
      </div>
    );
  }

  handlePageSave(p, isSaved) {
    this.setState({
      savedPages: objectAssign({}, this.state.savedPages, {
        [p.id.objectId]: isSaved
      })
    });
  }

  render() {
    var filterBtnClass = classNames({
      'filter-button': true,
      'grid-container': true,
      'active': this.state.isFiltering
    });

    return (
      <div className='filter-slider-section'>
        <div className={filterBtnClass} onClick={this.toggleFilter.bind(this)}>
          <i className='fa fa-star star-icon' />
        </div>

        {this.renderSlider()}
      </div>
    );
  }
}

FilterSlider.propTypes = {
  isFiltering: React.PropTypes.bool.isRequired,
  pages: React.PropTypes.array.isRequired,
  savedPages: React.PropTypes.object.isRequired
};

FilterSlider.defaultProps = {
  isFiltering: false,
  pages: [],
  savedPages: {}
};
