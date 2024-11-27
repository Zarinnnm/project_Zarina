const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "OK";
        phoneResult.style.color = "green";
    } else {
        phoneResult.innerHTML = "NOT OK";
        phoneResult.style.color = "red";
    }
};

const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.style.display = "none";
    });
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = "block";
    tabs[id].classList.add('tab_content_item_active');
};

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                hideTabContent();
                showTabContent(tabIndex);
            }
        });
    }
};

let slideIndex = 0;
const slideTimer = () => {
    slideIndex++;
    if (slideIndex > 4) {
        slideIndex = 0;
    }
    hideTabContent();
    showTabContent(slideIndex);
    console.log(slideIndex);
};

setInterval(() => slideTimer(), 3000);

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');
const rub = document.querySelector('#rub');

const convertor = async (element, targetElement, current) => {
    element.addEventListener('input', async () => {
        try {
            const response = await fetch("../data/convertor.json");
            const data = await response.json();

            const inputValue = parseFloat(element.value);
            if (!isNaN(inputValue)) {
                switch (current) {
                    case "som":
                        usd.value = (inputValue / data.usd).toFixed(2);
                        eur.value = (inputValue / data.eur).toFixed(2);
                        rub.value = (inputValue / data.rub).toFixed(2);
                        break;
                    case "usd":
                        som.value = (inputValue * data.usd).toFixed(2);
                        eur.value = (som.value / data.eur).toFixed(2);
                        rub.value = (som.value / data.rub).toFixed(2);
                        break;
                    case "eur":
                        som.value = (inputValue * data.eur).toFixed(2);
                        usd.value = (som.value / data.usd).toFixed(2);
                        rub.value = (som.value / data.rub).toFixed(2);
                        break;
                    case "rub":
                        som.value = (inputValue * data.rub).toFixed(2);
                        usd.value = (som.value / data.usd).toFixed(2);
                        eur.value = (som.value / data.eur).toFixed(2);
                        break;
                    default:
                        break;
                }
            } else {
                som.value = '';
                usd.value = '';
                eur.value = '';
                rub.value = '';
            }
        } catch (error) {
            console.error('Error fetching conversion data:', error);
        }
    });
};

const validateInput = (element) => {
    element.addEventListener('keypress', (event) => {
        const key = event.key;
        const isNumber = /^\d+$/.test(key) || key === '.' || key === ',';

        if (!isNumber) {
            event.preventDefault();
        }
    });
};

convertor(som, usd, "som");
convertor(usd, som, "usd");
convertor(eur, som, "eur");
convertor(rub, som, "rub");

validateInput(som);
validateInput(usd);
validateInput(eur);
validateInput(rub);

const nextButton = document.querySelector('#btn-next');
const prevButton = document.querySelector('#btn-prev');
const cardBlock = document.querySelector('.card');
let cardIndex = 1;

const cardSwitcher = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardIndex}`);
        const data = await response.json();
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p>${data.completed}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.error('Error fetching card data:', error);
    }
};

nextButton.addEventListener('click', () => {
    cardIndex = (cardIndex % 200) + 1; // цикл от 1 до 200
    cardSwitcher();
});

prevButton.addEventListener('click', () => {
    cardIndex = cardIndex === 1 ? 200 : cardIndex - 1; // цикл от 1 до 200
    cardSwitcher();
});

const searchButton = document.querySelector('#search');
const searchInput = document.querySelector('.cityName');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

const APP_ID = 'e417df62e04d3b1b111abeab19cea714';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

searchButton.addEventListener('click', async () => {
    try {
        const response = await fetch(`${BASE_URL}?appid=${APP_ID}&q=${searchInput.value}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            city.innerHTML = "Город не найден";
            temp.innerHTML = "";
        } else {
            city.innerHTML = data.name || "Город не найден";
            temp.innerHTML = `
                <span>${data.main?.temp ? Math.round(data.main?.temp) + "&deg;C" : " "}</span>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt=""/>
            `;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        city.innerHTML = "Ошибка";
        temp.innerHTML = "";
    }
});

const rufina = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error fetching posts:', error);
    }
};

rufina();

const address = {
    id: 123,
    street: {
        name: "Ibraimova",
        number: 103
    }
};

console.log(address.street?.name);