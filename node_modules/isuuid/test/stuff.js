'use strict';

var isuuid = require('../index.js');
var assert = require('assert');

describe('isuuid', function() {
  it('should validate uuid', function() {
    assert.equal(isuuid('f7d3d79c-b1bb-4b1b-9dba-73c0672de57a'), true);
    assert.equal(isuuid('f7d3d79c-b1bb-4b1b-9dba-73c0672de57j'), false);
    assert.equal(isuuid('failplease'), false);
  });
});
