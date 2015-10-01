import React from 'react/addons';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);

import PageSlider from '../PageSlider';

describe('PageSlider logic', () => {
  const { TestUtils } = React.addons;

  describe('Filter Button', () => {
    let root, getRootDOM, examplePages;

    let testProps = {
      onClose: () => {}
    };

    beforeEach(() => {
      Parse.initialize('testid', 'testkey');

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
        },
        {
          id: { objectId: '3' },
          content: 'Third Paragraph',
          creator: {smallAvatar: {_url: 'http://i.imgur.com/9f6538R.png'}},
          image: {_url: 'http://i.imgur.com/9f6538R.png'}
        }
      ];

      spyOn(PageSlider.prototype, 'observe');
      spyOn(testProps, 'onClose');

      root = TestUtils.renderIntoDocument(<PageSlider pages={examplePages} onClose={testProps.onClose}/>);
      getRootDOM = () => React.findDOMNode(root);

    });

    it('renders', () => {
      let rootElement = getRootDOM();
      expect(rootElement.tagName).toEqual('DIV');
      expect(rootElement.classList.length).toEqual(1);
      expect(rootElement.classList).toContain('page-slider-wrapper');

      let slider = TestUtils.findRenderedDOMComponentWithClass(root, 'page-slider-slick');
      expect(slider).toBeTruthy();

      let pageCounter = TestUtils.scryRenderedDOMComponentsWithClass(root, 'page-row');
      expect(pageCounter.length).toEqual(examplePages.length);

      let closeBtn = TestUtils.findRenderedDOMComponentWithClass(root, 'close-slider-button');
      let closeBtnDOM = React.findDOMNode(closeBtn);
      expect(closeBtn).toBeTruthy();

      expect(PageSlider.prototype.observe).toHaveBeenCalled();
    });

    it('close button', () => {
      let closeBtn = TestUtils.findRenderedDOMComponentWithClass(root, 'close-slider-button');
      let closeBtnDOM = React.findDOMNode(closeBtn);
      expect(closeBtn).toBeTruthy();

      expect(testProps.onClose.calls.any()).toEqual(false);
      TestUtils.Simulate.click(closeBtn);
      expect(testProps.onClose.calls.any()).toEqual(true);
    });
  });
});
