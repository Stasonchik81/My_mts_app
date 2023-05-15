import {isValid, createModal} from "./utils";
import {Address} from "./address";
import { getAuthForm, authWithEmailAndPassword } from "./auth";
import "./style.css";

const form = document.getElementById("my_form");
const button_add = form.querySelector("#button_add");
const street = form.querySelector("#street");
const build = form.querySelector("#build");
const allBtn = document.getElementById("allBtn");

window.addEventListener('load', Address.renderAddresses)
form.addEventListener('submit', addAddressHandler);
allBtn.addEventListener('click', openModal);
street.addEventListener('input', () =>{
    button_add.disabled = !isValid(street.value);
})

function addAddressHandler(event) {
    event.preventDefault();
    if (isValid(street.value)){
        const address = {
            street: street.value.trim(),
            build: build.value,
            date: new Date().toJSON()
        }
        button_add.disabled = true;
        // request to server
        Address.addAddress(address)
        .then(() => {
            street.value = '';
            build.value = '';
            street.className = '';
            build.className = '';
            button_add.disabled = false;
        })
    }
}
function authEventHandler(event) {
    event.preventDefault();
    const button = event.target.querySelector('#enter');
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;
    button.disabled = true;
    authWithEmailAndPassword(email, password)
    .then(Address.fetch)
    .then(renderModalAfterAuth)
    .then(() => button.disabled = false)

}

function openModal() {
    const form = getAuthForm();
    createModal('Авторизация', form);
    document.getElementById("auth-form")
    .addEventListener('submit', authEventHandler, {once: true}) 
}

function renderModalAfterAuth(content) {
    if(typeof content === 'string'){
        createModal('Ошибка', content)
    }else{
        createModal('Список адресов', Address.listToHTML(content))
    }
}