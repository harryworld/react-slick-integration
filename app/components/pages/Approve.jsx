import React from 'react';
import Slider from 'react-slick';

import Page from './Page';

export default class Approve extends React.Component {
  constructor(props) {
    super(props);

    const samplePage = {
      id: { objectId: '1' },
      content: 'First Paragraph',
      creator: {smallAvatar: {_url: 'http://i.imgur.com/9f6538R.png'}},
      image: {_url: 'http://i.imgur.com/9f6538R.png'}
    };

    this.state = {
      filtered: false,
      isStarred: false,
      samplePage: samplePage
    };
  }

  clickFilter() {
    this.setState({filtered: !this.state.filtered});
  }

  render() {
    let approvalList;

    const settings = {
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1
    };

    if (this.state.filtered) {
      approvalList = (
        <Slider {...settings}>
          <div><h3>1</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </Slider>
      );
    } else {
      approvalList = (
        <Slider {...settings}>
          <div><h3>1</h3></div>
          <div><h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h3></div>
          <div><h3>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</h3></div>
          <div><h3>Contrary to popular belief</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </Slider>
      );
    }

    return (
      <div classList="grid-block">
        <div classList="grid-block">
          <div className="button" onClick={this.clickFilter.bind(this)}>Filtered: {this.state.isStarred}</div>
        </div>
        <div classList="grid-block">
          {approvalList}
        </div>
      </div>
    );
  }
}