// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// export interface UserRegisterState {
//   name: string;
//   email: string;
//   password: string;
// }

// const initialState: UserRegisterState = {
//   name: "",
//   email: "",
//   password: "",
// };
// export const registerUser = createAsyncThunk(
//   "user/register",
//   async (userData: UserRegisterState, { rejectWithValue }) => {
//     try {
//       const response = await fetch("/api/register-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: userData?.name,
//           email: userData?.email,
//           password: userData?.password,
//         }),
//       });
//       if (!response.ok) {
//         toast.error("Registration failed");
//         throw new Error("Registration failed");
//       }
//       const user = await response.json();
//       if (user.status === 201) {
//         toast.success("User registered successfully");
//         return user;
//       } else {
//         toast.error(
//           "user registration failed : Email already exists Or Invalid data"
//         );
//         throw new Error("Registration failed");
//       }
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const UserRegisterSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(registerUser.fulfilled, (state, action) => {
//       state = action.payload;
//     });
//     builder.addCase(registerUser.rejected, (state, action) => {
//       console.log(action.error.message);
//     });
//   },
// });

// export default UserRegisterSlice.reducer;