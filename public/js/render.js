let testbox = document.querySelector(".testbox");

fetch('/api/cart/')
    .then(data=>data.json())
    .then(result=>result.contents.forEach(item=>{
        testbox.insertAdjacentHTML("beforeend",`<div data-id="${item.id}" class="featured-content__card">
        <div class="card-content">
            <div class="img-wrapper">
                <img src="${item.imgPath}" title="${item.name}" alt="${item.name}">

                <div class="card-layout">
                    <button class="card-layout__btn"> 
                        <p class="btn-text" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-img="${item.imgPath}" >Add to Cart</p>
                    </button>
            </div>	
                
            </div>						
        
        
            <div class="card-content__info">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <span class="colored-title">$${item.price}</span>
            </div>

        </div>
            
    </div>`        )
    }))