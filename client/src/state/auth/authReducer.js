import { LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_ERROR, 
    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS, 
    SIGNUP_ERROR, 
    RECOVER_ERROR, 
    RECOVER_SUCCESS, 
    RECOVER_REQUEST, 
    LOGOUT_SUCCESS,
    LOAD_USER_SUCCESS,
    LOAD_USER_ERROR,
    CLEAR_MSGS} from "./authConsts";

const initialState = {
    token:localStorage.getItem('quizmeAuthToken'),
    userLoggedIn:!!localStorage.getItem('quizmeAuthToken'),
    userLoggingIn:false,
    userName:'',
    userId:'',
    recoverMsg:'',
    loginError:'',
    signupError:'',
    recoverError:''
}

const authReducer = (state = initialState, action) =>{
    console.log(action);
    switch(action.type){
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                userLoggedIn:true,
                ...action.payload
            }
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        case RECOVER_REQUEST:
            return {...state,userLoggingIn:true,loginError:'',signupError:'',recoverError:''};
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            localStorage.setItem('quizmeAuthToken',action.payload.token);
            return {
                ...state,
                token:action.payload.token,
                userLoggedIn:true,
                userLoggingIn:false,
                loginError:'',
                signupError:'',
                recoverError:''
            }
        case LOGIN_ERROR:
            localStorage.removeItem('quizmeAuthToken');
            return {
                ...state,
                token:null,
                userLoggingIn:false,
                loginError:action.payload,
                recoverError:'',
                signupError:''
            }
        case SIGNUP_ERROR:
            localStorage.removeItem('quizmeAuthToken');
            return {
                ...state,
                token:null,
                userLoggingIn:false,
                loginError: '',
                recoverError: '',
                signupError: action.payload
            }
        case RECOVER_ERROR:
            localStorage.removeItem('quizmeAuthToken');
            return {
                ...state,
                token:null,
                userLoggingIn:false,
                loginError: '',
                recoverError: action.payload,
                signupError: ''
            }
        case RECOVER_SUCCESS:
            localStorage.removeItem('quizmeAuthToken');
            return {
                ...state,
                token:null,
                userloggingIn:false,
                loginError:'',
                recoverError:'',
                signupError:'',
                recoverMsg:action.payload
            }
        case LOGOUT_SUCCESS:
        case LOAD_USER_ERROR:
            localStorage.removeItem('quizmeAuthToken');
            console.log('logout success');
            return {
                ...state,
                token:null,
                userLoggingIn:false,
                userLoggedIn:false
            }
        case CLEAR_MSGS:
            return {
                ...state,
                recoverError:'',
                signupError:'',
                loginError:'',
                recoverMsg:''
            }
        default:
            return state;
    }
} 
export {authReducer,initialState as initialAuthState};