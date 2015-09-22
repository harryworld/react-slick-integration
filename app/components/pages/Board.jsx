import React from 'react';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);
import Page from './Page';
import Submissions from './Submissions';
import FilterSlider from './FilterSlider';
import Approve from './Approve';

const Board = class Board extends ParseComponent {
  constructor(props) {
    super(props);
    this.data = {
      pages: props.pages
    };
  }

  observe(props) {
    return {
      pages: new Parse.Query('Page').equalTo('statusRaw', 1).ascending('createdAt').include('creator'),
    };
  }

  render() {
    let newSubmission;

    if (this.data.pages.length) {
      let pLength = this.data.pages.length;
      let lastPage = this.data.pages[pLength - 1];
    }

        // <div className='grid-container'>
        //   {this.data.pages.map(function(p) {
        //     return (
        //       <Page key={p.id.objectId} {...p} />
        //     );
        //   }, this)}
        // </div>

        // <Submissions {...this.state} />
    return (
      <section className='board vertical'>

        <FilterSlider />
      </section>
    );
  }
};

export default Board;
