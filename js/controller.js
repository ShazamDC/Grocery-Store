var users,userdetail;
if(itemoperations.itemtypelist.length==0){
loadusers();     
once();}
function loadusers()
{var pr=new Promise((resolve,reject)=>{
    var url = "http://localhost:3000/users.json";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
         resolve(xmlHttp.responseText);
        }
    }
    xmlHttp.send(null);
    
});
pr.then((data)=>{users=JSON.parse(data);}).catch(err=>console.log("Error is ",err));
}
window.addEventListener("load",()=>{
document.querySelector("#user-login").addEventListener("click",login);      
itemoperations.itemtypelist.forEach(type=>{
document.querySelector(`#${type.itemListname}`).addEventListener("click",function(){printItemTable(type.itemListname,type.itemList);});
});
document.querySelector("#home").addEventListener("click",home);
document.querySelector("#show-menu").addEventListener("click",menuButton);
document.querySelector("#checkout").addEventListener("click",checkout);
document.querySelector("#service").addEventListener("click",services);
document.querySelector("#about").addEventListener("click",aboutUs);
document.querySelector("#gallery").addEventListener("click",gallery);
document.querySelector("#sign-in").addEventListener("click",signupfunction);
document.querySelector("#user-signin").addEventListener("click",signInfunction);
});
var signupfunction=()=>{
    document.querySelector("#sign-up-form").style.display="block";
    document.querySelector("#log-in-form").style.display="none";
}
var signInfunction=()=>{
   userdetail=users[0]; 
   var  fname=userdetail.firstname= document.querySelector("#fname").value;
   var lname=userdetail.lastname= document.querySelector("#lname").value;
   var uname=userdetail.uname= document.querySelector("#uname-sign").value;
   var contact=userdetail.contact= document.querySelector("#contact").value;
   var address=userdetail.address= document.querySelector("#address").value;
   var password=userdetail.password= document.querySelector("#password-sign").value;
   var mail=userdetail.email=document.querySelector("#user-mail").value;
    document.querySelector("#user-details").style.display="none";
    document.querySelector("#grocery").style.display="block";    
}
var login=()=>{
 var uname=document.querySelector("#uname").value;
 var pass=document.querySelector("#password").value;
 document.querySelector("#list-item").display="inline-block";
 document.querySelector("#item-type-list-buttons").display="inline-block";       
var bl=validateUserPass(uname,pass);
console.log(bl);
if(bl==true)
{
document.querySelector("#user-details").style.display="none";
document.querySelector("#grocery").style.display="block";    
}else{
document.querySelector("#form-check-help").innerHTML="user name or password does not match";
}
}
function validateUserPass(uname,pass)
{ var bl=false;
users.forEach(u=>{

if( uname.localeCompare(u.username)==0 && pass.localeCompare(u.password)==0){
    userdetail=u;
  bl =true;  
}
});
return bl;
}
var home=()=>{
    document.querySelector("#home-section").style.display="block";    
    document.querySelector("#bill").style.display="none";
    document.querySelector("#menu").style.display="none"; 
    document.querySelector("#services").style.display="none"; 
    document.querySelector("about-us").style.display="none";  
    document.querySelector("#gallery-images").style.display="none";
}
var menuButton=()=>{
    document.querySelector("#home-section").style.display="none";
    document.querySelector("#bill").style.display="none";
    document.querySelector("#menu").style.display="block";
    document.querySelector("#services").style.display="none";
    document.querySelector("#about-us").style.display="none";  
    document.querySelector("#gallery-images").style.display="none";

 
}
var checkout=()=>{
    document.querySelector("#gallery-images").style.display="none";
document.querySelector("#home-section").style.display="none";    
document.querySelector("#menu").style.display="none";    
document.querySelector("#bill").style.display="block";
document.querySelector("#services").style.display="none"; 
document.querySelector("#about-us").style.display="none";  
displaybill();
}

