export function isValid(value) {
    return value.length > 3 && value.length < 20;
}

// var re = new RegExp('\d{3}');


// export function isValidBuild(value) {
//     const v = String(value)
//     console.log(re.exec(v));
//    return re.exec(v);
// }

export function createModal(title, content) {
    const modal  = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `<h1>${title}</h1><br>
                        <div class='modal-content'>${content}</div>`;
    mui.overlay('on', modal); 
}