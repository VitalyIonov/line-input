import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import LineInput from './line-input';

import '../styles/index.less';

const container = document.getElementById('root');

const Main = () => (
  <BrowserRouter>
    <section className="form">
      <LineInput />
    </section>
  </BrowserRouter>
);

ReactDOM.render(<Main />, container);
