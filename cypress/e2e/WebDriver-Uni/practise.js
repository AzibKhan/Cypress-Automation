let str = "abcada";
let commonStr = "";

for (let i = str.length - 1; i >= 0; i--) {
    commonStr += str[i];
    if (commonStr === 'a') {
        console.log(commonStr);
    }
    else {
        return null
    }


}

class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    displayCarInfo() {
        console.log(`This car is a ${this.year} ${this.brand} ${this.model}.`);
    }
}

// Creating car objects
let car1 = new Car("Toyota", "Corolla", 2022);
let car2 = new Car("Honda", "Civic", 2023);

// Using the method to display car details
car1.displayCarInfo();  // Output: This car is a 2022 Toyota Corolla.
car2.displayCarInfo();  // Output: This car is a 2023 Honda Civic.
