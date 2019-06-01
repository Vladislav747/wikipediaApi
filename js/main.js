//Получение параметров из строки 

var params = window
  .location
  .search
  .replace('?', '')
  .split('&')
  .reduce(
    function (p, e) {
      var a = e.split('=');
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    },
    {}
  );

console.log(params);
console.log(params['data']);


var totalPages = "";

//Сортировка по самой свежей статье

//timestamp
function sortResults() {
  const resultsData = parsedData || "";
  $('.loading-indicator').toggleClass("hidden");
  $('.resultQuery').toggleClass("hidden");
  console.log("Ready to sort");
  console.log(resultsData[0].timestamp > resultsData[1].timestamp);
  for (i = 0; i < resultsData.length; i++) {
    console.log(resultsData[i].timestamp);
  }
  function compare(a, b) {
    return Date.parse(a.timestamp) - Date.parse(b.timestamp);
  }

  resultsData.sort(compare);
  console.log(resultsData);

  for (i = 0; i < resultsData.length; i++) {
    console.log(resultsData[i].timestamp);
  }

  displayResults(resultsData);

}


$('.btnTheme').click(function () {

});

$('.selectResults').change(function () {

  pagingResults();

});



function pagingResults() {

  var numOfMessages = $('.selectResults :selected').val();
  var length = parsedData.length;
  totalPages = Math.floor((length - 1) / numOfMessages) + 1;

  console.log(numOfMessages, "numOfMessages");
  console.log(length, "length");
  console.log(totalPages, "pages");

  var currentPage = ''; // текущая страница
  var currentMessage = currentPage * numOfMessages - numOfMessages; // определяем, с какой записи нам выводить

  var navDiv = document.getElementsByClassName("navigation-pages")[0];
  var previousPageDiv = document.getElementsByClassName("previous-page")[0];
  var nextPageDiv = document.getElementsByClassName("next-page")[0];
  navDiv.innerHTML = '<span class="navigation-title">Страницы:</span>';
  navDiv.innerHTML = '';
  navDiv.innerHTML += '<div class="pages">';
  if (totalPages > 1) {
    previousPageDiv.innerHTML = `<a href="#" class="prevnext" onclick=pageClick(1)><<</a>`;
  }
  for (var i = 1; i <= totalPages; i++) {
    navDiv.innerHTML += `<a href="#" class="page_number" onclick=pageClick(${i})>${i}</a>`;
  }
  navDiv.innerHTML += '</div>';
  // Проверяем нужны ли стрелки назад вперед 
  if (totalPages > 1) {
    nextPageDiv.innerHTML = `<a href="#" class="prevnext" onclick=pageClick(2)>>></a>`;
  }


  $('.loading-indicator').toggleClass("hidden");
  if (!$('.resultQuery').hasClass("hidden")) {
    $('.resultQuery').toggleClass("hidden");
  }
  displayResults(1, parsedData, numOfMessages);



  // // Находим две ближайшие станицы с обоих краев, если они есть 
  // if($page - 2 > 0) $page2left = ' <a href= ./page?page='. ($page - 2) .'>'. ($page - 2) .'</a> | '; 
  // if($page - 1 > 0) $page1left = '<a href= ./page?page='. ($page - 1) .'>'. ($page - 1) .'</a> | '; 
  // if($page + 2 <= $total) $page2right = ' | <a href= ./page?page='. ($page + 2) .'>'. ($page + 2) .'</a>'; 
  // if($page + 1 <= $total) $page1right = ' | <a href= ./page?page='. ($page + 1) .'>'. ($page + 1) .'</a>'; 

  // // Вывод меню 
  // echo $pervpage.$page2left.$page1left.'<b>'.$page.'</b>'.$page1right.$page2right.$nextpage; 



}





function pageClick(currentPage) {
  
  var previousPageDiv = document.getElementsByClassName("previous-page")[0];
  var nextPageDiv = document.getElementsByClassName("next-page")[0];

  if (currentPage - 1 > 0){
    previousPageDiv.innerHTML =  `<a href="#" class="prevnext" onclick=pageClick(${currentPage-1})><<</a>`;
  }
  else if(currentPage - 1 == 0){
    previousPageDiv.innerHTML = "";
  }
 
  if (currentPage  < totalPages){
  nextPageDiv.innerHTML = `<a href="#" class="prevnext" onclick=pageClick(${currentPage+1})>>></a>`;;
  }
  else if(currentPage == totalPages){
    nextPageDiv.innerHTML = ""; 
  }
  $('.loading-indicator').toggleClass("hidden");
  if (!$('.resultQuery').hasClass("hidden")) {
    $('.resultQuery').toggleClass("hidden");
  }
  
  displayResults(currentPage, parsedData, 10);

 
}





