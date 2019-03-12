import React from "react"

import { Button, Segment, Text } from "native-base"

const AppSegment = props => {
  const { segments, selectedIndex } = props
  return (
    <Segment>
      {segments.map((segment, index) => {
        if (index == 0) {
          return (
            <Button
              first
              key={index}
              active={selectedIndex === index}
              onPress={() => props.selectedTabs(index)}
            >
              <Text>{segment}</Text>
            </Button>
          )
        } else if (index == segments.length - 1) {
          return (
            <Button
              last
              key={index}
              active={selectedIndex === index}
              onPress={() => props.selectedTabs(index)}
            >
              <Text>{segment}</Text>
            </Button>
          )
        } else {
          return (
            <Button
              key={index}
              active={selectedIndex === index}
              onPress={() => props.selectedTabs(index)}
            >
              <Text>{segment}</Text>
            </Button>
          )
        }
      })}
    </Segment>
  )
}

export default AppSegment
