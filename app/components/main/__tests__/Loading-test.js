import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Loading from '../Loading';

describe('Loading', () => {
  beforeEach(function() {
    this.renderer = TestUtils.createRenderer();
    this.renderer.render(<Loading />);
  });

  it('renders', () => {
    let element = TestUtils.renderIntoDocument(<Loading />);
    expect(element).toBeTruthy();
  });

  it('shows loading', function() {
    let result = this.renderer.getRenderOutput();
    expect(result.type).toEqual('h1');
    expect(result.props.children).toEqual('Loading');
  });
});