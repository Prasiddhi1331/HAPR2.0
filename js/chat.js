const endPoint = "http://localhost:8000/chat.html/pred";
const input = document.querySelector(".chit-chat");
const chat_area = document.querySelector(".chatarea")

console.log(chat_area);

let cnt = 0;

var functan = async (msg) => {
    fetch(endPoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify({
  	"text": msg
  }),
})
  .then(data => data.json())
  .then((log) => {
    console.log(log);
    if(log["Result"]==1){
        console.log("Suicidal");
        chat_area.innerHTML+=`<div class="chat robo">
        <img src="../images/cute-robot-waving-hand-cartoon-character-science-technology-isolated_138676-3155.jpg" alt="" class="dp">
        <div class="bubble">OMG!! You are <span class="red">SUICIDAL</span> !</div>
      </div>`;
    }else{
        console.log("Non-Suicidal");
        chat_area.innerHTML+=`<div class="chat robo">
        <img src="../images/cute-robot-waving-hand-cartoon-character-science-technology-isolated_138676-3155.jpg" alt="" class="dp">
        <div class="bubble">Balle balle!! You are <span class="red">NON - SUICIDAL</span>!</div>
      </div>`;
    }
  })
  .catch((err) => console.log(err));
}
// functan("hi");

input.addEventListener("keypress",(e)=>{
    if ((e.keyCode == 13) && (cnt === 0)) { 
        console.log("Enter Pressed");
        chat_area.innerHTML+=`<div class="chat user">
        <img src="../images/cat.jpg" alt="" class="dp">
        <div class="bubble">${input.value}</div>
      </div>`;
      chat_area.innerHTML+=`<div class="chat robo">
      <img src="../images/cute-robot-waving-hand-cartoon-character-science-technology-isolated_138676-3155.jpg" alt="" class="dp">
        <div class="bubble">Wait!! Processing Your Request!</div>
      </div>`;
      cnt+=1;
      functan(input.value);
    }
    else if((e.keyCode == 13) && (cnt === 1)){
        chat_area.innerHTML=`<div class="chat robo">
        <img src="../images/cute-robot-waving-hand-cartoon-character-science-technology-isolated_138676-3155.jpg" alt="" class="dp">
        <div class="bubble">Hello There!<br>I am HAPR.<br> Let's Talk about your issues.</div>
      </div>`;
      chat_area.innerHTML+=`<div class="chat user">
        <img src="../images/cat.jpg" alt="" class="dp">
        <div class="bubble">${input.value}</div>
      </div>`;
      chat_area.innerHTML+=`<div class="chat robo">
      <img src="../images/cute-robot-waving-hand-cartoon-character-science-technology-isolated_138676-3155.jpg" alt="" class="dp">
        <div class="bubble">Wait!! Processing Your Request!</div>
      </div>`;
      cnt = 0;
      functan(input.value);
    }
});
