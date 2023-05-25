import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


const handleToken = () => {
    const BEARER_TOKEN = localStorage.getItem("token")

    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
    }
}

const verify_account = createAsyncThunk("verify_account", async ({ verify_code }) => {
    try {
        const response = await axios.get(`https://dev2-lv2s.onrender.com/users/verify/${verify_code}`, handleToken())
        return {
            response: { user: response.data },
            message: "Author found",
        }
    } catch (error) {
        return {
            response: { user: error.response.data },
            message: "Author not found",
        }
    }
});

export default verify_account