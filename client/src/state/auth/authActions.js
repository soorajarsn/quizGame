import axios from 'axios';
import { LOGIN_SUCCESS, 
         LOGIN_ERROR, 
         LOGIN_REQUEST, 
         SIGNUP_REQUEST, 
         SIGNUP_SUCCESS, 
         RECOVER_REQUEST, 
         RECOVER_SUCCESS, 
         RECOVER_ERROR, 
         SIGNUP_ERROR,
         LOAD_USER_SUCCESS,
         LOAD_USER_ERROR,
         LOGOUT_SUCCESS} from './authConsts';



export const loginRequest = () => ({type:LOGIN_REQUEST});
export const loginError = (err) => ({type:LOGIN_ERROR,payload:err});
export const loginSuccess = (userData) => ({type:LOGIN_SUCCESS,payload:userData});

export const signupRequest = () => ({type:SIGNUP_REQUEST});
export const signupError = (err) => ({type:SIGNUP_ERROR,payload:err});
export const signupSuccess = (userData) => ({type:SIGNUP_SUCCESS,payload:userData});

export const recoverRequest = () => ({type:RECOVER_REQUEST});
export const recoverError = (err) => ({type:RECOVER_ERROR,payload:err});
export const recoverSuccess = (msg) => ({type:RECOVER_SUCCESS,payload:msg});

export const loadUserSuccess = (data) => ({type:LOAD_USER_SUCCESS,payload:data});
export const loadUserError = (err) => ({type:LOAD_USER_ERROR,payload:err});

export const logOut = () => ({type:LOGOUT_SUCCESS});

export const loadUser = (dispatch,state)  => {
    const config = getConfig(state);
    axios.get('/api/loadUser',config)
        .then(res => {
            dispatch(loadUserSuccess(res.data));
        })
        .catch(err => {
            console.log(err);
            if(err.response){
                dispatch(loadUserError(err.response.errorMsg));
            }
            else
                dispatch(loadUserError("Something went wrong"));
        });
}
export const getConfig = (state) => {
    const token = state.token;
    const config = {
        headers:{
            "Content-type":'application/json'
        }
    }
    if(token){
        config.headers['x-auth-token'] = token;
    }
    return config;
}

export const loginUser = (dispatch,body) => {
        dispatch(loginRequest());
        axios.post('/api/post/login',body)
        .then(response => {
            const userData = response.data;
            console.log(userData);
            dispatch(loginSuccess(userData));
        })
        .catch(err => {
            if(err.response){
                console.log(err.response);
                dispatch(loginError(err.response.errorMsg));
            }
            else
                dispatch(loginError('Something went wrong'));
        });
}

export const signupUser = (dispatch, body) => {
        dispatch(signupRequest());
        axios.post('/api/post/signup',body)
        .then(response => {
            const userData = response.data;
            console.log(userData);
                dispatch(signupSuccess(userData));
        })
        .catch(err => {
            if(err.response){
                console.log(err.response);
                dispatch(signupError(err.response.errorMsg));
            }
            else
                dispatch(signupError('Something went wrong'));
        });
}