import React from 'react/addons';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);

import Submissions from '../Submissions';

describe('Submissions', () => {
  const { TestUtils } = React.addons;
  let component, renderedDOM;

  beforeEach(() => {
    Parse.initialize('testid', 'testkey');

    component = TestUtils.renderIntoDocument(<Submissions storyId='1' />);
    renderedDOM = () => React.findDOMNode(component);
  });

  it('renders', () => {
    Parse.initialize('testid', 'testkey');
    expect(component).toBeTruthy();
  });

  it('renders a list with proper CSS classes', () => {
    let rootElement = renderedDOM();

    expect(rootElement.tagName).toEqual('DIV');

    let containerComponent = TestUtils.findRenderedDOMComponentWithClass(component, 'grid-container');
    let containerWrapper = React.findDOMNode(containerComponent);
    expect(containerWrapper.classList.length).toEqual(1);

    let submissionComponent = TestUtils.findRenderedDOMComponentWithClass(containerComponent, 'submissions');
    expect(submissionComponent).toBeTruthy();
    expect(React.findDOMNode(submissionComponent).classList.length).toEqual(3);

    let showHideElement = TestUtils.findRenderedDOMComponentWithClass(submissionComponent, 'show-hide');
    expect(showHideElement).toBeTruthy();
    expect(React.findDOMNode(showHideElement).classList.length).toEqual(1);

  });


  describe('Show Hide Button', () => {
    let showHideButton, showHideDOM;

    beforeEach(() => {
      showHideButton = TestUtils.findRenderedDOMComponentWithClass(component, 'button');
      showHideDOM = React.findDOMNode(showHideButton);
    });

    it('has button on Show Submissions', () => {
      expect(showHideButton.tagName).toEqual('DIV');
      expect(showHideDOM.textContent).toEqual('See current submissions');
    });

    it('has button on Hide Submissions', () => {
      TestUtils.Simulate.click(showHideButton);
      expect(showHideDOM.textContent).toEqual('Hide submissions');
    });
  });

  describe('Reading Submissions', () => {
    let componentContent, pagesSection, examplePages;

    beforeEach(() => {
      examplePages = [
        {
          id: { objectId: '1' },
          content: 'First Paragraph',
          creator: {smallAvatar: {_url: 'http://i.imgur.com/9f6538R.png'}},
          image: {_url: 'http://i.imgur.com/9f6538R.png'}
        },
        {
          id: { objectId: '2' },
          content: 'Second Paragraph',
          creator: {smallAvatar: {_url: 'http://i.imgur.com/9f6538R.png'}},
          image: {_url: 'http://i.imgur.com/9f6538R.png'}
        }
      ];

      spyOn(Submissions.prototype, 'observe');

      componentContent = TestUtils.renderIntoDocument(<Submissions storyId='1' pages={examplePages} />);
      componentContent.setState({isShowing: true});
      pagesSection = TestUtils.findRenderedDOMComponentWithClass(componentContent, 'pending-pages');
    });

    it('shows several submissions', () => {
      expect(pagesSection).toBeTruthy();
      expect(React.findDOMNode(pagesSection).classList.length).toEqual(3);

      expect(Submissions.prototype.observe).toHaveBeenCalled();

      let result = TestUtils.scryRenderedDOMComponentsWithClass(pagesSection, 'page-row');
      expect(result.length).toEqual(examplePages.length);
    });
  });

});
