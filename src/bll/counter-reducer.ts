
const initialState = {
    count: 0,
}

type InitialStateType = typeof initialState

export const counterReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    return state
}