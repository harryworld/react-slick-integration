import React from 'react';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);
import BoardPage from './BoardPage';
import Submissions from './Submissions';
import FilterSlider from './FilterSlider';

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

  handleShowCommentBox(ref) {
    this.data.pages.forEach(p => {
      var currentRef = 'BoardPage_'+p.id.objectId;
      if (ref!=currentRef) {
        this.refs[currentRef].hideCommentBox();
      }
    });
  }

  render() {
    let newSubmission;

    if (this.data.pages.length) {
      let pLength = this.data.pages.length;
      let lastPage = this.data.pages[pLength - 1];
    }

    return (
      <section className='board vertical'>
        {this.data.pages.map(p => {
          var ref = 'BoardPage_'+p.id.objectId;
          return (
            <BoardPage {...p}
                        key={p.id.objectId}
                        ref={ref}
                        onShowComentsBox={this.handleShowCommentBox.bind(this, ref)}/>
          );
        }, this)}

        <Submissions {...this.state} />

        <FilterSlider />
      </section>
    );

  }
};

export default Board;
