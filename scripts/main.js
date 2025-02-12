const baseURL = 'https://fdnd.directus.app/';
const endpointMe = 'items/person/207';

const myURL = baseURL + endpointMe;

const cloud1 = document.querySelector('.speed1 p');
const cloud2 = document.querySelector('.speed2 p');
const cloud3 = document.querySelector('.speed3 p');
const cloud4 = document.querySelector('.speed4 p');
const cloud5 = document.querySelector('.speed5 p');


getData(myURL).then( data207 => {
    
    const myData = data207.data;
    const myCustom = JSON.parse(myData.custom);

    // let myName = myData.name;
    let myCity = myCustom.woonplaats;
    let myNickname = myData.nickname;
    let mySport = myCustom.sport;
    let myColor = myCustom.fav_kleur;
    let myFilm = myCustom.fav_films;

    cloud1.textContent = myCity;
    cloud2.textContent = myColor;
    cloud3.textContent = myNickname;
    cloud4.textContent = mySport;
    cloud5.textContent = myFilm;
    });



    async function getData(URL) {
        return (
            fetch(URL)
            .then (
                response => response.json()
            )
            .then (
                jsonData => {return jsonData}
            )
        );
    }

    // flower no hover // 

    document.addEventListener("DOMContentLoaded", function () {
        if (window.matchMedia("(hover: none)").matches) {
            document.querySelectorAll(".stem").forEach(stem => {
                stem.addEventListener("click", function () {
                    this.classList.toggle("active");
                });
            });
        }
    });
    
