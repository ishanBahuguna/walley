import { createSlice , PayloadAction } from "@reduxjs/toolkit";

export interface BalanceState {
    value : number
}

const initialState : BalanceState = {
    value : 0,
}
export const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers : {
        increment:(state) => {
            state.value += 1
        },

        decrement:(state) => {
            state.value -= 1
        },

        incrementByAmount:(state , action:PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})


export const { increment , decrement , incrementByAmount } = balanceSlice.actions



export default balanceSlice.reducer