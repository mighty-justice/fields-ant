import React, { Component } from 'react'
import { configure, addDecorator } from '@storybook/react';
import 'antd/dist/antd.css';

const styles = {
  margin: '15px',
};
const CenterDecorator = (storyFn) => (
  <div style={styles}>
    { storyFn() }
  </div>
);
addDecorator(CenterDecorator);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
