// This script is to pass the response without genre

// this is to check only on ready state and document is completely loaded

document.onreadystatechange = function(){
    if(document.readyState === 'complete') {
        const responseURL = 'https://api.myjson.com/bins/13r402';
        const templateMovieList = document.createElement('template')

        templateMovieList.innerHTML = `<li class="movie-list">
                                            <figure>
                                                <a><img class="movie-img" src="https://www.bancroft-ae.com/wp-content/uploads/2013/11/dummy-image-portrait.jpg"></a>
                                            </figure>
                                            <figcaption>
                                                <h1><a class="movie-title">Avengers</a></h1>
                                                <span class="movie-year">2010</span>
                                                <span class="movie-type">Action</span>
                                            </figcaption>
                                        </li>`

        const fetch = (responseURL) => {
            var requestCall = new XMLHttpRequest();

            requestCall.onreadystatechange = function() {
                if(requestCall.readyState === 4) {
                    const responseText = requestCall.response;
                    render(responseText);
                }
            };
            requestCall.open( "GET", responseURL, false ); // false for synchronous request
            requestCall.send( null );    
        };

        const render = (responseText) => {
            if(responseText) {
                let data = JSON.parse(responseText);

                document.querySelectorAll('.checkbox').forEach(element => {
                    element.addEventListener('click', e => {
                        let movieType = e.target.getAttribute('type');
                    });
                });
                Object.entries(data.movies).forEach(([keys, value]) => {

                    for (var i = 0; i < value.genres.length; i++) {

                        if (value.genres[i] === 'Crime' || value.genres[i] === 'Comedy') {
                            templateMovieList.content.querySelector('.movie-list').setAttribute('data-description', value.storyline);

                            templateMovieList.content.querySelector('.movie-list').setAttribute('data-url', value.posterurl);

                            templateMovieList.content.querySelector('.movie-list').setAttribute('data-name', value.title);

                            templateMovieList.content.querySelector('.movie-list').setAttribute('data-actors', value.actors);

                            templateMovieList.content.querySelector('.movie-list').setAttribute('data-genre', value.genres);

                            templateMovieList.content.querySelector('.movie-title').innerHTML = value.title;

                            templateMovieList.content.querySelector('.movie-title').setAttribute('data-key',keys);

                            templateMovieList.content.querySelector('.movie-year').innerHTML = value.year;

                            templateMovieList.content.querySelector('.movie-img').setAttribute('src', value.posterurl);

                            templateMovieList.content.querySelector('.movie-type').innerHTML = value.genres;

                            document.querySelector("ul").appendChild(templateMovieList.content.cloneNode(true))
                        }

                    }
                });
            }
        };

        const renderAside = (listIndex) => {
            let cardIndex = document.querySelector('.movie-app').querySelector('ul').querySelectorAll('.movie-list')[listIndex];

            document.querySelector('.movie-details').classList.add('show');

            document.querySelector('.movie-details').querySelector('img').setAttribute('src', cardIndex.getAttribute('data-url'));

            document.querySelector('.detail-name').innerHTML = cardIndex.getAttribute('data-name');

            document.querySelector('.genre-type').innerHTML = cardIndex.getAttribute('data-genre');

            document.querySelector('.detail-description').innerHTML = cardIndex.getAttribute('data-description');
        };

        fetch(responseURL);

        document.querySelectorAll('.movie-title, .movie-img').forEach(element => {
            element.addEventListener('click', e => {
                let listIndex = e.target.getAttribute('data-key');
                console.log(listIndex);
                renderAside(listIndex);
            });
        });

        document.querySelector('.close').addEventListener('click', e => {
            document.querySelector('.movie-details').classList.remove('show').add('hide');
        });
    }
};