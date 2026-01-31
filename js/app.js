import { createForm } from "./form.js";
import { createItems } from "./items.js";

// 1. State Management
let items = getLocalStorage();
let editId = null;

// 2. Local Storage Helpers
function getLocalStorage() {
  const list = localStorage.getItem("grocery-list");
  return list ? JSON.parse(list) : [];
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

// 3. Core Functions
export function addItem(itemName) {
  const newItem = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    name: itemName,
    completed: false,
  };
  items = [...items, newItem];
  syncAndRender();
}

export function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  syncAndRender();
}

export function editCompleted(itemId) {
  items = items.map((item) => {
    if (item.id === itemId) return { ...item, completed: !item.completed };
    return item;
  });
  syncAndRender();
}

export function setEditId(itemId) {
  editId = itemId;
  render();
  const input = document.querySelector(".form-input");
  if (input) input.focus();
}

export function updateItemName(newName) {
  items = items.map((item) => {
    if (item.id === editId) return { ...item, name: newName };
    return item;
  });
  editId = null;
  syncAndRender();
}

// 4. Render Logic
function syncAndRender() {
  setLocalStorage(items);
  render();
}

export function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const editItem = editId ? items.find((i) => i.id === editId) : null;
  
  const formElement = createForm(editId, editItem);
  const itemsElement = createItems(items);

  app.appendChild(formElement);
  app.appendChild(itemsElement);
}

// Initial Load
render();