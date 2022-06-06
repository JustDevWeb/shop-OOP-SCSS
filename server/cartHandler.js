class cartHandler{
    constructor(cartItems,reqBody){

    this.cart = cartItems;
    this.cartItem = reqBody; 
    

    }

    add (cart = this.cart, item = this.cartItem){
        cart.contents.push(item); 
        console.log(cart);       
        return this.modifyCart(cart);       

    }

    update (cart = this.cart, item = this.cartItem){
        let updateItem = cart.contents.find(el=> +el.id === +item.id);
        updateItem.quantity += 1;
        return this.modifyCart(cart);        
    }


    delete (cart = this.cart, item = this.cartItem){
        let deleteItem = cart.contents.find(el=> +el.id === +item.id);
        if(deleteItem > 1){
            deleteItem.quantity-=1;
        }else {
           cart.contents.splice(cartItems.contents.indexOf(findItem),1)
        }
        return this.modifyCart(cart);

    }

    modifyCart(cart){
        cart.countGoods = 0;
        cart.totalSum = 0;
        cart.contents.forEach(elem=>{

            cart.countGoods += elem.quantity;
            cart.totalSum += +elem.price; 

        })

        return cart;
        
    }
    
}

export default cartHandler;