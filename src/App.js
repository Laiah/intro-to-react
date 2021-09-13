//import logo from './logo.svg';
import './App.css';
import React from 'react';
import SearchForm from './SearchForm';
import { ChakraProvider } from "@chakra-ui/react"
import { Box, ListItem, List, Text } from "@chakra-ui/react"


class App extends React.Component {
  joke = null;

  constructor() {
    super();

    this.state = {
      searchTerms: '',
      jokes: [],
      isFetchingJoke: false
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.searchJokes = this.searchJokes.bind(this)
    this.onClearInput = this.onClearInput.bind(this)
  }

  searchJokes(limit = 20) {
    this.setState({ isFetchingJoke: true })
    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerms}&limit=${limit}`, {
      method: 'GET',
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        const jokes = json.results;
        this.setState({
          jokes,
          isFetchingJoke: false
        })
      });
  }

  onSearchChange(value) {
    this.setState({ searchTerms: value })
  }

  renderJokes() {
    if (this.state.jokes.length !== 0) {
      return (
        <Box p={4} mt={4}>
          <List spacing={3}>
            {this.state.jokes.map(item => 
              <ListItem key={item.id} p={4} _even={{background:"gray.100"}} _odd={{background:"orange.100"}}>
                <Text fontSize="xl">{item.joke}</Text>
              </ListItem>
            )}
          </List>
        </Box>
      );
    }
    
    return '';
  }

  onClearInput(event) {
    const input = event.target.parentElement.parentElement.previousSibling;
    input.value = '';
    this.setState({ searchTerms: '' })
  }

  render() {
    return (
      <ChakraProvider>
        <div>
          <SearchForm
            onFormSubmit={this.searchJokes}
            onSearchValueChange={this.onSearchChange}
            isSearching={this.state.isFetchingJoke}
            onSingleSearchClick={() => this.searchJokes(1)}
            clearInput={this.onClearInput}
          />

          {this.state.isFetchingJoke ? 'searching for jokes...' : this.renderJokes()}
        </div>
      </ChakraProvider>
    );
  }
}


export default App;
