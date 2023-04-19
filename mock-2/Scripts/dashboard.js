// Write code related to Dashboard page here
const LSData = JSON.parse(localStorage.getItem("assignments"));
const course = document.querySelector("#course");

const filterData = LSData.filter((item) => item.course === course.value);

filterData.forEach((item, index) => {
  const card = document.createElement("div");
  card.innerHTML = `<p>${item.name}</p>
                       <p>${item.desc}</p>
                       <p>${item.type}</p>
                       <p>${item.course}</p>
                       <p>${item.schedule}</p>
                       <p>${item.sprint}</p>
                       <select>
                       <option value=${item.sprint}>${item.sprint}</option></select>
                       <button onclick="handleDelete(${index})">Delete</button>`;
  const sprintDiv = document.querySelector(`#${item.sprint}`);

  sprintDiv.append(card);
});

course.addEventListener("change", () => {
  const filterData2 = LSData.filter((item) => item.course == course.value);

  const sprintDivs = document.querySelectorAll(".assignments > div> div");
  sprintDivs.forEach((item) => {
    item.innerHTML = "";
  });

  filterData2.forEach((item, index) => {
    const card2 = document.createElement("div");
    card2.innerHTML = `<p>${item.name}</p>
                           <p>${item.desc}</p>
                           <p>${item.type}</p>
                           <p>${item.course}</p>
                           <p>${item.schedule}</p>
                           <p>${item.sprint}</p>
                           <select>
                           <option value=${item.sprint}>${item.sprint}</option></select>
                           <button  onclick="handleDelete(${index})">Delete</button>`;
    const sprintDiv2 = document.querySelector(`#${item.sprint}`);

    sprintDiv2.append(card2);
    console.log(card2);
  });
});

function handleDelete(index) {
  LSData.splice(index, 1); // Remove the item from the LSData array
  localStorage.setItem("assignments", JSON.stringify(LSData)); // Update the localStorage with the new data

  // Remove the card from the UI
  const card = document.querySelectorAll(".assignments > div > div")[index];
  card.parentNode.removeChild(card);
}
