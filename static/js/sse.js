var eventSource = new EventSource("/api/v1/stream.json");

function tweetHandler(event) {
    tweetTemplate = document.querySelector(".tweet-template .tweet");
    tweet = tweetTemplate.cloneNode(true);

    var data = JSON.parse(event.data);

    tweet.querySelector(".message").textContent = data.text;

    user = tweet.querySelector(".user")
    user.querySelector("a").href = "https://twitter.com/" + data.user.screen_name;
    user.querySelector(".name").textContent = data.user.name;
    user.querySelector(".screenname").textContent = data.user.screen_name;
    user.querySelector("img").src = data.user.profile_image_url_https;

    tweets = document.querySelector(".tweets");

    tweets.appendChild(tweet);
}

function create_audio_element() {
    o = document.createElement('audio');
    o.addEventListener('ended', function(){
        play_next();
    });
    o.addEventListener('error', function(){
        play_next();
    });
    return o;
}

function play_next() {
    if (audioElement.error != null) {
        audioElement = create_audio_element();
    }
    if (audioElement.paused) {
        if (to_play.length > 0) {
            audioElement.src = '/sounds/' + to_play.shift() + '.wav';
            audioElement.load();
            audioElement.play();
        }
    }
}

function soundHandler(event) {
    to_play.push(event.data);
    play_next();
}

var audioElement = create_audio_element();

var to_play = [];

eventSource.addEventListener("sound", soundHandler, false);
eventSource.addEventListener("tweet", tweetHandler, false);