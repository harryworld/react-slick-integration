import React from 'react';
import Slider from 'react-slick';
import objectAssign from 'object-assign';

export default class SlickSlider extends React.Component {
  constructor(props) {
    super(props);

    var defaultSettings = {
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
    };

    this.state = {
      settings: objectAssign({}, defaultSettings, props.settings)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      settings: objectAssign({}, this.state.settings, nextProps.settings)
    });
  }

  render() {
    return (
      <div className='slick-slider-wrapper'>
        <Slider {...this.state.settings}>
          {this.props.children}
        </Slider>
      </div>
    );
  }
}


SlickSlider.propTypes = {
  settings: React.PropTypes.object
};

SlickSlider.defaultProps = {
  settings: {}
};
