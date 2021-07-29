import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import { firebase } from "../firebase/config.js";


const signin = (dispatch) => async ({ email, password }) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}
