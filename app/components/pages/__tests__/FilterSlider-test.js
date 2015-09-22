import React from 'react/addons';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
const ParseComponent = ParseReact.Component(React);

import FilterSlider from '../FilterSlider';

describe('FilterSlider logic', () => {
  const { TestUtils } = React.addons;

  describe('Filter Button', () => {
    let component, filterBtn, filterBtnElement;

    beforeEach(() => {
      Parse.initialize('testid', 'testkey');

      component = TestUtils.renderIntoDocument(<FilterSlider />);
      filterBtn = TestUtils.findRenderedDOMComponentWithClass(component, 'filter-button');
      filterBtnElement = React.findDOMNode(filterBtn);
    });

    it('has filter button when filtering is OFF', () => {
      expect(filterBtn).toBeTruthy();
      expect(filterBtnElement.classList.length).toEqual(2);
      expect(filterBtnElement.classList).toContain('filter-button');
      expect(filterBtnElement.classList).toContain('grid-container');
    });

    it('has filter button when filtering is ON', () => {
      TestUtils.Simulate.click(filterBtn);
      expect(filterBtn).toBeTruthy();
      expect(filterBtnElement.classList.length).toEqual(3);
      expect(filterBtnElement.classList).toContain('active');
      expect(filterBtnElement.classList).toContain('filter-button');
      expect(filterBtnElement.classList).toContain('grid-container');
    });
  });

  describe('Empty list', () => {
    let component, renderedDOM;

    beforeEach(() => {
      Parse.initialize('testid', 'testkey');

      component = TestUtils.renderIntoDocument(<FilterSlider />);
      renderedDOM = () => React.findDOMNode(component);
    });

    it('renders empty list', () => {
      Parse.initialize('testid', 'testkey');
      expect(component).toBeTruthy();

      let rootElement = renderedDOM();

      expect(rootElement.tagName).toEqual('DIV');
      expect(rootElement.classList.length).toEqual(1);
      expect(rootElement.classList).toContain('filter-slider-section');
    });
  });

  describe('Filtering list of three elements', () => {
    let component, sliderComponent, sliderWrapperComponent, filterBtn, examplePages;

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
        },
        {
          id: { objectId: '3' },
          content: 'Third Paragraph',
          creator: {smallAvatar: {_url: 'http://i.imgur.com/9f6538R.png'}},
          image: {_url: 'http://i.imgur.com/9f6538R.png'}
        }
      ];

      spyOn(FilterSlider.prototype, 'observe');

      component = TestUtils.renderIntoDocument(<FilterSlider pages={examplePages} />);
      sliderWrapperComponent = TestUtils.findRenderedDOMComponentWithClass(component, 'filter-slide-slick-wrapper');
      sliderComponent = TestUtils.findRenderedDOMComponentWithClass(component, 'filter-slide-slick');
      filterBtn = TestUtils.findRenderedDOMComponentWithClass(component, 'filter-button');
    });

    it('render without filtering', () => {
      expect(sliderWrapperComponent).toBeTruthy();
      let sliderWrapperElement = React.findDOMNode(sliderWrapperComponent);
      expect(sliderWrapperElement.classList.length).toEqual(3);
      expect(sliderWrapperElement.classList).toContain('filter-slide-slick-wrapper');
      expect(sliderWrapperElement.classList).toContain('grid-block');
      expect(sliderWrapperElement.classList).toContain('small-up-3');

      expect(sliderComponent).toBeTruthy();
      let sliderElement = React.findDOMNode(sliderComponent);
      expect(sliderElement.classList).toContain('filter-slide-slick');

      expect(FilterSlider.prototype.observe).toHaveBeenCalled();

      let pageEditCounter = TestUtils.scryRenderedDOMComponentsWithClass(sliderComponent, 'page-edit-row');
      expect(pageEditCounter.length).toEqual(examplePages.length);

      let pageCounter = TestUtils.scryRenderedDOMComponentsWithClass(sliderComponent, 'page-row');
      expect(pageCounter.length).toEqual(examplePages.length);
    });

    it('render with filtering but without saved elements ', () => {
      TestUtils.Simulate.click(filterBtn);
      sliderWrapperComponent = TestUtils.scryRenderedDOMComponentsWithClass(component, 'filter-slide-slick-wrapper');
      expect(sliderWrapperComponent.length).toBeFalsy();

      sliderComponent = TestUtils.scryRenderedDOMComponentsWithClass(component, 'filter-slide-slick');
      expect(sliderComponent.length).toBeFalsy();
    });

    it('render with filtering, with one saved element', () => {
      let pageEditComponents = TestUtils.scryRenderedDOMComponentsWithClass(sliderComponent, 'page-edit-row');
      expect(pageEditComponents.length).toEqual(examplePages.length)
      let starButton = TestUtils.scryRenderedDOMComponentsWithClass(pageEditComponents[0], 'star-icon');
      TestUtils.Simulate.click(starButton);

      sliderWrapperComponent = TestUtils.scryRenderedDOMComponentsWithClass(component, 'filter-slide-slick-wrapper');
      expect(sliderWrapperComponent.length).toEqual(1);

      sliderComponent = TestUtils.scryRenderedDOMComponentsWithClass(component, 'filter-slide-slick');
      expect(sliderComponent.length).toEqual(1);
    });

  });
});
