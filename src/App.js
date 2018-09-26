import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Menu from './Menu'
import Home from './Home'
import Series from './Series'
import NewSerie from './NewSerie'
import EditSeries from './EditSeries'

const About = () => <section className="intro-section"> <h2>Sobre ...</h2> </section>

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Route exact path='/' component={Home} />
          <Route exact path='/series-edit/:id' component={EditSeries} />
          <Route exact path='/series/:genre' component={Series} />
          <Route exact path='/new' component={NewSerie} />
          <Route exact path='/about' component={About} />
        </div>
      </Router>
    )
  }
}

export default App;
