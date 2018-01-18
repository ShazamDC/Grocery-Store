class item{
    constructor(id,name,desc, price,url,seller,quantity,rating){
        this.id = id;  // Instance Var = Local Var
        this.name=name;
        this.desc =desc;
        this.price=price;
        this.url = url;
        this.seller= seller;
        this.quantity=quantity;  
        this.rating=rating;
        this.markForSell = 0;
         
    }
   toggle(){
       this.markForSell = this.markForSell+1;
       this.quantity=this.quantity-1;
   }


}