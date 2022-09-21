const endPoint = "http://localhost:8000/prediction.html/pred";

var functan = async () => {
    fetch(endPoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify({
  	'count': 1
  }),
})
// .then((res)=>{
//     res.json();
// })
  .then(data => data.json())
  .then(log => console.log(log))
  .catch((err) => console.log(err));
}
functan();