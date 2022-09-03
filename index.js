const newsbar = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayNewsbar(data.data.news_category);
}

const displayNewsbar = (news) => {
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
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data);
}

const displayNews = (news) => {
    const newsContainer = document.getElementById('newsfeed-container');
    newsContainer.innerHTML = "";
    // items found here 
    const newsNumber = document.getElementById('items-found');
    newsNumber.innerText = `${news.data.length} items found for this category`;
    // items found here

    // data sorting here 
    news.data.sort((a, b) => {
        return b.total_view - a.total_view;
    })
    // data sorting here 


    news.data.forEach(singleNews => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3" style="width: 100%;">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="${singleNews.thumbnail_url}" class="img-fluid rounded-0" style="width: 100%;">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">${singleNews.title}</h5>
                                <p class="card-text">${singleNews.details.slice(0, 300)}...</p>
                                <div id="main-div" class="d-flex align-items-center">

                                <div class="d-flex flex-column" style="width: 30%;">
                                <img src="${singleNews.author.img}" style="width: 15%;" class="rounded-5">
                                <p class="fw-semibold">${singleNews.author.name ? singleNews.author.name : "No author found"}</p>
                                </div>

                                <div style="width: 30%;">
                                <p>Views: ${singleNews.total_view}</p>
                                </div>
                                <div style="width: 30%;">
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#infoModal" onclick="openModal('${singleNews._id}')">More</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
}

const openModal = (id) => {
    const url = ` https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => modalDetail(data))
}

const modalDetail = (detail) => {
    console.log(detail);
}

newsbar();


document.getElementById('blog-id').addEventListener('click', function () {
    window.location.href = 'blog.html';
})


