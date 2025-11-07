// --- Select elements ---
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// --- Load data from localStorage ---
let students = JSON.parse(localStorage.getItem("students")) || [];
displayStudents();

// --- Add Student ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // Validation
  if (!name || !studentId || !email || !contact) {
    alert("Please fill in all fields!");
    return;
  }
  if (!/^[A-Za-z\s]+$/.test(name)) {
    alert("Name should contain only letters!");
    return;
  }
  if (!/^[0-9]+$/.test(studentId)) {
    alert("Student ID must be numbers only!");
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Please enter a valid email!");
    return;
  }
  if (!/^[0-9]{10,}$/.test(contact)) {
    alert("Contact number must have at least 10 digits!");
    return;
  }

  students.push({ name, studentId, email, contact });
  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  displayStudents();
});

// --- Display Students ---
function displayStudents() {
  table.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="p-2 border">${student.name}</td>
      <td class="p-2 border">${student.studentId}</td>
      <td class="p-2 border">${student.email}</td>
      <td class="p-2 border">${student.contact}</td>
      <td class="p-2 border text-center">
        <button class="bg-yellow-400 px-2 py-1 rounded mr-2" onclick="editStudent(${index})">Edit</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// --- Edit Student ---
function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  deleteStudent(index);
}

// --- Delete Student ---
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}
