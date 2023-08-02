// REG EXP
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'YOUR NUMBER IS VALID!'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'YOUR NUMBER IS NOT VALID'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

// const tabContent = document.querySelectorAll('.tab_content_block')
const tabContent = document.querySelectorAll('.tab_content_block')
const tabsParent = document.querySelector('.tab_content_items')
const tabs = document.querySelectorAll('.tab_content_item')

console.log(tabContent)
console.log(tabsParent)
console.log(tabs)

let tabCounter = 0

const hideTabContent = () => {
    tabContent.forEach((element) => {
        element.style.display = 'none'
    })
    tabs.forEach((element) => {
        element.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (i= 0) => {
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()


const switchTab =() =>{
    hideTabContent()
    showTabContent(tabCounter)
    tabCounter++
    if( tabCounter>= tabs.length){
        tabCounter=0
    }
}
setInterval(switchTab, 2000)

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, index) => {
            if (event.target === item) {
                hideTabContent()
                showTabContent(index)
            }
        })
    }
}

//converter
const som = document.querySelector("#som")
const usd = document.querySelector("#usd")
const euro = document.querySelector("#euro")

const convert = (element, target, target2) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open("GET", "../data/convert.json")
        request.setRequestHeader("Content-type", "application/json")
        request.send()

        request.onload = () => {
            const response = JSON.parse(request.response)
            target.forEach((item) => {

                console.log(item)

                if (target2 === 'som') {
                    item.value = (element.value / response[item.id]).toFixed(2)
                }
                else if (item === som) {
                    item.value = (element.value * response[element.id]).toFixed(2)
                }
                else {
                    item.value = ((element.value * response[element.id]) / response[item.id]).toFixed(2)
                }
            })
            element.value === '' && (target.forEach(item => item.value = ''))
        }
    }
}
convert(som, [usd, euro])
convert(usd, [som, euro])
convert(euro, [som, usd])


// Card switcher
const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')
let count = 198

const cardSwapper = (index) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            card.innerHTML=`
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `
        })
}

btnNext.onclick = () => {
    count++
    if(count===201){
        count=1
    }
    cardSwapper(count)
}

btnPrev.onclick = () =>{
    count--
    if (count===0){
        count=200
    }
    cardSwapper(count)
}

cardSwapper(count)







