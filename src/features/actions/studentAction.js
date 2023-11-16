import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { host } from "../../Components/Shared/host";
import setAutHeader from "../../utils/setAuthHeader";

export const getLoggedInUser = createAsyncThunk('student/loggedInStudent', async (token) => {
    setAutHeader(token)
    const result = await axios.get(`${host}/api/v1/auth/loggedIn`)
    return result.data;
});