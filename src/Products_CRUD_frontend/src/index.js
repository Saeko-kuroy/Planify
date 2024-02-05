import { Products_CRUD_backend } from "../../declarations/Products_CRUD_backend";

document.getElementById("materialForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const nameInput = document.getElementById("productName");
  const partInput = document.getElementById("productNumber");

  // Collect material inputs
  const materialInputs = document.querySelectorAll('input[name^="materialName"]');
  const quantityInputs = document.querySelectorAll('input[name^="quantity"]');
  const materials = [];

  materialInputs.forEach((materialInput, index) => {
    const materialName = materialInput.value.trim();
    const quantity = quantityInputs[index].value.trim();

    if (materialName !== '' && quantity !== '') {
      const parse = Number(quantity);
      materials.push({ materialName, quantity: parse });
    }
  });

  // Interact with foo actor, calling the createProd method with the materials array
  const result = await Products_CRUD_backend.createProd(nameInput.value, materials, partInput.value);

  // Clear input fields
  nameInput.value = '';
  partInput.value = '';
  materialInputs.forEach(input => input.value = '');
  quantityInputs.forEach(input => input.value = '');

  // Handle the result as needed
  updateAllProductsList(); // Update the list of all products

  // You may want to return true here to allow the default form submission behavior
  // or handle the result and return false accordingly
  return true;
});
document.getElementById("addMaterial").addEventListener("click", addMaterial);
function addMaterial() {
  // Create new material input fields
  const materialsSection = document.getElementById('materialsSection');

  const materialNameInput = document.createElement('input');
  materialNameInput.type = 'text';
  materialNameInput.name = 'materialName[]';
  materialNameInput.required = true;

  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.name = 'quantity[]';
  quantityInput.required = true;

  const br = document.createElement('br');

  // Append new input fields to the materials section
  materialsSection.appendChild(document.createElement('br')); // Add a line break for separation
  materialsSection.appendChild(document.createElement('br')); // Add another line break for better spacing
  materialsSection.appendChild(document.createTextNode('Material Name: '));
  materialsSection.appendChild(materialNameInput);
  materialsSection.appendChild(document.createTextNode(' Quantity: '));
  materialsSection.appendChild(quantityInput);
  materialsSection.appendChild(br);
}
document.getElementById("refreshButton").addEventListener("click", updateAllProductsList);

function updateAllProductsList() {
  const allProductsList = document.getElementById("allProductsList");

  // Fetch the updated list of products from the backend
  // For demonstration purposes, assume you have a function getProductsList() that returns a Promise
  Products_CRUD_backend.getProds().then(productsStructure => {
    // Clear the existing list
    allProductsList.innerHTML = '';

    // Populate the list with the new products
    productsStructure.forEach(product => {
      // Create a new <li> element for each product
      const listItem = document.createElement('li');

      // Set the text content of the <li> element using a template literal
      listItem.textContent = `${product.productName} - (${product.materials.length} materials)`;

      // Append the <li> element to the <ul> element
      allProductsList.appendChild(listItem);
    });
  });
}
