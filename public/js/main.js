let containers = {
    products:".featured-content"  

};
// let cart = document.querySelector(".cart");


class List {
        constructor(url, container){
            this.container = container;
            this.url = url;
            this.goods = [];
            this.allProducts = [];
            this.filtered = [];            
            this._init();
            
        }
        getJson(url=this.url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        }

        postJson(url,data){
            return fetch (url,{
                method: "POST",
                headers: {
                             "Content-Type": "application/json"
                            },
                body: JSON.stringify(data)
                        })
                        .then(result=>result.json())
                        .catch(err=>{
                            console.log(err)
                        })
             }
    
        putJson(url,data){
            return fetch(url,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result=>result.json())
                .catch(err=>{
                    console.log(err)
                })
        }
        
        
        deleteJson(url,data){
                return fetch(url,{
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(data)
                })
                    .then(result=>result.json())
                    .catch(err=>{
                        console.log(err)
                    })
        }

        
        handleData(data){
            
            this.goods = data;            
            this.render();
        }
        render(){            
            const block = document.querySelector(this.container);
            console.log(this.goods);
            block.innerHTML = "";            
            for (let product of this.goods){                              
                const productObj = new list[this.constructor.name](product);
                                
                this.allProducts.push(productObj);
                block.insertAdjacentHTML('beforeend', productObj.render());
            }
            console.log(this.allProducts);
        }
        filter(value){
            const regexp = new RegExp(value, 'i');
            this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
            this.allProducts.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if(!this.filtered.includes(el)){
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
        }
        _init(){
            return false
        }
    }




    class Item {
        constructor(el){
            this.id = el.id;
            this.name = el.name;
            this.description = el.description;
            this.price = el.price; 
            this.imgPath = el.img;
                    
            }


       

        render(){
            
            return `<div data-id="${this.id}" class="featured-content__card">
            <div class="card-content">
                <div class="img-wrapper">
                    <img src="${this.imgPath}" title="${this.name}" alt="${this.name}">

                    <div class="card-layout">
                        <button class="card-layout__btn"> 
                            <p class="btn-text" data-id="${this.id}" data-name="${this.name}" data-price="${this.price}" data-img="${this.imgPath}" >Add to Cart</p>
                        </button>
                </div>	
                    
                </div>						
            
            
                <div class="card-content__info">
                    <h4>${this.name}</h4>
                    <p>${this.description}</p>
                    <span class="colored-title">$${this.price}</span>
                </div>

            </div>
                
        </div>`         
               
    
        }
    }
 



class ProductsList extends List {
    constructor(cart, url = '/api/products/',container = containers.products){
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }
    _init(){      
             
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('btn-text')){              
                this.cart.addProduct(e.target);
            }
        });
    //     // document.querySelector('.search-form').addEventListener('submit', e => {
    //     //     e.preventDefault();
    //     //     this.filter(document.querySelector('.search-field').value);
    //     // })
    // }
}

}



class Cart extends List{
    constructor(url = '/api/cart/', postURL= '/api/cart/add',putURL='/api/cart/update', deleteURL='/api/cart/delete', container = '.item-cart__counter'){
        super(url, container);
        this.postURL = postURL;
        this.putURL = putURL;
        this.deleteURL = deleteURL;
        this.getJson()
            .then(data => this.handleData(data));
    }

   
          

    addProduct(element){
        console.log("element");
        
        let itemToAdd={
            "id":element.dataset['id'],
            "name":element.dataset['name'],
            "price":element.dataset['price'],
            "img":element.dataset['img'],
            "quantity":1
        }

        if(this.goods.contents.find(el=> +el.id === +itemToAdd.id)){
            this.putJson(this.putURL,itemToAdd)
                .then(data=>this.handleData(data))
        }else{
            console.log(itemToAdd)
            this.postJson(this.postURL,itemToAdd)
            .then(data=>this.handleData(data))
        }
        }

    deleteProduct(element){

        let itemToDelete = {
            "id": element.dataset['id']
        }

        this.deleteJson(this.deleteURL,itemToDelete)
                    .then(data=>this.handleData(data))

    }
    
    

    render(){            
        const block = document.querySelector(this.container);
        console.log(this.goods.countGoods);                  
        block.textContent = this.goods.countGoods;        
      
    }
       
        
            // .then(data => {
            //     if(data.result === 1){
            //         let productId = +element.dataset['id'];
            //         let find = this.allProducts.find(product => product.id_product === productId);
            //         if(find){
            //             find.quantity++;
            //             this._updateCart(find);
            //         } else {
            //             let product = {
            //                 id_product: productId,
            //                 price: +element.dataset['price'],
            //                 product_name: element.dataset['name'],
            //                 quantity: 1
            //             };
            //             this.goods = [product];
            //             this.render();
            //         }
            //     } else {
            //         alert('Error')
            //     }
            // })
    
    // removeProduct(element){
    //     this.getJson(`${API}/deleteFromBasket.json`)
    //         .then(data => {
    //             if(data.result === 1){
    //                 let productId = +element.dataset['id'];
    //                 let find = this.allProducts.find(product => product.id_product === productId);
    //                 if(find.quantity > 1){
    //                     find.quantity--;
    //                     this._updateCart(find);
    //                 } else {
    //                     this.allProducts.splice(this.allProducts.indexOf(find), 1);
    //                     document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
    //                 }
    //             } else {
    //                 alert('Error')
    //             }
    //         })
    // }
    // _updateCart(product){
    //     const block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    //     block.querySelector(`.product-quantity`).textContent = `Quantity: ${product.quantity}`;
    //     block.querySelector(`.product-price`).textContent = `$${product.quantity*product.price}`;
    // }
    // _init(){
    //     document.querySelector(this.container).addEventListener('click', e => {
    //         if(e.target.classList.contains('del-btn')){
    //             this.deleteProduct(e.target);
    //         }
    //     });
    //     // document.querySelector('.btn-cart').addEventListener('click', () => {
    //     //     document.querySelector(this.container).classList.toggle('invisible')
    //     // })
    // }
}
//
// class CartItem extends Item{
//     constructor(el){
//         super(el);
//         this.quantity = 1;
//     }
//     render(){
//         return `<div class="cart-item" data-id="${this.id}">
//     <div class="product">
        
//         <div class="product-desc">
//             <div class="product-img">
//             <img src="${this.imgPath}" alt="${this.name}">
//             </div>
//             <p class="product-title">${this.name}</p>
//             <p class="product-title">${this.price}</p>

//             <p class="product-quantity">Quantity: ${this.quantity}</p>
            
//         </div>
//     </div>
//     <div class="right-block">        
//         <button class="del-btn" data-id="${this.id}">&times;</button>
//     </div>
// </div>`
//     }
// }



const list = {
    ProductsList: Item,
    // Cart: CartItem
};
const cart = new Cart();
const products = new ProductsList(cart);













