const newsbar = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayNewsbar(data.data.news_category);
}

const displayNewsbar = (news) => {
    console.log(news);
    const newsbarContainer = document.getElementById('newsbar-container');
    news.forEach(singleNews => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <button class="lightred border-0 rounded-1 py-1 px-2 m-1">${singleNews.category_name}</button>
        `;
        newsbarContainer.appendChild(newsDiv);
    });
}

newsbar();