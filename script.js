const btn = document.querySelector("button");
const input = document.querySelector("input");
const container = document.getElementById("taskContainer");

btn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  const storedData = localStorage.getItem("user");
  const data = storedData ? JSON.parse(storedData) : [];
  data.push(value);

  localStorage.setItem("user", JSON.stringify(data));
  addData(data);

  input.value = "";
});

function addData(data) {
  container.innerHTML = "";

  data.forEach((value, idx) => {

    const task = document.createElement("div");
    task.classList.add("task");
    task.setAttribute("data-index", idx);


    const text = document.createElement("span");
    text.textContent = value;

    const dbtn = document.createElement("span");
    dbtn.innerHTML = "<i class='fa-solid fa-trash delete_icon'></i>";
    dbtn.style.marginLeft = "20px";

    dbtn.addEventListener("click", deleteData);

    task.appendChild(text);
    task.appendChild(dbtn);
    container.appendChild(task);
  });
}



function deleteData(e) {
  const task = e.target.closest(".task");
  const idx = parseInt(task.getAttribute("data-index"));

  const storedData = localStorage.getItem("user");
  const data = storedData ? JSON.parse(storedData) : [];

  data.splice(idx, 1);
  localStorage.setItem("user", JSON.stringify(data));
  addData(data);
}

window.addEventListener("load", () => {
  const storedData = localStorage.getItem("user");
  const data = storedData ? JSON.parse(storedData) : [];
  if (data.length > 0) {
    addData(data);
  }
});
