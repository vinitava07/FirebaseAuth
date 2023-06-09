// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
// import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { initializeApp } from 'firebase/app';
import {
    getAuth, connectAuthEmulator,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import './styles.css';
import {
    hideLoginError,
    showLoginState,
    showLoginForm,
    showApp,
    showLoginError,
    btnLogin,
    btnSignup,
    btnLogout
} from './ui'
import { async } from '@firebase/util';
import { txtEmail } from './ui';
import { txtPassword } from './ui';
import { lblAuthState } from './ui';


const firebaseApp = initializeApp({
    "Suas credenciais do firebase"
});

const auth = getAuth(firebaseApp);

connectAuthEmulator(auth, "http://localhost:9099")

const loginEmailPassword = async () => {

    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    }
    catch (error) {
        console.log(error);
        showLoginError(error);
    }
}


btnLogin.addEventListener("click", loginEmailPassword);

const createAccount = async () => {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    }
    catch (error) {
        console.log(error);
        showLoginError(error);
    }


}


btnSignup.addEventListener("click", createAccount);

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(user);
            showApp();
            showLoginState(user);
            hideLoginError();
        }
        else {
            showLoginForm();
            lblAuthState.innerHTML = "Voce não está logado";
        }
    })
}

monitorAuthState();

const logout = async () => {
    await signOut(auth);

}

btnLogout.addEventListener("click", logout);