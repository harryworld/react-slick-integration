import React from 'react/addons';
import CommentsBox from '../CommentsBox';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);

describe('CommentsBox', () => {
  describe('without props', () => {
    const { TestUtils } = React.addons;
    let root, renderedDOM;

    beforeEach(() => {
      Parse.initialize('testid', 'testkey');
      root = TestUtils.renderIntoDocument(<CommentsBox pageId="" />);
      renderedDOM = () => React.findDOMNode(root);
    });

    it('renders', () => {
      expect(root).toBeTruthy();
    });

    it('renders with proper CSS classes', () => {
      let rootElement = renderedDOM();
      expect(rootElement.tagName).toEqual('DIV');
      expect(rootElement.classList).toContain('comment-box');
      expect(rootElement.classList.length).toEqual(1);

      let messageAreaElement = TestUtils.findRenderedDOMComponentWithClass(root, 'message-area');
      expect(messageAreaElement).toBeTruthy();

      expect(() => {
        TestUtils.findRenderedDOMComponentWithClass(root, 'comment');
      }).toThrow();

      let inputElement = TestUtils.findRenderedDOMComponentWithTag(root, 'input');
      expect(inputElement).toBeTruthy();
    });
  });

  describe('with props', () => {
    const { TestUtils } = React.addons;
    let root, renderedDOM;
    const TEST_DATA = [{
      id: { objectId: '1' },
      content: 'First Paragraph',
      creator: {
        smallAvatar: {_url: 'http://i.imgur.com/9f6538R.png'},
        username: 'username 1'
      },
    }, {
      id: { objectId: '2' },
      content: 'Second Paragraph',
      creator: {
        smallAvatar: {_url: 'http://i.imgur.com/9f6538R.png'},
        username: 'username 2'
      },
    }, {
      id: { objectId: '3' },
      content: 'Third Paragraph',
      creator: {
        smallAvatar: {_url: 'http://i.imgur.com/9f6538R.png'},
        username: 'username 3'
      },
    }];

    beforeEach(() => {
      Parse.initialize('testid', 'testkey');
      spyOn(CommentsBox.prototype, 'observe');
      spyOn(CommentsBox.prototype, 'handleAddComment');
      root = TestUtils.renderIntoDocument(<CommentsBox pageId="" comments={TEST_DATA} />);
      renderedDOM = () => React.findDOMNode(root);
    });

    it('renders', () => {
      expect(root).toBeTruthy();
    });

    it('renders with proper CSS classes', () => {
      let rootElement = renderedDOM();
      expect(rootElement.tagName).toEqual('DIV');
      expect(rootElement.classList).toContain('comment-box');
      expect(rootElement.classList.length).toEqual(1);

      let messageAreaElement = TestUtils.findRenderedDOMComponentWithClass(root, 'message-area');
      expect(messageAreaElement).toBeTruthy();

      let commentsCounter = TestUtils.scryRenderedDOMComponentsWithClass(root, 'comment');
      expect(commentsCounter.length).toEqual(TEST_DATA.length);

      let inputElement = TestUtils.findRenderedDOMComponentWithTag(root, 'input');
      expect(inputElement).toBeTruthy();

      expect(CommentsBox.prototype.observe).toHaveBeenCalled();
    });

    it('handle add comment', () => {
      let formElement = TestUtils.findRenderedDOMComponentWithTag(root, 'form');
      expect(formElement).toBeTruthy();
      TestUtils.Simulate.submit(formElement);
      expect(CommentsBox.prototype.handleAddComment).toHaveBeenCalled();
    });
  });
});