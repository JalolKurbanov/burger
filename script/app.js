let products = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

let burgersBtn = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn = document.querySelector('.wrapper__navbar-btn'),
    cartAmount = document.querySelector('.warapper__navbar-count'),
    cartList = document.querySelector('.wrapper__navbar-basket'),
    cartClose = document.querySelector('.wrapper__navbar-close'),
    cartListItem = document.querySelector('.wrapper__navbar-checklist'),
    cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    counter = document.querySelector('.counter'),
    body = document.querySelector('body'),
    navbar = document.querySelector('.wrapper__nav'),
    colors = ['red','green','purple','red','yellow','red','green','purple','blue']
    
    
function counterStart(){
    if(counter.innerHTML == 100){
        counter.innerHTML = '100 LVL'
        body.style.background = 'lightblue'
        counter.style.fontSize = 100+'px'
        navbar.style.background = 'darkred'
    }else{
        counter.innerHTML++;
        counter.style.color = colors[counter.innerHTML%10]
    setTimeout(()=>{
        counterStart()
    },100)
    }
}
counterStart()


burgersBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        addAmount(btn)
    })
})

function addAmount(btn) {
    // closest() - позволяет нам подключиться к указаномму родителю
    // getAttribute() - берет содержимое в указаном атрибуте
    let parent = btn.closest('.wrapper__list-card')
    let id = parent.getAttribute('id')
    products[id].amount++
    basket()
}


function basket() {
    let korzina = []
    for(let key in products) {
        let burger = products[key]
        let productBurger = document.querySelector(`#${key}`)
        let productCount = productBurger.querySelector('.wrapper__list-count')
        if(burger.amount > 0) {
            korzina.push(burger)
            productCount.classList.add('active')
            productCount.innerHTML = burger.amount
        }else {
            productCount.classList.remove('active')
            productCount.innerHTML = ''
        }
    }
    let allAmount = totalCountBurgers()
    if(allAmount > 0) {
        cartAmount.classList.add('active')
        cartAmount.innerHTML = allAmount
    }else {
        cartAmount.classList.remove('active')
        cartAmount.innerHTML = ''
    }
    
    cartListItem.innerHTML = ''
    
    korzina.forEach((burger) => {
        cartListItem.innerHTML += createBurger(burger)
    })
    
    
    cartTotalPrice.innerHTML = totalSumBurgers()
    
}

cartBtn.addEventListener('click', () => cartList.classList.add('active'))
cartClose.addEventListener('click', () => cartList.classList.remove('active'))

function totalSumBurgers() {
    let sum = 0
    for(let key in products) {
        sum += products[key].totalSum
    }
    return sum + ' Сумм'
}


function totalCountBurgers() {
    let sum = 0
    for(let key in products) {
        sum += products[key].amount
    }
    return sum
}


function createBurger (burger) {
    return `<div class="navbar__item"   id="${burger.name.toLowerCase()}-burger">
    <div class="navbar__item-left">
        <img src="${burger.img}" alt="">
        <div class="navbar__item-left-info">
            <p class="navbar__item-left-name">${burger.name}</p>
            <p class="navbar__item-left-price">${burger.price} сум</p>
        </div>
    </div>
    <div class="navbar__item-right">
        <button data-symbol="-" class="navbar__item-btn">-</button>
        <output class="navbar__item-count">${burger.amount}</output>
        <button data-symbol="+" class="navbar__item-btn">+</button>
    </div>
</div>  `
}


window.addEventListener('click', (event) => {
    let btn = event.target
    if(btn.classList.contains('navbar__item-btn')) {
        let parent = btn.closest('.navbar__item')
        let dataValue = btn.getAttribute('data-symbol')
        if(parent) {
            let id = parent.getAttribute('id').split('-')[0]
            if(dataValue == '+') {
                products[id].amount++
            }else if(dataValue == '-') {
                products[id].amount--
            }
            basket()
        }
    }
    
})