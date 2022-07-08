/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const currentStudent = document.querySelector('.student-list');
const perPage = 9;
let list = data;

// showPage function to display student data

function showPage(page, results) {
   let endIndex = perPage * page;
   const startIndex = endIndex - perPage;
   if (endIndex > results.length) {    // Ensuring a page displays even if there's less than 9 students
      endIndex = results.length;
   }
   currentStudent.innerHTML = '';
   if (results.length === 0) {   // If no students match the search result display below
      currentStudent.innerHTML = `<h3 class="no-results">
      No results match your query</h3>`;
   } else {
      for (i = startIndex; i < endIndex; i++) {
         // let studentData = ''
         let studentData = `<li class="student-item cf">
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


// Creating addPagination function to display functional page numbers at bottom of page

function addPagination(results) {
   const pageNumsLength = Math.ceil(results.length / 9);
   const btnDisplay = document.querySelector('.link-list');
   btnDisplay.innerHTML = '';
      if (results.length === 0) {
         btnDisplay.innerHTML = '';
      } else {
      for (let i = 0; i < pageNumsLength; i++) {   
         let btnCreate = `<li>
         <button type="button">${i+1}</button>
      </li>`
         btnDisplay.insertAdjacentHTML("beforeend", btnCreate);
      }
   const firstBtn = document.querySelector('.link-list li button')
   firstBtn.className = 'active';
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

 // Creating function to use showPage & addPagination functions
 function displayPage(startPage, data) {
   showPage(startPage, data);
   addPagination(data);
}

// Creating search box
const searchBox = document.querySelector('header');
searchBox.innerHTML += `<label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
          </label>`
const searchInput = document.getElementById('search');
const searchInputBtn = document.querySelector('header button')

// Creating search box functionality to search student data object values
function findSearchResults(query) {
   let input = query.toLowerCase();
   list = data.filter(function(data) {
      return data.name.first.toLowerCase() == input || data.name.last.toLowerCase() == input;
   });
   
   return list;
 };

 // Event listeners for search box
searchInput.addEventListener('keyup', (event) => {
   if(event.key === 'Enter') {
      findSearchResults(searchInput.value);
      displayPage(1, list);
      displayShowAllBtn();
   }
})
searchInputBtn.addEventListener('click', () => {
   findSearchResults(searchInput.value);
   displayPage(1, list);
   displayShowAllBtn();
})

// Added a show-all button to return to full list of students and clear search input
function displayShowAllBtn() {
let showAll = `<div>
<button type="button" class="show-all">Show All</button>
</div>`
searchBox.insertAdjacentHTML("beforeend", showAll);
const showAllBtn = document.querySelector('.show-all');
// Shows all data again starting at page 1 & removes the show-all button
showAllBtn.addEventListener('click', (event) => {
   list = data;
   displayPage(1,list);
   searchInput.value = '';
   document.querySelector('.show-all').remove();
})
};

// Display first page
displayPage(1, list);