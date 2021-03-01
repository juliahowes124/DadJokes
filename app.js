let jokes = {};

$(async function () {
  for (let i = 0; i < 10; i++) {
    const response = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    });
    const { joke, id } = response.data;
    jokes[id] = { joke, count: 0 };
    $('#joke_container').append(createHtmlJoke(joke, id, 0));
  }
});

function createHtmlJoke(joke, id, score) {
  return `
    <div class="joke_div" data-joke-id=${id}>
    <p class="joke">${joke}</p>
    <div class="buttons_div">
        <button class="up btn btn-success mb-1"><i class="fas fa-thumbs-up"></i></button>
        <button class="down btn btn-danger"><i class="fas fa-thumbs-down"></i></button>
    </div>
    <p class="net-count">${score}</p>
    </div>`
}

$('#joke_container').on('click', ".up", (e) => {
  let $target = $(e.currentTarget);
  let jokeId = $target.closest(".joke_div").data("joke-id");
  jokes[jokeId].count++;
  $target.parent().next().text(jokes[jokeId].count);
  reOrderJokes();
})

$('#joke_container').on('click', '.down', (e) => {
  let $target = $(e.currentTarget);
  let jokeId = $target.closest(".joke_div").data("joke-id");
  jokes[jokeId].count--;
  $target.parent().next().text(jokes[jokeId].count)
  reOrderJokes();
})

function reOrderJokes() {
  $('#joke_container').empty();
  let sorted = Object.entries(jokes).sort((a, b) => b[1].count - a[1].count);
  for (let [id, { joke, count }] of sorted) {
    $('#joke_container').append(createHtmlJoke(joke, id, count));
  }
}

