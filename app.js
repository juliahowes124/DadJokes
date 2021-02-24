let jokes = {};

$(async function () {
    for (let i = 0; i < 10; i++) {
        const joke = await axios.get('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'text/plain'
            }
        });
        jokes[joke.data] = 0;
        $('#joke_container').append(createHtmlJoke(joke.data, 0));
    }
});

function createHtmlJoke(joke, score) {
    return `
    <div id="joke_div">
    <p class="joke">${joke}</p>
    <p class="net-count">${score}</p>
    <button class="up">Up</button>
    <button class="down">Down</button>
    </div>`
}

$('#joke_container').on('click', ".up", (e) => {
    let joke = $(e.target).parent().find('.joke').text();
    jokes[joke]++;
    $(e.target).parent().find('.net-count').text(jokes[joke])
    reOrderJokes();
})

$('#joke_container').on('click', '.down', (e) => {
    let joke = $(e.target).parent().find('.joke').text();
    jokes[joke]--;
    $(e.target).parent().find('.net-count').text(jokes[joke])
    reOrderJokes();
})

function reOrderJokes() {
    $('#joke_container').empty();
    let sorted = Object.entries(jokes).sort((a, b) => b[1] - a[1]);
    for (let [joke, score] of sorted) {
        $('#joke_container').append(createHtmlJoke(joke, score));
    }
}

