export default async function LoadFromTwitter(id, setVariable = f => f) {

    let url = document.getElementById(id).value;
    let slashPos = url.lastIndexOf('/');
    let tweetId = url.substring(slashPos+1);

    console.log(tweetId);

    if (url.includes('twitter.com/' & '/status/')) {

        let tweet = await fetch("https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/show.json?id=" + tweetId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': process.env.REACT_APP_TWITTER_BEARER
            }
        }).then((response) => {
            return response.json();
        });

        if (id === "messageFromTweetUp" || id === "cipherFromTweetUp") {
            setVariable((tweet.text).toUpperCase());
        } else if (id === "messageFromTweetLow" || id === "cipherFromTweetLow") {
            setVariable((tweet.text).toLowerCase());
        } else {
            setVariable(tweet.text);
        }

    } else {
        alert("To nie jest link do tweeta!");
    }
}