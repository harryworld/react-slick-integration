import React from 'react/addons';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);

import BoardPage from '../BoardPage';

describe('BoardPage logic', () => {
  const { TestUtils } = React.addons;

  describe('Filter Button', () => {
    let root, getRootDOM;

    beforeEach(() => {
      Parse.initialize('testid', 'testkey');

      root = TestUtils.renderIntoDocument(<BoardPage />);
      getRootDOM = () => React.findDOMNode(root);
    });

    it('renders as PAGE', () => {
      let rootElement = getRootDOM();
      expect(rootElement.tagName).toEqual('DIV');
      expect(rootElement.classList.length).toEqual(1);
      expect(rootElement.classList).toContain('board-page');

      let pageWrapper = TestUtils.findRenderedDOMComponentWithClass(root, 'page-wrapper');
      let pageWrapperDOM = React.findDOMNode(pageWrapper);
      expect(pageWrapper).toBeTruthy();
      expect(pageWrapperDOM.tagName).toEqual('DIV');
      expect(pageWrapperDOM.classList.length).toEqual(2);
      expect(pageWrapperDOM.classList).toContain('page-wrapper');
      expect(pageWrapperDOM.classList).toContain('grid-container');

      let page = TestUtils.findRenderedDOMComponentWithClass(pageWrapper, 'page-row');
      expect(page).toBeTruthy();

      let showMoreBtn = TestUtils.findRenderedDOMComponentWithClass(pageWrapper, 'toggle-view-button');
      let showMoreBtnDOM = React.findDOMNode(showMoreBtn);
      expect(showMoreBtn).toBeTruthy();
      expect(showMoreBtnDOM.classList.length).toEqual(1);
    });

    it('renders as SLIDER', () => {
      let showMoreBtn = TestUtils.findRenderedDOMComponentWithClass(root, 'toggle-view-button');
      TestUtils.Simulate.click(showMoreBtn);
      showMoreBtn = TestUtils.scryRenderedDOMComponentsWithClass(root, 'toggle-view-button');
      expect(showMoreBtn.length).toBeFalsy();

      let rootElement = getRootDOM();
      expect(rootElement.tagName).toEqual('DIV');
      expect(rootElement.classList.length).toEqual(1);
      expect(rootElement.classList).toContain('board-page');

      let pageWrapper = TestUtils.findRenderedDOMComponentWithClass(root, 'page-slider-wrapper');
      let pageWrapperDOM = React.findDOMNode(pageWrapper);
      expect(pageWrapper).toBeTruthy();
    });
  });
});
