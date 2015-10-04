import React from 'react/addons';
import Comment from '../Comment';

describe('Comment', () => {
  describe('without props', () => {
    const { TestUtils } = React.addons;
    let component, renderedDOM;
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<Comment />);
      renderedDOM = () => React.findDOMNode(component);
    });

    it('renders', () => {
      expect(component).toBeTruthy();
    });

    it('renders with proper CSS classes', () => {
      let rootElement = renderedDOM();
      expect(rootElement.tagName).toEqual('DIV');
      expect(rootElement.classList).toContain('comment');
      expect(rootElement.classList.length).toEqual(1);

      let imgElement = TestUtils.findRenderedDOMComponentWithTag(component, 'img');
      expect(imgElement).toBeTruthy();

      let textElement = TestUtils.findRenderedDOMComponentWithClass(component, 'text');
      expect(textElement).toBeTruthy();

      let usernameElement = TestUtils.findRenderedDOMComponentWithClass(component, 'username');
      expect(usernameElement).toBeTruthy();
    });

    it('shows default avatar if the database doesn\'t have the record', () => {
      let imgElement = TestUtils.findRenderedDOMComponentWithTag(component, 'img');
      expect(imgElement).toBeTruthy();
      expect(imgElement.props.src).toBeDefined();
    });
  });

  describe('with props', () => {
    const { TestUtils } = React.addons;
    let component, renderedDOM;
    const TEST_DATA = {
      content: 'TEST_CONTENT',
      creator: {
        smallAvatar: {
          _url: 'http://i.imgur.com/9f6538R.png'
        },
        username: 'TEST_USERNAME'
      }
    };

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<Comment {...TEST_DATA} />);
      renderedDOM = () => React.findDOMNode(component);
    });

    it('renders', () => {
      expect(component).toBeTruthy();
    });

    it('renders with proper CSS classes', () => {
      let rootElement = renderedDOM();
      expect(rootElement.tagName).toEqual('DIV');
      expect(rootElement.classList).toContain('comment');
      expect(rootElement.classList.length).toEqual(1);

      let imgElement = TestUtils.findRenderedDOMComponentWithTag(component, 'img');
      expect(imgElement).toBeTruthy();

      let textElement = TestUtils.findRenderedDOMComponentWithClass(component, 'text');
      expect(textElement).toBeTruthy();

      let usernameElement = TestUtils.findRenderedDOMComponentWithClass(component, 'username');
      expect(usernameElement).toBeTruthy();
    });

    it('renders avatar', () => {
      let imgElement = TestUtils.findRenderedDOMComponentWithTag(component, 'img');
      expect(imgElement).toBeTruthy();
      expect(imgElement.props.src).toEqual('http://i.imgur.com/9f6538R.png');
    });

    it('renders username', () => {
      let usernameElement = TestUtils.findRenderedDOMComponentWithClass(component, 'username');
      expect(usernameElement).toBeTruthy();
      expect(usernameElement.props.children).toEqual(TEST_DATA.creator.username);
    });

    it('renders content', () => {
      let contentElement = TestUtils.findRenderedDOMComponentWithClass(component, 'content');
      expect(contentElement).toBeTruthy();
      expect(contentElement.props.children).toEqual(TEST_DATA.content);
    });
  });
});