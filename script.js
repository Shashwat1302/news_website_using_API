const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const technologyBtn = document.getElementById("technology");
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");


let newsDataArr = [];


const API_KEY = "2f80b45178d245738081adf62f768709";


//const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
const GENERAL_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${API_KEY}`;
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${API_KEY}`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${API_KEY}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?q=`;

window.onload = function () {
  newsType.innerHTML = "<h4>General News</h4>";
  fetchGeneralNews();
};


generalBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>General News</h4>";
  fetchGeneralNews();
});

businessBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Business</h4>";
  fetchBusinessNews();
});

sportsBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Sports</h4>";
  fetchSportsNews();
});

technologyBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Technology</h4>";
  fetchTechnologyNews();
});

entertainmentBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Entertainment</h4>";
  fetchEntertainmentNews();
});

searchBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Search: " + newsQuery.value + "</h4>";
    fetchQueryNews();
  });

const fetchGeneralNews = async () => {
  const response = await fetch(GENERAL_NEWS);
  newsDataArr = await getNewsData(response);
  displayNews();
};

const fetchBusinessNews = async () => {
  const response = await fetch(BUSINESS_NEWS);
  newsDataArr = await getNewsData(response);
  displayNews();
};

const fetchSportsNews = async () => {
  const response = await fetch(SPORTS_NEWS);
  newsDataArr = await getNewsData(response);
  displayNews();
};

const fetchTechnologyNews = async () => {
  const response = await fetch(TECHNOLOGY_NEWS);
  newsDataArr = await getNewsData(response);
  displayNews();
};

const fetchEntertainmentNews = async () => {
  const response = await fetch(ENTERTAINMENT_NEWS);
  newsDataArr = await getNewsData(response);
  displayNews();
};

const fetchQueryNews = async () => {
    const query = newsQuery.value;
    if (query === "") {
      alert("Please enter a search query.");
      return;
    }
    const searchURL = SEARCH_NEWS + query + "&apiKey=" + API_KEY; 
    const response = await fetch(searchURL);
    newsDataArr = await getNewsData(response);
    displayNews();
  };

const getNewsData = async (response) => {
  const data = await response.json();
  if (data.status === "ok") {
    return data.articles;
  } else {
    console.error("Failed to fetch news:", data.message);
    return [];
  }
};

const displayNews = () => {
  newsdetails.innerHTML = "";

  if (newsDataArr.length === 0) {
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  newsDataArr.forEach((news) => {
    
    const newsTitle = news.title;
    const newsDescription = news.description;
    const newsImage = news.urlToImage;
    const newsUrl = news.url;

  
    const newsContainer = document.createElement("div");
    newsContainer.className = "news-container";

    const newsImageElem = document.createElement("img");
    newsImageElem.className = "news-image";
    newsImageElem.src = newsImage;
    newsContainer.appendChild(newsImageElem);

    const newsTitleElem = document.createElement("h2");
    newsTitleElem.className = "news-title";
    newsTitleElem.textContent = newsTitle;
    newsContainer.appendChild(newsTitleElem);

    const newsDescriptionElem = document.createElement("p");
    newsDescriptionElem.className = "news-description";
    newsDescriptionElem.textContent = newsDescription;
    newsContainer.appendChild(newsDescriptionElem);

    const newsLinkElem = document.createElement("a");
    newsLinkElem.className = "news-link";
    newsLinkElem.href = newsUrl;
    newsLinkElem.target = "_blank";
    newsLinkElem.textContent = "Read More";
    newsContainer.appendChild(newsLinkElem);

    
    newsdetails.appendChild(newsContainer);
  });
};

