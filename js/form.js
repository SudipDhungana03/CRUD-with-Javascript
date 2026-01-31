import { addItem, updateItemName } from "./app.js";

export function createForm(editId, editItem) {
  const form = document.createElement("form");
  const isEditing = Boolean(editId);

  form.innerHTML = `
    <h2>grocery bud</h2>
    <div class="form-control">
      <input type="text" class="form-input" 
        placeholder="e.g. eggs" 
        value="${isEditing ? editItem.name : ''}" />
      <button type="submit" class="btn">
        ${isEditing ? 'edit' : 'add item'}
      </button>
    </div>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector(".form-input");
    const value = input.value.trim();

    if (!value) {
      alert("Please provide a value");
      return;
    }

    if (isEditing) {
      updateItemName(value);
    } else {
      addItem(value);
    }
  });

  return form;
}
