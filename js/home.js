const endPoint = "http://localhost:8000/prediction.html/pred";
var sym = [];
var sym_cnt = document.querySelector("#sym_cnt");

var add_res = () =>{
  var input, filter, ul, li, a, i;
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    a[i].addEventListener("click",(e)=>{
      e.target.classList.toggle("focus");
      if(!sym.includes(e.target.innerText)){
        sym.push(e.target.innerText);
      }
      else{
        sym = sym.filter(function(value, index, arr){ 
          return value != e.target.innerText;
        });
      }
      sym_cnt.innerText = 6-sym.length;
      console.log(sym);
    });
  }
}

var add_sys = async () =>{
  var div = document.getElementById("myDropdown");
  fetch('../dataset/symptom.json')
    .then((response) => response.json())
    .then((json) => {
      console.log(json["Symptoms"]);
      var array = json["Symptoms"];
      for(k=0; k<array.length; k++){
        div.innerHTML+=`<a href="#">${array[k]}</a>`;
      }
    });
}

add_sys();
add_res();
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
// functan();

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

