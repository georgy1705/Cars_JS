const getData = () => {
    const renderCar = (cars) => {
        const carsContainer = document.querySelector('.cars-list')

        carsContainer.innerHTML = ""

        console.log(cars);

        for (key in cars) {
            const carBlock = document.createElement('div')
            const carGarage = document.createElement('div')

            if (key === 'Item') {
                carBlock.innerHTML = `
                    <div class="cars-card">
                        <div class="class-card__item">
                            <h3 class="cars-title">${cars[key].Title}</h3>
                            <p class="cars-description">${cars[key].Original.CarOptions.Title}</p>
                            <p class="cars-description">${cars[key].Description}</p>
                            <ul>
                                <li>Fuel type: ${cars[key].KeyValues.FuelType}</li>
                                <li>Trim level: ${cars[key].KeyValues.TrimLevel}</li>
                                <li>Gear box ${cars[key].KeyValues.GearBox}</li>
                            </ul>
                        </div>
                    </div>
                `
            } else if (key === 'Garage') {
                carGarage.innerHTML = `
                    <div class="class-card__garage">
                        <h3></h3>
                    </div>
                `
            }

            carsContainer.append(carBlock)
        }
    }

    const getCars = () => {
        fetch('http://109.236.74.74:9900/getdata')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('cars', JSON.stringify(data))

                renderCar(data)
            })
    }

    // if (localStorage.getItem('cars')) {
    //     renderCar(JSON.parse(localStorage.getItem('cars')))
    // }

    getCars()
}

getData()