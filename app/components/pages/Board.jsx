import React from 'react';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);
import BoardPage from './BoardPage';
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

    return (
      <section className='board vertical'>
        <Submissions {...this.state} />

        {this.data.pages.map(function(p) {
          return (
            <BoardPage key={p.id.objectId} {...p} />
          );
        }, this)}

      </section>
    );

        // <FilterSlider />
  }
};

export default Board;
