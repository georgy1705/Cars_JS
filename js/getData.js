const getData = () => {
    const changeBtn = document.querySelector('.btn-save')

    const renderCar = (cars) => {
        const carsContainer = document.querySelector('.cars-list')

        const carCard = document.createElement('div')

        carCard.className = 'cars-card'

        carsContainer.innerHTML = ""

        for (key in cars) {
            if (key === 'Item') {
                carCard.innerHTML = `
                        <div class="cars-card__item">
                            <h3 class="cars-title">${cars[key].Title}</h3>
                            <p class="cars-description">${cars[key].Original.CarOptions.Title}</p>
                            <p class="cars-description">${cars[key].Description}</p>
                            <ul>
                                <li>Fuel type: ${cars[key].KeyValues.FuelType}</li>
                                <li>Trim level: ${cars[key].KeyValues.TrimLevel}</li>
                                <li>Gear box: ${cars[key].KeyValues.GearBox}</li>
                            </ul>
                        </div>
                `
            } else if (key === 'Garage') {
                carCard.insertAdjacentHTML("beforeEnd", `
                    <div class="cars-card__garage">
                        <p class="card-info">Email: ${cars[key].Email}</p>
                        <p class="card-info">Name: ${cars[key].Name}</p>
                        <p class="card-info">Owner: ${cars[key].Owner}</p>
                        <btn class="btn btn-primary" data-toggle="modal" data-target="#modal">Change data</btn>
                    </div>
                `)
            }
        }

        carsContainer.append(carCard)
    }

    const getCars = () => {
        fetch('http://109.236.74.74:9900/getdata')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('cars', JSON.stringify(data))
            })
    }

    changeBtn.addEventListener('click', () => {
        let cars = JSON.parse(localStorage.getItem('cars'))
        const modal = document.querySelector('.modal')
        const labels = modal.querySelectorAll('.modal__label')

        const sendMessage = {}

        labels.forEach(label => {
            const span = label.querySelector('span')
            const input = label.querySelector('input')

            sendMessage[span.textContent] = input.value
        })

        let changeCars = {...cars}

        for (key in changeCars) {
            if (key === 'Garage') {
                changeCars[key].Email = sendMessage['Email']
                changeCars[key].Name = sendMessage['Name']
                changeCars[key].Owner = sendMessage['Owner']
            }
        }

        localStorage.setItem('cars', JSON.stringify(changeCars))
        
        renderCar(changeCars)
    })

    if (localStorage.getItem('cars')) {
        renderCar(JSON.parse(localStorage.getItem('cars')))
    }

    getCars()
}

getData()