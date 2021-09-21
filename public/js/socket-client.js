const txtmsg         = document.querySelector('#msg');
const btnsend        = document.querySelector('#send');
const socket      = io();
const lblOnline   = document.querySelector('#lblOnline');
const lblOffline  = document.querySelector('#lblOffline');
const dl = document.querySelector('#tabla-elementos');
const chatHistory = [];

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }


socket.on('connect', () => {
    console.log('Connect');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Disconnect');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('send-msg', ( payload ) => {

  chatHistory.push(payload);

  for (var i = 0; i < chatHistory.length; i++) {

    var element = chatHistory[i];
   console.log(element);
    /*
    var fila = '<tr><td>' + elemento.titulo +
                '</td><td>' + elemento.descripcion +
                '</td><td>' + elemento.tipo + '</td></tr>';
  
    tablaElementos.innerHTML += fila;
    */
  
    //var dt = document.createElement('dt');
    var dd = document.createElement('dd');
    var i = document.createElement('i');
    var div = document.createElement('div');  
    var p = document.createElement('p');
    var span = document.createElement('span');
    
    //dl.appendChild(dt)
    
    //dt.appendChild(div);
    dd.appendChild(div);
    div.appendChild(i);
    div.appendChild(p);
    div.appendChild(span);
  
    div.className="chat-container";
     i.className="fas fa-user-circle fa-3x right";
     i.alt="Avatar";
    p.textContent=element.msg;
    span.textContent=element.date;
    span.className="time-left";
  
    dl.appendChild(dd);
  
    //dl.appendChild(dl);
  
    
  
  }


});




btnsend.addEventListener('click', () => { 
  const msg=txtmsg.value;

  const payload = {
    msg,
    id: '123456ABC',
    date: new Date().getTime(),
  };

  chatHistory.push(payload);

//   while (dl.childElementCount > 0) {
//     dl.removeChild(dl.firstElementChild);
// }


for (var i = 0; i < chatHistory.length; i++) {

  var element = chatHistory[i];

  /*
  var fila = '<tr><td>' + elemento.titulo +
              '</td><td>' + elemento.descripcion +
              '</td><td>' + elemento.tipo + '</td></tr>';

  tablaElementos.innerHTML += fila;
  */

  var dt = document.createElement('dt');
  //var dd = document.createElement('dd');
  var i = document.createElement('i');
  var div = document.createElement('div');  
  var p = document.createElement('p');
  var span = document.createElement('span');
  
  
  //dl.appendChild(dd);
  dt.appendChild(div);
  //dd.appendChild(div);
  div.appendChild(i);
  div.appendChild(p);
  div.appendChild(span);

  div.className="chat-container darker";
   i.className="far fa-user-circle fa-3x";
   i.alt="Avatar";
  p.textContent=element.msg;
  span.textContent=element.date;
  span.className="time-right";

  dl.appendChild(dt);

  //dl.appendChild(dl);

  

}


  socket.emit('send-msg',payload,(id) => {
    console.log('desde el server');
  });
  console.log(payload);
  txtmsg.value='';
})