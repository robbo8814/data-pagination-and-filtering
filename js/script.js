/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const currentStudent = document.querySelector("body ul");

let currentStudentData = ''
for (i=0; i<data.length; i++) {
   currentStudentData += `<li class="student-item cf">
   <div class="student-details">
   <img class="avatar" src="${data[i].picture.medium}" alt="Profile Picture">
   <h3>${data[i].name.first} ${data[i].name.last}</h3>
   <span class="email">${data[i].email}</span>
   </div>
   <div class="joined-details">
   <span class="date">Joined ${data[i].registered.date}</span>
   </div>
   </li>`
}

currentStudent.innerHTML = currentStudentData;



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
