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
        <button class="btn btn-outline-danger border-1 rounded-0 py-1 px-2 m-1" onclick="newsfeed('${singleNews.category_id}')">${singleNews.category_name}</button>
        `;
        newsbarContainer.appendChild(newsDiv);
    });
}

const newsfeed = async (id) => {
    // console.log(id); 01 02 03 04
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

}

newsbar();


document.getElementById('blog-id').addEventListener('click', function(){
    window.location.href = 'blog.html';
})