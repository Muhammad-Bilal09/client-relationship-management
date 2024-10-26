import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { DocumentState, Document } from "@/types/type";

const initialState: DocumentState = {
  documents: [],
  loading: false,
  error: null,
};

export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async () => {
    try {
      const response = await axios.get("/api/getDocument");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch documents"
      );
    }
  }
);

export const createDocument = createAsyncThunk(
  "documents/createDocument",
  async ({ title, type, date, description, fileUrl }: Omit<Document, "id">) => {
    try {
      const response = await axios?.post("/api/createDocuments", {
        title,
        type,
        date,
        description,
        fileUrl,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Failed to create document"
      );
    }
  }
);

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDocuments.fulfilled,
        (state, action: PayloadAction<Document[]>) => {
          state.documents = action?.payload;
          state.loading = false;
        }
      )
      .addCase(fetchDocuments?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Error fetching documents";
      })
      .addCase(createDocument?.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createDocument?.fulfilled,
        (state, action: PayloadAction<Document>) => {
          state.documents?.push(action?.payload);
          state.loading = false;
        }
      )
      .addCase(createDocument?.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Error creating document";
      });
  },
});

export default documentSlice.reducer;
