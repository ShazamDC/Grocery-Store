const itemoperations={
itemtypelist:[],
add(itemObject){
    this.itemtypelist.push(itemObject);
},update(Iid,Itype){
  this.itemtypelist.forEach(item => {
    if(item.itemListname==Itype)
    {
      item.updateObj(Iid);  
    }    
   }); 
}
}