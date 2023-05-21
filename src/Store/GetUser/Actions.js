import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const oneUser = createAsyncThunk("oneUser", async ({ user_id }) => {
    try {
        let res = await axios.get(`http://localhost:8080/users/` + user_id);
        console.log(res)
        return { user: res.data.user };
    } catch (error) {
        return { user: [] };
    }
});

const actionUser = { oneUser }
export default actionUser