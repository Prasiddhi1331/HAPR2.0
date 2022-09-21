const endPoint = "http://localhost:8000/test.html/pred";

var functan = async () => {
    fetch(endPoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify({
  	'count': 1
  }),
})
  .then(data => data.json())
  .then(log => console.log(log))
  .catch((err) => console.log(err));
}
functan();
