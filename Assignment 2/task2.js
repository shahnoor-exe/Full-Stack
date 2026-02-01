var products = [
    { name: "Laptop", price: 800, rating: 4.5, category: "Electronics" },
    { name: "Phone", price: 500, rating: 4.2, category: "Electronics" },
    { name: "Headphones", price: 100, rating: 4.0, category: "Electronics" },
    { name: "Tablet", price: 400, rating: 4.3, category: "Electronics" },
    { name: "Camera", price: 600, rating: 4.6, category: "Electronics" },
    { name: "T-Shirt", price: 25, rating: 4.1, category: "Clothing" },
    { name: "Jeans", price: 50, rating: 4.0, category: "Clothing" },
    { name: "Jacket", price: 80, rating: 4.4, category: "Clothing" },
    { name: "Shoes", price: 70, rating: 4.2, category: "Clothing" },
    { name: "Hat", price: 15, rating: 3.8, category: "Clothing" },
    { name: "JavaScript Book", price: 30, rating: 4.7, category: "Books" },
    { name: "Python Book", price: 35, rating: 4.5, category: "Books" },
    { name: "HTML Book", price: 20, rating: 4.0, category: "Books" },
    { name: "CSS Book", price: 22, rating: 4.1, category: "Books" },
    { name: "React Book", price: 40, rating: 4.6, category: "Books" },
    { name: "Football", price: 25, rating: 4.3, category: "Sports" },
    { name: "Basketball", price: 30, rating: 4.2, category: "Sports" },
    { name: "Tennis Racket", price: 60, rating: 4.4, category: "Sports" },
    { name: "Yoga Mat", price: 20, rating: 4.0, category: "Sports" },
    { name: "Dumbbells", price: 45, rating: 4.5, category: "Sports" }
];

function displayProducts() {
    // Get dropdown values
    var category = document.getElementById("categoryFilter").value;
    var sort = document.getElementById("sortBy").value;
    var list = document.getElementById("productList");

    var filtered = [];
    for (var i = 0; i < products.length; i++) {
        if (category == "all") {
            filtered.push(products[i]);
        } else if (products[i].category == category) {
            filtered.push(products[i]);
        }
    }

    if (sort == "price-asc") {
        filtered.sort(function(a, b) { return a.price - b.price; });
    }
    if (sort == "price-desc") {
        filtered.sort(function(a, b) { return b.price - a.price; });
    }
    if (sort == "name-asc") {
        filtered.sort(function(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    }
    if (sort == "name-desc") {
        filtered.sort(function(a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    }
    if (sort == "rating-asc") {
        filtered.sort(function(a, b) { return a.rating - b.rating; });
    }
    if (sort == "rating-desc") {
        filtered.sort(function(a, b) { return b.rating - a.rating; });
    }

    list.innerHTML = "";
    for (var i = 0; i < filtered.length; i++) {
        var p = filtered[i];
        list.innerHTML = list.innerHTML + "<p>" + p.name + " - $" + p.price + " - Rating: " + p.rating + " - " + p.category + "</p>";
    }
}

document.getElementById("categoryFilter").addEventListener("change", displayProducts);
document.getElementById("sortBy").addEventListener("change", displayProducts);

displayProducts();