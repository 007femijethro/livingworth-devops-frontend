const students = [
  { name: "Amina Bello", email: "amina@example.com", cohort: "DevOps Cohort 1", level: "Beginner", status: "Pending" },
  { name: "John Doe", email: "john@example.com", cohort: "Weekend Kubernetes", level: "Intermediate", status: "Approved" },
  { name: "Grace Okafor", email: "grace@example.com", cohort: "DevOps Cohort 1", level: "Beginner", status: "Pending" },
  { name: "Samuel Mensah", email: "samuel@example.com", cohort: "Advanced Cloud", level: "Advanced", status: "Approved" },
];

const assignments = [
  {
    title: "Docker Container Assignment",
    category: "Docker",
    dueDate: "10 June 2026",
    marks: 10,
    cohort: "DevOps Cohort 1",
    status: "Published",
    summary: "Run Nginx on port 8080, document the steps, and submit your GitHub repository plus screenshot.",
  },
  {
    title: "Linux User Management Lab",
    category: "Linux",
    dueDate: "14 June 2026",
    marks: 15,
    cohort: "DevOps Cohort 1",
    status: "Draft",
    summary: "Create users and groups, configure permissions, and explain the commands used in a short README.",
  },
  {
    title: "Kubernetes First Deployment",
    category: "Kubernetes",
    dueDate: "21 June 2026",
    marks: 20,
    cohort: "Weekend Kubernetes",
    status: "Published",
    summary: "Deploy a sample application, expose it with a service, and submit manifests with screenshots.",
  },
];

const submissions = [
  {
    student: "John Doe",
    assignment: "Docker Container Assignment",
    submitted: "30 May 2026",
    repo: "github.com/john/docker-assignment",
    status: "Submitted",
  },
  {
    student: "Samuel Mensah",
    assignment: "Linux User Management Lab",
    submitted: "29 May 2026",
    repo: "github.com/samuel/linux-users",
    status: "Graded",
    score: "13/15",
  },
  {
    student: "Grace Okafor",
    assignment: "Docker Container Assignment",
    submitted: "31 May 2026",
    repo: "github.com/grace/nginx-docker",
    status: "Resubmission required",
    score: "6/10",
  },
];

const announcements = [
  {
    title: "Kubernetes class reminder",
    message: "Please come with your laptops. We will deploy our first application to Kubernetes.",
    cohort: "Weekend Kubernetes",
  },
  {
    title: "Docker assignment deadline",
    message: "Submit your GitHub repository link and screenshot before 10 June 2026.",
    cohort: "DevOps Cohort 1",
  },
];

function statusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-").replace("resubmission-required", "resubmission");
}

function pill(status) {
  return `<span class="pill ${statusClass(status)}">${status}</span>`;
}

function renderStudents() {
  const table = document.querySelector("#student-table");
  table.innerHTML = students
    .map(
      (student) => `
        <tr>
          <td><span class="student-name">${student.name}</span><span class="student-email">${student.email}</span></td>
          <td>${student.cohort}</td>
          <td>${student.level}</td>
          <td>${pill(student.status)}</td>
          <td>
            <div class="action-row">
              <button class="small-button approve" type="button">Approve</button>
              <button class="small-button reject" type="button">Reject</button>
            </div>
          </td>
        </tr>`,
    )
    .join("");
}

function renderAssignments() {
  const list = document.querySelector("#assignment-list");
  list.innerHTML = assignments
    .map(
      (assignment) => `
        <article class="data-card">
          <header>
            <div>
              <h3>${assignment.title}</h3>
              <span class="card-meta">${assignment.category} · Due ${assignment.dueDate} · ${assignment.marks} marks</span>
            </div>
            ${pill(assignment.status)}
          </header>
          <p>${assignment.summary}</p>
          <footer>
            <span class="card-meta">${assignment.cohort}</span>
            <div class="action-row">
              <button class="small-button approve" type="button">View</button>
              <button class="small-button reject" type="button">Submit work</button>
            </div>
          </footer>
        </article>`,
    )
    .join("");
}

function renderSubmissions() {
  const list = document.querySelector("#submission-list");
  list.innerHTML = submissions
    .map(
      (submission) => `
        <article class="data-card">
          <header>
            <div>
              <h3>${submission.student}</h3>
              <span class="card-meta">${submission.assignment} · Submitted ${submission.submitted}</span>
            </div>
            <div class="status-row">
              ${submission.score ? `<strong>${submission.score}</strong>` : ""}
              ${pill(submission.status)}
            </div>
          </header>
          <p>${submission.repo}</p>
          <footer>
            <button class="button ghost" type="button">Review submission</button>
          </footer>
        </article>`,
    )
    .join("");
}

function renderAnnouncements() {
  const list = document.querySelector("#announcement-list");
  list.innerHTML = announcements
    .map(
      (announcement) => `
        <article class="data-card">
          <h3>${announcement.title}</h3>
          <p>${announcement.message}</p>
          <span class="pill neutral">${announcement.cohort}</span>
        </article>`,
    )
    .join("");
}

function setupMenu() {
  const button = document.querySelector(".menu-button");
  const menu = document.querySelector("#primary-menu");
  button.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

renderStudents();
renderAssignments();
renderSubmissions();
renderAnnouncements();
setupMenu();
