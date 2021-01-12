import React from 'react'
import renderer from 'react-test-renderer'

const singleSnapTest = (tree, description) => {
  it(description, () => {
    expect(tree).toMatchSnapshot()
  })
}

const testSnapshots = (Component, configs) => {
  describe('snapshots', () => {
    configs.forEach(config => {
      const { props, description } = config
      const tree = renderer.create(<Component {...props} />).toJSON()
      singleSnapTest(tree, description)
    })
  })
}

export { testSnapshots }
