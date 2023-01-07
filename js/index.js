console.log("connected");

async function loadAllProduct() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
}

async function setAllMenu() {
    const data = await loadAllProduct();
    const array = [];
    const ul = document.getElementById("category");
    for (const product of data) {
        if (array.indexOf(product.category) == -1) {
            array.push(product.category);
            const li = document.createElement("li");
            li.innerHTML = `
            <a>${product.category}</a>
            `;
            ul.appendChild(li);
        }
    }
    document.getElementById("progress1").classList.add("hidden");
}

setAllMenu();


document.getElementById("searchbox").addEventListener("keypress", async (event) => {

    if (event.key == "Enter") {
        console.log("pressed");
        const container = document.getElementById("products-container");
        container.innerHTML = '';
        const searchValue = event.target.value;
        const data = await loadAllProduct();
        data.forEach(product => {
            if (product.category.includes(searchValue)) {
                const { title, image, category, description } = product;
                const div = document.createElement("div");
                div.innerHTML = `
                <div class="card w-96 bg-base-100 shadow-xl">
                <figure><img src="${image}" alt="Shoes" class="h-60 w-full"/></figure>
                <div class="card-body">
                  <h2 class="card-title">${category}</h2>
                  <p>${title.length > 30 ? title.slice(0, 30) : title}</p>
                  <div class="card-actions justify-end">
                    <label for="my-modal-3" class="btn" onclick="modalBox('${image}','${title}','${description}')">Show More</label>
                  </div>
                </div>
              </div>
                `;
                container.appendChild(div);
            }
            else{
                console.log("not found");
            }
        });
    }
})

const modalBox = (image, title, description) => {
    console.log("inside");
    const modalContainer = document.getElementById("modal-container");
    modalContainer.textContent = "";
    modalContainer.innerHTML = `
                <figure><img src="${image}" alt="Shoes" class="w-full"/></figure>
                <h4 class="card-title">${title}</h4>
                <p>${description}</p>
    `;

}