import React from 'react';
import ReactDOM from 'react-dom';

import InputContainer from './components/Input-container';

import '../styles/index.less';

const container = document.getElementById('root');

const Main = () => (
  <section className="form">
    <InputContainer />
  </section>
);

ReactDOM.render(<Main />, container);
