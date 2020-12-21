import { useState } from 'react'

const useMergeState = (initialState) => {
	const [state, setState] = useState(initialState)
	const setMergedState = (newState) =>
		setState((prevState) => ({ ...prevState, ...newState }))
	return [state, setMergedState]
}

export default useMergeState
