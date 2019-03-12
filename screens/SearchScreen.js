import React from "react"
import { View, ScrollView, StyleSheet, Text } from "react-native"

import Header from "../components/Header"
import AppSegment from "../components/Segment"
import SearchSingleElement from "../components/SearchSingleElement"
import SearchBar from "../components/SearchBar"

const key = "8367b1854dccedcfc9001204de735470"

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      segments: ["Movies", "People", "TV Show"],
      selectedIndex: 0
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View>
          <Header subtitle="Search" />
        </View>
      )
    }
  }

  loadData() {
    switch (this.state.selectedIndex) {
      case 0:
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${
            this.state.search
          }&page=1&include_adult=false`
        )
          .then(res => res.json())
          .then(json => this.setState({ data: json.results }))
        break
      case 1:
        fetch(
          `https://api.themoviedb.org/3/search/person?api_key=${key}&language=en-US&query=${
            this.state.search
          }&page=1&include_adult=false`
        )
          .then(res => res.json())
          .then(json => {
            if(json.results.length > 0) {
              this.setState({ data: json.results[0].known_for })

            }
          })
        break
      case 2:
        fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&query=${
            this.state.search
          }&page=1`
        )
          .then(res => res.json())
          .then(json => this.setState({ data: json.results }))
        break
      default:
        break
    }
  }

  selectTabs = index => {
    this.setState({
      selectedIndex: index
    })
  }

  handleInput = text => {
    this.setState({
      search: text
    })
  }

  componentDidMount() {}

  componentDidUpdate(prevState) {
    if (this.state.search !== prevState.search) {
      this.loadData()
      return true
    }
    return false
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <AppSegment
            segments={this.state.segments}
            selectedIndex={this.state.selectedIndex}
            selectedTabs={this.selectTabs}
          />
          <SearchBar handleInput={this.handleInput} />

          {this.state.selectedIndex == 0 && (
            <Text style={styles.result}>
              Movie results for {this.state.search}
            </Text>
          )}
          {this.state.selectedIndex == 1 && (
            <Text style={styles.result}>
              {this.state.search} is in the following movies:
            </Text>
          )}
          {this.state.selectedIndex == 2 && (
            <Text style={styles.result}>
              TV Show results for {this.state.search}
            </Text>
          )}
        </View>
        <ScrollView
          style={styles.scrollcontainer}
          contentContainerStyle={styles.scrollcontainer}
        >
          {this.state.data &&
            this.state.data.map((movie, index) => {
              if (index < 10) {
                return (
                  <SearchSingleElement
                    key={index}
                    img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    name={movie.title}
                    overview={`${movie.overview.substring(0, 200)}...`}
                  />
                )
              }
            })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200
  },
  result: {
    paddingLeft: 20,
    paddingTop: 20
  },
  scrollcontainer: {
    flex: 0
  }
})
