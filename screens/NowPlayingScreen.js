import React from "react"
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { Dimensions } from "react-native"
import Header from "../components/Header"

const win = Dimensions.get("window")
const IMG_WIDTH = 500
const IMG_HEIGHT = 756
const ratio = win.width / IMG_WIDTH

export default class NowPlayingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      img: "https://www.movieposters4u.com/images/b/BladeRunner2049Final.jpg",
      title: "Movie title",
      popularity: 100,
      release_date: "2019-03-12",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis amet deleniti corrupti libero qui quis ducimus est, dolor ab, dolore iste eaque consequuntur vero repellat.Ab eaque molestias iste ad."
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View>
          <Header subtitle="Now Playing" />
        </View>
      )
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=8367b1854dccedcfc9001204de735470`
    )
      .then(response => response.json())
      .then(json => {
        const random = Math.floor(Math.random() * 11)
        this.setState({
          img: `https://image.tmdb.org/t/p/w500/${
            json.results[random].poster_path
          }`,
          title: json.results[random].title,
          popularity: json.results[random].popularity,
          release_date: json.results[random].release_date,
          overview: json.results[random].overview
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={{
                uri: this.state.img
              }}
              style={styles.image}
            />
            <Text style={styles.title}>{this.state.title}</Text>
            <Text style={styles.subtitle}>Popularity: {this.state.popularity}</Text>
            <Text style={styles.subtitle}>Release Date: {this.state.release_date}</Text>
            <Text style={styles.para}>{this.state.overview}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  image: {
    width: win.width - 100,
    height: IMG_HEIGHT * ratio - 100,
    resizeMode: "contain",
    // marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "300",
    fontStyle: "italic",
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center"
  },
  para: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    marginTop: 20
  }
})
