import { Products_CRUD_backend } from "../../declarations/Products_CRUD_backend";

document.getElementById("materialForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  const button = e.target.querySelector("button");

  const name = document.getElementById("productName").value.toString();
  const part = document.getElementById("productNumber").value.toString();

  // Collect material inputs
  const materialInputs = document.querySelectorAll('input[name^="materialName"]');
  const quantityInputs = document.querySelectorAll('input[name^="quantity"]');
  const materials = [];

  materialInputs.forEach((materialInput, index) => {
    const materialName = materialInput.value.trim();
    const quantity = quantityInputs[index].value.trim();

    if (materialName !== '' && quantity !== '') {
      const parse= Number(quantity);
      materials.push({ materialName, quantity: parse });
    }
  });

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the createProd method with the materials array
  const result = await Products_CRUD_backend.createProd(name, materials, part);
  button.removeAttribute("disabled");

  // Handle the result as needed

  // Either return false or use e.preventDefault();
  return false;
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