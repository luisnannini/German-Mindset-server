const openEditApplication = (id) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/applicationForm.html?_id=${id}`;
};
const openNewApplication = () => {
  window.location.href = `${window.location.origin}/views/applicationForm.html`;
};

window.onload = () => {
  const navButton = document.getElementById('applicationsNav');
  navButton.classList.add('activePage');

  const addButton = document.getElementById('addApplication');
  addButton.onclick = openNewApplication;

  const tableContent = document.getElementById('table-content');
  fetch(`${window.location.origin}/api/applications`)
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((application) => {
        const tr = document.createElement('tr');
        const jobDescriptionTD = document.createElement('td');
        const postulantTD = document.createElement('td');
        const interviewTD = document.createElement('td');
        const resultTD = document.createElement('td');
        const button = document.createElement('td');
        jobDescriptionTD.innerText = application.positions?.jobDescription;
        postulantTD.innerText = `${application.postulants?.firstName} ${application.postulants?.lastName}`;
        interviewTD.innerText = application.interview?.date.substr(0, 10) ?? '---';
        resultTD.innerText = application.result ?? '---';
        button.innerHTML = '<img src="/assets/deleteIcon.png" alt="" srcset="">';
        button.classList.add('deleteBtn');
        // button.onclick = (event) => deleteSession(item, event);
        // eslint-disable-next-line no-underscore-dangle
        tr.onclick = () => openEditApplication(application._id);
        tr.append(jobDescriptionTD, postulantTD, interviewTD, resultTD, button);
        tableContent.append(tr);
      });
    });
};
