class itemList{

constructor(itemListname)
{
    this.itemListname=itemListname;
    this.itemList=[];    
}
updateObj(Iid)
{
this.itemList.forEach(itemO=>{
if(itemO.id==Iid)
{
    itemO.toggle();
}
}) ;   
}
}