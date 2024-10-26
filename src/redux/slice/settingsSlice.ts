import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SettingsState,UserPayload } from '@/types/type';


const initialState: SettingsState = {
  newName: '',
  newEmail: '',
  currentPassword: '',
  newPassword: '',
  profileImg: '/path/to/default/image.jpg',
  isProfileModalOpen: false,
  isPasswordModalOpen: false,
};

export const updateProfile = createAsyncThunk<void, UserPayload>(
  'settings/updateProfile',
  async ({ userId, newName, }: UserPayload) => {
    if (!userId) throw new Error('User ID is required');
    await axios.post('/api/updateUser', { userId, newName });
  }
);

export const changePassword = createAsyncThunk<void, UserPayload>(
  'settings/changePassword',
  async ({ userId, currentPassword, newPassword }: UserPayload) => {
    if (!userId) throw new Error('User ID is required');
    await axios.post('/api/changePassword', { userId, currentPassword, newPassword });
  }
);

export const uploadUserImage = createAsyncThunk<void, FormData>(
  'settings/uploadUserImage',
  async (formData: FormData) => {
    await axios.post('/api/uploadUserImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setNewName: (state, action) => {
      state.newName = action.payload;
    },
    setNewEmail: (state, action) => {
      state.newEmail = action.payload;
    },
    setCurrentPassword: (state, action) => {
      state.currentPassword = action.payload;
    },
    setNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload;
    },
    toggleProfileModal: (state, action) => {
      state.isProfileModalOpen = action.payload;
    },
    togglePasswordModal: (state, action) => {
      state.isPasswordModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.fulfilled, (state) => {
       
      })
      .addCase(changePassword.fulfilled, (state) => {
        
      })
      .addCase(uploadUserImage.fulfilled, (state) => {
       
      });
  },
});

export const {
  setNewName,
  setNewEmail,
  setCurrentPassword,
  setNewPassword,
  setProfileImg,
  toggleProfileModal,
  togglePasswordModal,
} = settingsSlice.actions;

export default settingsSlice.reducer;