const modal = document.querySelector('.modal');
const modalTrigger = document.querySelector('#btn-get');
const closeModalBtn = document.querySelector('#closeModal')

// console.log(modal)
// console.log(modalTrigger)
// console.log(closeModalBtn)

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = '';
};

modalTrigger.onclick = openModal;
closeModalBtn.onclick = closeModal;

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};

document.onkeydown = (event) => {
    if (event.code === 'Escape') {
        closeModal();
    }
};

const scrollListener = () => {
    const contentHeight = document.body.scrollHeight - 1;
    const scrollPosition = window.scrollY + window.innerHeight;
    if (contentHeight <= scrollPosition) {
        openModal();
        document.removeEventListener('scroll', scrollListener)
    }
}

document.addEventListener('scroll', scrollListener);

setTimeout(() => {
    openModal();
}, 10000); // 10 секунд (10000 миллисекунд)


//POST DATA

const form = document.querySelector('form')

const postData = (url, json) => {
    const response = fetch (url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: json
    })
    return response
}

const bindPostData = (form) => {
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData (form)
        const obj = {}
        formData.forEach((item, i) => {
            obj [i] = item
        })
        const json = JSON.stringify(obj)
        postData('server.php', json)
    }
}

const sendRequest = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(response=>response.json())
        .then(data=>{console.log(data)})
}
sendRequest()



//post data
// const form =document.querySelector("form")
// const postData = (form) => {
//     form.addEventListener( 'submit', (event) => {
//         event.preventDefault()
//
//         const request = new XMLHttpRequest()
//         request.open("POST", "server.php")
//         request.setRequestHeader("Content-type", "application/json")
//
//         const formData = new FormData(form)
//         const obj = {}
//         formData.forEach((item, i) => {
//             obj[i] = item
//         })
//         console.log(obj)
//         const json = JSON.stringify(obj)
//         request.send(json)
//         request.onload = () => {
//             console.log(request.response)
//         }
//         })
// }
// postData(form)

