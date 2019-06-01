
var searchHistory = [];
var parsedData = [];

$('#btnSearch').click(function () {
    $('.loading-indicator').toggleClass("hidden");
    if (!$('.resultQuery').hasClass("hidden")) {
        $('.resultQuery').toggleClass("hidden");
    }
    //Запрос результатов
    fetchResults();


});


function displayResults(page, results, numOfMessages) {

    //Либо жестко заданное значение либо длина массива
    var results = results || parsedData;
    var numOfMessages = numOfMessages || results.length;

    numOfMessages = (numOfMessages > results.length)?results:numOfMessages;


    var page = page || 1;
    

    const resultQuery = document.querySelector(".resultQuery");
    $('.resultQuery').toggleClass("hidden");
    resultQuery.innerHTML = "";
    $('.loading-indicator').toggleClass("hidden");


    var current = (page < 2)?0:((numOfMessages * page)-numOfMessages);

    for (var i = current; i < (numOfMessages * page) ; i++) {
        let url = encodeURI(`https://en.wikipedia.org/wiki/${results[i].title}`);
        // resultQuery.innerHTML += '<li class="titleWikipedia list-group-item bg-secondary">'+ ' Заголовок статьи  ' + results[i].title + '</li>';

        // resultQuery.innerHTML += '<li class="snippetWikipedia list-group-item bg-secondary">' + ' Сниппет статьи  ' + results[i].snippet + '</li>';
        resultQuery.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
              <h3 class="resultItem-title">
                <a href="${url}" target="_blank" rel="noopener">${results[i].title}</a>
              </h3>
              <span class="resultItem-snippet">${results[i].timestamp}</span><br>
              <span class="resultItem-snippet">${results[i].snippet}</span><br>
              <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
            </div>`
        );
    }
  
}

function displayErrorMessage(searchQuery) {

    console.log('An error occurred');
    const resultQuery = document.querySelector(".resultQuery");
    $('.resultQuery').toggleClass("hidden");
    resultQuery.innerHTML = "";
    $('.loading-indicator').toggleClass("hidden");

    resultQuery.insertAdjacentHTML("beforeend",
        `<div class='errorMessage'>
        <p>Your search - <span class='keyword'>${searchQuery}</span> - did not match any documents.</p>
          <li>Make sure that all words are spelled correctly.</li>
          <li>Try different keywords.</li>
          <li>Try more general keywords.</li>
        </p>
      </div>`
    );

   
}


function fetchResults() {

    const input = document.querySelector('#word-input').value;
    const searchQuery = input.trim();
    searchHistory.push(searchQuery);

    //Параметры запроса
    var params = {
        action: 'query',
        limit: '20',
        format: 'json',
        srsearch: searchQuery,
    };
    const endpoint = `https://en.wikipedia.org/w/api.php?action=${params.action}&list=search&prop=info&inprop=url&utf8=&format=${params.format}&origin=*&srlimit=${params.limit}&srsearch=${params.srsearch}`;
    console.log(endpoint);

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            parsedData = data.query.search;
            displayResults(1,parsedData);
        })
        .catch(() => displayErrorMessage(searchQuery));

}




    

