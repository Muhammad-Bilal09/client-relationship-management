import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '@/types/type';

const initialState: UserState = {
  email: '',
  password: '',
  name: '',
  totalCustomers: 0, 
  error: '',
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setTotalCustomers(state, action: PayloadAction<number>) { 
      state.totalCustomers = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    clearState(state) {
      state.email = '';
      state.password = '';
      state.name = '';
      state.totalCustomers = 0; 
      state.error = '';
      state.isLoading = false;
    },
  },
});

export const { setEmail, setPassword, setName, setTotalCustomers, setError, setLoading, clearState } = userSlice.actions;

export default userSlice.reducer;