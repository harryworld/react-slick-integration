import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import App from '../App';
import StubRouterContext  from '../../../support/stub_router_context';

describe('App', () => {
  it('renders', (done) => {
    let Subject = StubRouterContext(App);
    let element = TestUtils.renderIntoDocument(<Subject />);

    expect(element).toBeTruthy();
    done();
  });
});