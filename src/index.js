import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './searchform';
import './styles.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
      jokes: [],
      isFetchingJokes: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
  }

  searchJokes(limit = 20) {
    this.setState({ isFetchingJokes: true });

    fetch(
      `https://icanhazdadjoke.com/search?term=${
        this.state.searchTerm
      }&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        const jokes = json.results;
        this.setState({
          jokes,
          isFetchingJokes: false
        });
      });
  }

  onSearchChange(value) {
    this.setState({ searchTerm: value });
  }

  renderJokes() {
    return (
      <ul className="jokes-list">
        {this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <img alt="dad google  logo"
          className="logo"
          src="https://runt-of-the-web.com/wordpress/wp-content/uploads/2014/11/Dad-Google-featured.png"
        />

        <SearchForm
          onFormSubmit={this.searchJokes}
          onSearchValueChange={this.onSearchChange}
          isSearching={this.state.isFetchingJokes}
          onSingleSearchClick={() => this.searchJokes(1)}
        />

        {this.state.isFetchingJokes
          ? 'searching for jokes...'
          : this.renderJokes()}
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App version="1.0" />, rootElement);
