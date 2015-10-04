import React from 'react/addons';
import Page from '../Page';

describe('Page', () => {
  const { TestUtils } = React.addons;
  let component, renderedDOM;
  let avatarElement, contentElement;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<Page />);
    renderedDOM = () => React.findDOMNode(component);

    avatarElement = TestUtils.findRenderedDOMComponentWithClass(component, 'avatar');
    contentElement = TestUtils.findRenderedDOMComponentWithClass(component, 'content');
  });

  it('renders', () => {
    expect(component).toBeTruthy();
  });

  it('renders a list with proper CSS classes', () => {
    let rootElement = renderedDOM();
    expect(rootElement.tagName).toEqual('DIV');
    expect(rootElement.classList.length).toEqual(4);
    expect(rootElement.classList).toContain('grid-block');
    expect(rootElement.classList).toContain('small-24');
    expect(rootElement.classList).toContain('large-24');

    let lineElement = TestUtils.findRenderedDOMComponentWithClass(component, 'line');
    expect(lineElement).toBeTruthy();

    expect(avatarElement).toBeTruthy();
    expect(React.findDOMNode(avatarElement).classList.length).toEqual(2);

    expect(contentElement).toBeTruthy();
    expect(React.findDOMNode(contentElement).classList.length).toEqual(2);
  });

  it('wraps page content with a <p>', () => {
    let rootElement = renderedDOM();

    component.setState({content: 'Page Content'});
    expect(rootElement.textContent).toEqual('Page Content');

    let paragraphElement = TestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(paragraphElement).toBeTruthy();
    expect(React.findDOMNode(paragraphElement).textContent).toEqual('Page Content');
  });

  it('shows avatar image <img>', () => {
    component.setState({
      creator: {
        smallAvatar: {
          _url: 'http://i.imgur.com/9f6538R.png'
        }
      }
    });

    let imgElement = TestUtils.findRenderedDOMComponentWithTag(avatarElement, 'img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.props.src).toEqual('http://i.imgur.com/9f6538R.png');
  });

  it('shows default avatar if the database doesn\'t have the record', () => {
    component.setState({
      creator: undefined
    });

    let imgElement = TestUtils.findRenderedDOMComponentWithTag(avatarElement, 'img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.props.src).toBeDefined();
  });

  it('shows content image <img> wrapped by <div>', () => {
    component.setState({
      image: {
        _url: 'http://i.imgur.com/9f6538R.png'
      },
      refPageId: 123
    });

    let contentDOMNode = React.findDOMNode(contentElement);
    expect(contentDOMNode.children[1].tagName).toEqual('DIV');
    expect(contentDOMNode.children[1].children[0].tagName).toEqual('IMG');

    let imgElement = TestUtils.findRenderedDOMComponentWithTag(contentElement, 'img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.props.src).toEqual('http://i.imgur.com/9f6538R.png');
  });

  it('should not show image for the beginning page extracted from story', () => {
    component.setState({
      image: {
        _url: 'http://i.imgur.com/9f6538R.png'
      }
    });

    expect(() => {
      TestUtils.findRenderedDOMComponentWithTag(contentElement, 'img');
    }).toThrow();
  });
});
