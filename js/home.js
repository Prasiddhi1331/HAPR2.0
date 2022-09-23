const endPoint = "http://localhost:8000/prediction.html/pred";
var sym = [];
var sym_cnt = document.querySelector("#sym_cnt");
var btn =  document.querySelector(".btn1");
var results =  document.querySelector(".results");
var box =  document.querySelector(".boxes1");
var dis = [];
var pred = [];

var add_res = async () =>{
  var input, filter, ul, li, a, i;
  console.log("adding event");
  div = document.getElementById("myDropdown");
  a = document.querySelectorAll("p");
  console.log(a.length);
  for (i = 0; i < a.length; i++) {
    // console.log("in loop");
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
  console.log("adding sys");
  var div = document.getElementById("myDropdown");
  fetch('../dataset/symptom.json')
    .then((response) => response.json())
    .then((json) => {
      console.log(json["Symptoms"]);
      var array = json["Symptoms"];
      for(k=0; k<array.length; k++){
        array[k] = array[k].replaceAll("_", " ");
        array[k] = array[k].replaceAll("__", " ");
        div.innerHTML+=`<p class="peas">${array[k]}</p>`;
      }
      add_res();
    });
}

add_sys();

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("p");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

var functan = async (msg) => {
  fetch(endPoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify({
      "sys": msg
    }),
  })
  .then(data => data.json())
  .then((log) => {
    console.log(log);
    dis = log["disease"];
    pred= log["pred"];
    console.log(dis);
    console.log(pred);
    for(let p=0; p<dis.length; p++){
      box.innerHTML+=`<div class="box11">
      <span>${dis[p]}</span>
      <span>${pred[p]*100}%</span>
      </div>`;
    }
    results.style="display:flex";
  })
  .catch((err) => console.log(err));
}

var calling = ()=>{
  console.log(sym);
  functan(sym);
}

var l_input = ["chills", "fatigue", "high_fever", "sweating", "obesity"];
btn.addEventListener("click",calling);