const base = "http://127.0.0.1:5000/api/products";

const print = (title, data) => {
  console.log(title);
  console.log(JSON.stringify(data, null, 2));
};

async function run() {
  try {
    let response = await fetch(base, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Wireless Mouse",
        price: 29.99,
        category: "Electronics",
        inStock: true,
      }),
    });
    const created = await response.json();
    print("CREATED:", created);

    const id = created._id;

    response = await fetch(base);
    print("ALL PRODUCTS:", await response.json());

    response = await fetch(`${base}/${id}`);
    print("PRODUCT BY ID:", await response.json());

    response = await fetch(`${base}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: 34.99,
        inStock: false,
      }),
    });
    print("UPDATED PRODUCT:", await response.json());

    response = await fetch(`${base}/${id}/summary`);
    print("PRODUCT SUMMARY:", await response.json());

    response = await fetch(`${base}/${id}`, { method: "DELETE" });
    print("DELETE RESULT:", await response.json());
  } catch (error) {
    console.error("CRUD demo failed:", error.message);
    process.exit(1);
  }
}

run();
