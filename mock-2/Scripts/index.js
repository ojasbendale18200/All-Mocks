// Write code related to Home page here

const form = document.querySelector("form");
const LSData = JSON.parse(localStorage.getItem("assignments")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const desc = document.querySelector("#desc").value;
  const type = document.querySelector("#type").value;
  const course = document.querySelector("#course").value;
  const sprint = document.querySelector("#sprint").value;
  const schedule = document.querySelector("#schedule").value;

  let userData = {
    name,
    desc,
    type,
    course,
    sprint,
    schedule,
  };

  LSData.push(userData);
  localStorage.setItem("assignments", JSON.stringify(LSData));
});
