export class Address{
   static addAddress(address){
    return fetch('https://mymtsroutes-default-rtdb.europe-west1.firebasedatabase.app/address.json',
    {
        method: 'POST',
        body: JSON.stringify(address),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        address.id = response.name;
        return address;
    })
    .then(addToLocalStorage)
    .then(Address.renderAddresses)
   }
   
   static renderAddresses(){
    const addresses = getAddresesFromLocalStorage();
    const html = addresses.length ? 
            addresses.map(toCard).join('')
            : '<br><div class="mui--text-headline">Здесь пока пусто!</div><br>';
    const list = document.getElementById('AddressesList');
    list.innerHTML = html;
   }

   static fetch(token){
    if(!token){
        return Promise.resolve('<p class="error">Нет токена</p>')
    }
   return fetch(`https://mymtsroutes-default-rtdb.europe-west1.firebasedatabase.app/address.json?auth=${token}`)
    .then(response => response.json())
    .then(response => {
        if(response.error){
            return `<p class="error">${response.error}</p>`
        }
        return response ? Object.keys(response).map(key => ({
            ...response[key],
            id: key
        })): []
        
    })
   }
   static listToHTML(list){
    return list.length ? 
                    `<ol>${list.map(item => `<li>${item.street}_${item.build}</li>`)
                    .join('')}</ol>`
                        : '<p>Адресов пока нет!</p>'
   }
   
}

function addToLocalStorage(address) {
    const all = getAddresesFromLocalStorage();
    all.push(address)
    localStorage.setItem('addresses', JSON.stringify(all))
}

function getAddresesFromLocalStorage() {
   return JSON.parse(localStorage.getItem('addresses') || '[]')
}
function toCard(address) {
    return `<div class="mui--text-black-54">${address.street} - ${address.build}</div>
    <div>Date - ${new Date(address.date).toLocaleDateString() }</div><br>`
}