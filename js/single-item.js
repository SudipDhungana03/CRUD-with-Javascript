import { editCompleted, removeItem, setEditId } from "./app.js";

export function createSingleItem(item) {
  const div = document.createElement("div");
  div.className = "single-item";

  div.innerHTML = `
    <input type="checkbox" ${item.completed ? "checked" : ""} />
    <p style="text-decoration: ${item.completed ? "line-through" : "none"}">
      ${item.name}
    </p>
    <div class="btn-container">
        <button class="btn icon-btn edit-btn" type="button">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="btn icon-btn remove-btn" type="button">
          <i class="fa-regular fa-trash-can"></i>
        </button>
    </div>
  `;

  // Checkbox Toggle
  div.querySelector('input').addEventListener("change", () => editCompleted(item.id));
  
  // Delete
  div.querySelector(".remove-btn").addEventListener("click", () => removeItem(item.id));
  
  // Edit
  div.querySelector(".edit-btn").addEventListener("click", () => setEditId(item.id));

  return div;
}