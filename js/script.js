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
const currentStudent = document.querySelector('.student-list');
const perPage = 9;
let list = data;

function showPage(page, results) {
   let endIndex = perPage * page; // 9*1=9
   const startIndex = endIndex - perPage; // 9-9=0
   if (endIndex > results.length) {
      endIndex = results.length;
   }
   currentStudent.innerHTML = '';
   if (results.length === 0) {
      currentStudent.innerHTML = `<h3 class="no-results">
      No results match your query</h3>`;
      console.log('woohoo');
   } else {
      for (i=startIndex; i<endIndex; i++) {
      
         let studentData = ''
         studentData = `<li class="student-item cf">
         <div class="student-details">
         <img class="avatar" src="${results[i].picture.medium}" alt="Profile Picture">
         <h3>${results[i].name.first} ${results[i].name.last}</h3>
         <span class="email">${results[i].email}</span>
         </div>
         <div class="joined-details">
         <span class="date">Joined ${results[i].registered.date}</span>
         </div>
         </li>`
      currentStudent.insertAdjacentHTML("beforeend", studentData);
      };
   }  
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
//NEED TO GET CSS FORMATTING WORKING - LIKELY NEED TO APPEND TO LI ELEMENT
function addPagination(results) {
   const pageNumsLength = Math.ceil(results.length / 9);
   const btnDisplay = document.querySelector('.link-list');
   btnDisplay.innerHTML = '';
   if (results.length === 0) {
      console.log('no results')
      btnDisplay.innerHTML = '';
      list = data;
   } else {
   for (let i=0; i<pageNumsLength; i++) {   
      let btnCreate = `<li>
      <button type="button">${i+1}</button>
    </li>`
      btnDisplay.insertAdjacentHTML("beforeend", btnCreate);
   }
      btnDisplay.firstChild.className = 'active';

      btnDisplay.addEventListener('click', (event) => {
         if (event.target.tagName == "BUTTON") {
            let oldBtn = document.querySelector('.active');
            oldBtn.className = '';
            event.target.className = 'active';
            showPage(event.target.textContent, list);
         }
   })
}
}

const searchBox = document.querySelector('header');
searchBox.innerHTML += `<label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
          </label>`

const searchInput = document.getElementById('search');
const searchInputBtn = document.querySelector('header button')

function findSearchResults(query) {
   let input = query.toLowerCase();
   // list = data.filter(e => e.name.first.toLowerCase() === input);
   list = data.filter(e => Object.values(e).map(e => String(e).toLowerCase()).some(e => e.includes(input)));
   console.log(list);
   return list;
 };

function displayPage() {
   showPage(1, list);
   addPagination(list);
}

searchInput.addEventListener('keyup', (event) => {
   if(event.keyCode === 13) {
      findSearchResults(searchInput.value);
      displayPage();
   }
})
searchInputBtn.addEventListener('click', (event) => {
   findSearchResults(searchInput.value);
   displayPage();
})


// Call functions
showPage(1, list);
addPagination(list);