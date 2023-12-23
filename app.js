const CPost = document.querySelector("#Dpost");
const showPerPageSelect = document.querySelector("#showPerPage");
const sortBySelect = document.querySelector("#sortBy");
const resultInfo = document.querySelector("#resultInfo");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const fullprevPageButton = document.getElementById("fullprevPage");
const fullnextPageButton = document.getElementById("fullnextPage");

let currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
let postsPerPage = parseInt(showPerPageSelect.value);
let responseJson;

const updatePaginationNumbers = (totalPages) => {
  const paginationNumbersContainer = document.getElementById("paginationNumbers");
  paginationNumbersContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = "mx-3";
    const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';

    if (i === currentPage) {
      button.classList.add("p-3", "bg-p-orange", "rounded-lg", "text-white");
    }

    button.addEventListener("click", () => {
      currentPage = i;
      saveSettings();
      getList();
    });

    paginationNumbersContainer.appendChild(button);
  }
};

const sortByOptions = {
  newest: 'published_at',
  latest: '-published_at',
};

const loadSettings = () => {
  currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
  postsPerPage = parseInt(localStorage.getItem("postsPerPage")) || 10;
  sortBySelect.value = localStorage.getItem("sortBy") || "newest";
};


const getList = () => {
  const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
  fetch(apiUrl, {
    headers: {
      'Accept': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      const dataArray = Array.isArray(json) ? json : json.data;

      if (Array.isArray(dataArray)) {
        responseJson = dataArray;

        const sortOrder = sortBySelect.value === 'latest' ? -1 : 1;
        const sortOption = 'published_at';

        responseJson.sort((a, b) => {
          const dateA = new Date(a[sortOption]);
          const dateB = new Date(b[sortOption]);

          return (dateA - dateB) * sortOrder;
        });
        
                const startIndex = (currentPage - 1) * postsPerPage;
                const endIndex = startIndex + postsPerPage;
                const currentPosts = responseJson.slice(startIndex, endIndex);

                function formatDate(dateString) {
                  const options = { year: 'numeric', month: 'long', day: 'numeric' };
                  const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
                  return formattedDate;
                }
        
                CPost.innerHTML = "";
                currentPosts.forEach((item) => {
                  CPost.innerHTML += `
                    <a href="" class="block w-full h-full">
                      <div class="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                        <img src="./img/pic-1.jpg" alt="Placeholder Image" class="w-full h-56 object-cover" loading="lazy">
                        <div class="p-5">
                          <p class="text-slate-300 text-lg mb-2">${formatDate(item.published_at)}</p>
                          <h1 class="font-bold text-4xl line-clamp-3">${item.title}</h1>
                        </div>
                      </div>
                    </a>
                  `;
                });
        
                const totalPages = Math.ceil(responseJson.length / postsPerPage);
                resultInfo.textContent = `Showing ${startIndex + 1} - ${endIndex} of ${responseJson.length}`;
        
                prevPageButton.disabled = currentPage === 1;
                nextPageButton.disabled = currentPage === totalPages;
        
                updatePaginationNumbers(totalPages);
              } else {
                console.error('API response is not an array:', json);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        };

loadSettings();
getList();

const saveSettings = () => {
  localStorage.setItem("currentPage", currentPage.toString());
  localStorage.setItem("postsPerPage", postsPerPage.toString());
  localStorage.setItem("sortBy", sortBySelect.value);
};

showPerPageSelect.addEventListener("change", () => {
  postsPerPage = parseInt(showPerPageSelect.value);
  currentPage = 1;
  saveSettings();
  getList();
});

sortBySelect.addEventListener("change", () => {
  currentPage = 1;
  saveSettings();
  getList();
});

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    saveSettings();
    getList();
  }
});

nextPageButton.addEventListener("click", () => {
  const totalPages = Math.ceil(responseJson.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    saveSettings();
    getList();
  }
});

fullprevPageButton.addEventListener("click", () => {
  currentPage = 1;
  saveSettings();
  getList();
});

fullnextPageButton.addEventListener("click", () => {
  currentPage = Math.ceil(responseJson.length / postsPerPage);
  saveSettings();
  getList();
});



const header = document.querySelector('header');
let prevScrollpos = window.pageXOffset;

window.addEventListener('scroll', ()=> {
    let currentScrollPos = window.pageYOffset;

    if(prevScrollpos < currentScrollPos){
        header.classList.add('hide');
        header.classList.add('bg-2');
    }
    else{
        header.classList.remove('hide');
        header.classList.remove('bg-1');
    }
    prevScrollpos = currentScrollPos;
});

document.addEventListener("scroll", function() {
    var scrollTop = window.scrollY;
    var parallaxBg = document.querySelector(".parallax-bg");

    parallaxBg.style.transform = "translateY(" + scrollTop * 0.5 + "px)";
  });