function displaybill(){
var total=0;    
var itemTable = document.querySelector("#billtable");
itemTable.innerHTML="";
itemoperations.itemtypelist.forEach(typelist=>{
typelist.itemList.forEach(obj=>{
if(obj.markForSell!=0){
 var tr = itemTable.insertRow();
    let index = 0;
    for(let key in obj)
    {   
             if(key=="id")
    {
     continue;
     }
     if(key=="url"){
        tr.insertCell(index).innerHTML = `<img class='url' src='${obj[key]}'/>`;
        index++;
        continue;  
    }
    if(key=="quantity")
    {
        continue;
    }
    if(key=="rating")
    {
        continue;
    }
     
        tr.insertCell(index).innerHTML = obj[key];
        index++;
    }
    var subtotal=obj.markForSell*obj.price;
    total=total+subtotal;
    tr.insertCell(index).innerHTML=subtotal;   
console.log(obj);

}

});
});    
document.querySelector("#billtotal").innerHTML=`<div>Total bill  is ${total+total*0.18} @ 18% of tax</div> <div> Name : ${userdetail.firstname+" "+userdetail.lastname} </div> 
 <div> Address : ${userdetail.address}</div> <div>Email:${userdetail.email}</div>`
}
function once(){
var pr=new Promise((resolve,reject)=>{
    var url = "http://localhost:3000/list.json";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
         resolve(xmlHttp.responseText);
        }
    }
    xmlHttp.send(null);
    
});
pr.then((data)=>{loaddata(data)}).catch(err=>console.log("Error is ",err));
}
function loaddata(data){

var json=JSON.parse(data);
json=json.mydata;
json.forEach(listitem=> {
    var newitemtypelist=new itemList(listitem.itemListname);    
listitem.itemList.forEach(Item=>{
var newItem=new item(Item.id,Item.name,Item.desc,Item.price,Item.url,Item.seller,Item.quantity,Item.rating);
newitemtypelist.itemList.push(newItem);
})
itemoperations.add(newitemtypelist);    

});
createtypelistbuttons();
}
function createtypelistbuttons(){

itemoperations.itemtypelist.forEach(types=>createbuttons(types.itemListname,types.itemList));
}
function createbuttons(typename,itemarr){
var buttons=document.querySelector("#item-type-list-buttons");
var bt=`<button class="btn btn-primary" id=${typename}>${typename}</button>`;
var bt=document.createElement("button");
bt.className="btn btn-primary btns";
bt.id=`${typename}`;
bt.innerHTML=`${typename}`;
buttons.appendChild(bt);
buttons.style.display="block";
bt.addEventListener("click",printItemTable(typename,itemarr));
}


var printItemTable=(type,itemListarr)=>{

    document.querySelector("#item-type-name").innerHTML=`<h1>${type}</h1>`;
    var itemTable = document.querySelector("#itemtable");
   itemTable.innerHTML="";
   itemListarr.forEach(itemListobj=>{
    var tr = itemTable.insertRow();
    let index = 0;
    for(let key in itemListobj)
    {   
             if(key=="id")
    {
     continue;
     }
     if(key=="url"){
        tr.insertCell(index).innerHTML = `<img class='url' src='${itemListobj[key]}'/>`;
        index++;
        continue;  
    }
 
     if(key=="markForSell")
     {   
         continue;
     }    
        tr.insertCell(index).innerHTML = itemListobj[key];
        index++;
    }
    var operationTd =  tr.insertCell(index);
    var id = itemListobj.id;
    operationTd.appendChild(createIcon(id,type,"http://www.psdgraphics.com/wp-content/uploads/2009/07/add-to-cart.jpg",addtoCart));

   });} 

function createIcon(id,type,path,fn){
    var img = document.createElement("img");
    img.src = path;
    img.className = "url";
    img.setAttribute("item-id", id);
    img.setAttribute("item-type",type);
    img.addEventListener("click",fn);
    img.style.cursor="pointer";
    return img;
}
function addtoCart(){
    var img = event.srcElement;
    var Iid = img.getAttribute("item-id");
    var Itype=img.getAttribute("item-type");
   itemoperations.update(Iid,Itype);
   var itemListarr; 
   itemoperations.itemtypelist.forEach(item=>{
  if(item.itemListname==Itype)
  {
    itemListarr=item.itemList;
  }
   });    
   printItemTable(Itype,itemListarr); 
}

var services=()=>{
    
    document.querySelector("#home-section").style.display="none";    
    document.querySelector("#menu").style.display="none";    
    document.querySelector("#bill").style.display="none";
    document.querySelector("#about-us").style.display="none";  
 document.querySelector("#services").style.display="block";      
 document.querySelector("#gallery-images").style.display="none";
}

var aboutUs=()=>{
    document.querySelector("#home-section").style.display="none";    
    document.querySelector("#menu").style.display="none";    
    document.querySelector("#bill").style.display="none";
 document.querySelector("#services").style.display="none";
 document.querySelector("#gallery-images").style.display="none";
 document.querySelector("#about-us").style.display="block";  
}
var gallery=()=>{
    document.querySelector("#gallery-images").style.display="block";
    document.querySelector("#home-section").style.display="none";    
    document.querySelector("#menu").style.display="none";    
    document.querySelector("#bill").style.display="none";
 document.querySelector("#services").style.display="none";
 document.querySelector("#about-us").style.display="none"; 
}


