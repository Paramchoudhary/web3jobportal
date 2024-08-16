import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initializing state
const initialState = {
  loading: false,
  invsetments: null,
  plans: [],
  users: [],
  user: null,
  userInfo: null,
  jobs: null,
  job: null,
  jobsCount: null,
  usersCount: null,
  skills: [],
  roles: [],
  counts: [],
  error: null,
  success: null,
  admin: true,
};

// Generates async functions

// goggleSign
export const goggleSign = createAsyncThunk(
  "degenwork/goggleSign",
  async (token, { rejectWithValue }) => {
    console.log(token);
    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_BASE_URL}/api/auth/google`,
        token
      );
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("name", response.data.username);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.err);
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "degenwork/login",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth`,
        form
      );
      // console.log(response.data);
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("name", response.data.username);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.err);
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "degenwork/register",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user`,
        form
      );
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("name", response.data.username);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.err);
    }
  }
);

// CHANGE PASS
export const changePass = createAsyncThunk(
  "degenwork/changePass",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/auth`,
        form
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// REQUEST TOEKN
export const requestToken = createAsyncThunk(
  "degenwork/requestToken",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        ` ${import.meta.env.VITE_BASE_URL}/api/user/requestToken`,
        form
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// REQUEST TOEKN
export const resetpassword = createAsyncThunk(
  "degenwork/resetpassword",
  async (form, { rejectWithValue }) => {
    const { token } = form;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/resetpassword/${token}`,
        form
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GET JOBS
export const getJobs = createAsyncThunk(
  "degenwork/getJobs",
  async (
    {
      from = 0,
      desiredStack = "[]",
      desiredRoles = "[]",
      desiredLocation = "",
      companyKeyword = "",
      officeLoc = "[]",
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/jobs/`,
        {
          params: {
            from,
            desiredStack,
            desiredRoles,
            desiredLocation,
            companyKeyword,
            jobType: officeLoc,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Server Error");
    }
  }
);
// GET ACCOUNT DETAILS
export const getJob = createAsyncThunk(
  "degenwork/getJob",
  async (form, { rejectWithValue }) => {
    const { id } = form;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/jobs/${id}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Users
export const fetchUsers = createAsyncThunk(
  "degenwork/fetchUsers",
  async (
    {
      from = 0,
      desiredStack = [],
      desiredRoles = [],
      desiredLocation = "",
      usernameKeyword = "",
      jobType = [],
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/users`,
        {
          params: {
            from,
            desiredStack,
            desiredRoles,
            desiredLocation,
            usernameKeyword,
            jobType: jobType,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GET ACCOUNT DETAILS
export const getUser = createAsyncThunk(
  "degenwork/getUser",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        ` ${import.meta.env.VITE_BASE_URL}/api/auth`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// GET ACCOUNT DETAILS
export const getUserInfo = createAsyncThunk(
  "degenwork/getUserInfo",
  async (form, { rejectWithValue }) => {
    const { id } = form;
    try {
      const response = await axios.get(
        ` ${import.meta.env.VITE_BASE_URL}/api/user/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// ADD SKILLS
export const addSkills = createAsyncThunk(
  "degenwork/addSkills",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/addfilters/`,
        form
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Users
export const deleteUser = createAsyncThunk(
  "degenwork/deleteUser",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/user/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  ADD ROLES
export const addRoles = createAsyncThunk(
  "degenwork/addRoles",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/addfilters/`,
        form
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "degenwork/updateUser",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/changeProfile`,
        form
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// FETCH SKILLS
export const fetchSkills = createAsyncThunk(
  "degenwork/fetchSkills",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/addfilters/skills`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// FETCH ROLES
export const fetchRoles = createAsyncThunk(
  "degenwork/fetchRoles",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/addfilters/roles`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// DELETE SKILLS
export const deleteSkills = createAsyncThunk(
  "degenwork/deleteSkills",
  async ({ selectedFilter }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/addfilters/skills`,
        {
          data:selectedFilter, // Use the 'data' field to send the body in a DELETE request
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// DELETE SKILLS
export const deleteRoles = createAsyncThunk(
  "degenwork/deleteRoles",
  async ({ selectedFilter }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/addfilters/roles`,
        {
          data:selectedFilter, // Use the 'data' field to send the body in a DELETE request
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// UPDATE WITDRAWALS
export const updateWithdrawals = createAsyncThunk(
  "degenwork/updateWithdrawals",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/withdraw/${id}`,
        { status }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Users
export const deleteJob = createAsyncThunk(
  "degenwork/deleteJob",
  async (id, { rejectWithValue }) => {
    // console.log(id);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/jobs/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// DELETE TESTIMONIALS
export const deleteTestimonials = createAsyncThunk(
  "degenwork/deleteTestimonials",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/testimonies/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// MAKE CONTACT
export const makeContact = createAsyncThunk(
  "degenwork/makeContact",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/contact/`,
        form
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// REDUCERS
const degenworkSlice = createSlice({
  name: "degenwork",
  initialState,
  reducers: {
    clear(state) {
      return {
        ...state,
        success: null,
        error: null,
      };
    },
    setAdmin(state, action) {
      return {
        ...state,
        admin: action.payload,
      };
    },
  },
  // working for async fetching data
  extraReducers: (builder) => {
    // WORKING FOR gettopInvestment
    builder.addCase(goggleSign.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(goggleSign.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(goggleSign.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // WORKING FOR AUTH -> LOGIN
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });
    // WORKING FOR AUTH -> LOGIN
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // WORKING FOR AUTH -> CHANGE PASS
    builder.addCase(changePass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePass.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(changePass.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.error.message;
    });

    // WORKING FOR AUTH -> UODATE AMOUNT
    builder.addCase(addSkills.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSkills.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(addSkills.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.error.message;
    });

    // WORKING FOR AUTH -> REQUEST TOKEN
    builder.addCase(requestToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestToken.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(requestToken.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload.err;
    });

    // WORKING FOR AUTH -> RESET PASSWORD
    builder.addCase(resetpassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetpassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(resetpassword.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload.err;
    });

    // WORKING GET JOBS
    builder.addCase(getJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = action.payload.msg;
      state.jobsCount = action.payload.jobCount;
      state.error = null;
    });
    builder.addCase(getJobs.rejected, (state, action) => {
      state.loading = false;
      state.jobs = null;
      state.error = action.payload;
    });

    // WORKING FOR GETTING SINGLE JOB
    builder.addCase(getJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getJob.fulfilled, (state, action) => {
      state.loading = false;
      state.job = action.payload;
      state.error = null;
    });
    builder.addCase(getJob.rejected, (state, action) => {
      state.loading = false;
      state.job = null;
      state.error = action.payload.err;
    });

    // WORKING FOR GET USER
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.msg;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });

    // WORKING FOR INVEST
    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.msg;
      state.error = null;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.userInfo = null;
      state.error = action.payload.err;
    });

    // UPDATE USERS
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // UPDATE fetchSkills
    builder.addCase(fetchSkills.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSkills.fulfilled, (state, action) => {
      state.loading = false;
      state.skills = action.payload.msg;
      state.error = null;
    });
    builder.addCase(fetchSkills.rejected, (state, action) => {
      state.loading = false;
      state.skills = [];
      state.error = action.payload;
    });
    // UPDATE fetchRoles
    builder.addCase(fetchRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = action.payload.msg;
      state.error = null;
    });
    builder.addCase(fetchRoles.rejected, (state, action) => {
      state.loading = false;
      state.roles = [];
      state.error = action.payload;
    });

    // UPDATE DEPOSITS
    builder.addCase(addRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(addRoles.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload.err;
    });

    // // GET Users
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.msg;
      state.usersCount = action.payload.usersCount;
      state.error = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });

    // // WORKING FOR DELETE USER
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // DELETE SKILLS
    builder.addCase(deleteSkills.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSkills.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(deleteSkills.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload.err;
    });

    // DELETE SKILLS
    builder.addCase(deleteRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(deleteRoles.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload.err;
    });

    // WORKING FOR Create Testimonials
    builder.addCase(deleteJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(deleteJob.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload.err;
    });
    // WORKING FOR Get Testimonials
    builder.addCase(deleteTestimonials.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTestimonials.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(deleteTestimonials.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.testimonials = null;
    });
  },
});
export const { clear, setAdmin } = degenworkSlice.actions;
export default degenworkSlice.reducer;
