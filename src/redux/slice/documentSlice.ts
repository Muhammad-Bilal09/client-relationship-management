import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DocumentState,Document } from '@/types/type';

const initialState: DocumentState = {
  documents: [],
  loading: false,
  error: null,
};

export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async () => {
  const response = await fetch('/api/getDocument');
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch documents');
  return data;
});
export const createDocument = createAsyncThunk(
  'documents/createDocument',
  async ({ title, type, date, description, fileUrl }: Omit<Document, 'id'>) => {
    const response = await fetch('/api/createDocuments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, type, date, description, fileUrl }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create document');
    return data;
  }
);

// export const createDocument = createAsyncThunk(
//   'documents/createDocument',
//   async ({ title, type, date, description, fileUrl }: Omit<Document, 'id'>) => {
//     const response = await fetch('/api/createDocuments', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, type, date, description, fileUrl }),
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.error || 'Failed to create document');
//     return data;
//   }
// );

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action: PayloadAction<Document[]>) => {
        state.documents = action.payload;
        state.loading = false;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching documents';
      })
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDocument.fulfilled, (state, action: PayloadAction<Document>) => {
        state.documents.push(action.payload);
        state.loading = false;
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error creating document';
      });
  },
});

export default documentSlice.reducer;
