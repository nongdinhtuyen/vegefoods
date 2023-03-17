import {
    all, call, put, fork, takeLatest, takeEvery,
} from 'redux-saga/effects';

import axios from 'axios';
import {BASEURL} from '../../bootstrap';

import {
    LOGIN,
    LOGIN_SUCCEED,
    LOGOUT,
    SIGN_UP
} from '../actions/user';
import actions from '../actions/user';
import rf from '../../requests/RequestFactory';

function* login(action) {
    try {
        const { data, error } = yield call(
            (data) => rf.getRequest('LoginRequest').login(data), action.data
        );

        if (error.code === 200 && data.typeid === "user") {
            yield put(actions.onLoginSucceed(data));
            yield call(action.callback)
        } else {
            yield put(actions.onLoginFailed(error.message));
        }

    } catch (err) {
        console.log("=======", err)
        yield put(actions.onLoginFailed(err));
    }
}

function* checkToken(action) {
    try {
        const { data, error } = yield call(
            (data) => rf.getRequest('LoginRequest').checkToken(data), {token:window.localStorage.getItem('token')});
        console.log(data)
        if (error.code === 200 && data === 1) {
            yield put(actions.onLoginSucceed({token:window.localStorage.getItem('token')}));
        } 
    } catch (err) {
        console.log("=======", err)
        yield put(actions.onLoginFailed(err));
    }
}

function* loginSucceed(action) {
    window.localStorage.setItem('token', action.data.token)
    yield window.axios = axios.create({
        baseURL: BASEURL,
        headers: { token: action.data.token }
    });
}

function* logout(action) {
    window.localStorage.removeItem('token')
    yield window.axios = axios.create({
        baseURL: BASEURL,
    });
}

function* signup(action) {
    try {
        const { data, error } = yield call(
            (data) => rf.getRequest('LoginRequest').signUp(data), action.data);

        if (error.code === 200) {
            action.callback();
        } 
    } catch (err) {
        console.log("=======", err)
    }
}

function* watchUser() {
    yield takeLatest("INIT", checkToken)
    yield takeLatest(LOGIN, login);
    yield takeLatest(LOGIN_SUCCEED, loginSucceed)
    yield takeLatest(LOGOUT, logout);
    yield takeLatest(SIGN_UP, signup);
}

export default function* rootSaga() {
    yield all([fork(watchUser)]);
}