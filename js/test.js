const endPoint = "http://localhost:8000/test.html/pred";

var functan = async () => {
    fetch(endPoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify({
  	"text": "Ex Wife Threatening SuicideRecently I left my wife for good because she has cheated on me twice and lied to me so much that I have decided to refuse to go back to her. As of a few days ago, she began threatening suicide. I have tirelessly spent these paat few days talking her out of it and she keeps hesitating because she wants to believe I'll come back. I know a lot of people will threaten this in order to get their way, but what happens if she really does? What do I do and how am I supposed to handle her death on my hands? I still love my wife but I cannot deal with getting cheated on again and constantly feeling insecure. I'm worried today may be the day she does it and I hope so much it doesn't happen."
  }),
})
  .then(data => data.json())
  .then(log => console.log(log))
  .catch((err) => console.log(err));
}
functan();
