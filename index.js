const newsbar = async () => {
    try {
        const url = 'https://openapi.programming-hero.com/api/news/categories';
        const res = await fetch(url);
        const data = await res.json();
        displayNewsbar(data.data.news_category);
    }
    catch {
        console.log('error');
    }
}


const displayNewsbar = (news) => {
    const newsbarContainer = document.getElementById('newsbar-container');
    news.forEach(singleNews => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <button class="btn btn-outline-danger border-1 rounded-0 py-1 px-2 m-1" onclick="newsfeed('${singleNews.category_id}');  toggleSpinner(true);">${singleNews.category_name}</button>
        `;

        newsbarContainer.appendChild(newsDiv);
    });
}


const newsfeed = async (id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data);
    }
    catch {
        console.log('error');
    }
}

newsfeed('04');

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
    // console.log(news.data.length);
    const visible = document.getElementById('results-found');
    if (news.data.length === 0) {
        visible.classList.remove('d-none');
    }
    else {
        visible.classList.add('d-none')
    }


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
                                <img src="${singleNews.author.img}" style="width: 20%;" class="rounded-5">
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
    toggleSpinner(false);
}

const openModal = (id) => {
    try {
        const url = ` https://openapi.programming-hero.com/api/news/${id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => modalDetail(data.data[0]))
    }
    catch {
        console.log('error');
    }
}

const modalDetail = detail => {
    const modalTitle = document.getElementById('infoModalLabel');
    modalTitle.innerText = `${detail.title}`;
    const modalInfoDetails = document.getElementById('modal-detail');
    modalInfoDetails.innerHTML = `
    <p>${detail.details}</p>
    <h5>Author: ${detail.author.name ? detail.author.name : "No author found"}</h5>
    <h5>Date: ${detail.author.published_date ? detail.author.published_date : "Date not found"}</h5>
    `;
}




//loader here
const toggleSpinner = isLoading => {
    const loadingSection = document.getElementById('loader');
    if (isLoading) {
        loadingSection.classList.remove('d-none');
    }
    else {
        loadingSection.classList.add('d-none');
    }
}

newsbar();

// blog page link here 
document.getElementById('blog-id').addEventListener('click', function () {
    window.location.href = 'blog.html';
})
