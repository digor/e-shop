const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const API = 'https://raw.githubusercontent.com/digor/GB-Online-Store/master/responses';

let app = new Vue ({
    el: '#app',
    data: {
        imgCatalog: image,
        products: [],
        catalogUrl: `/catalogData.json`,
        userSearch: '',
        filtered: []
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (result => result.json ())
                .catch (error => {
                    console.log (error)
                });
        },
        addProduct (product) {
            console.log (product.id_product);
        },
        filter () {
            let regExp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regExp.test (el.product_name));
        }
    },
    mounted () {
        this.getJSON(`${API + this.catalogUrl}`)
            .then (data => {
                for (let el of data) {
                    this.products.push (el);
                    this.filtered.push (el);
                }
            })
    }
})

// //Глобальные сущности
// let userCart = [];
//
// class List {
//     constructor (url, container) {
//         this.container = container;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         //this.filtered = [];
//         this._init ()
//     }
//     _init () {
//         return false
//     }
//     getJSON (url) {
//         return fetch (url ? url : `${API + this.url}`)
//             .then (result => result.json ())
//             .catch (error => {
//                 console.log (error)
//             })
//     }
//     handleData (data) {
//         this.goods = [...data]
//         this.render ()
//     }
//     render () {
//         const block = document.querySelector(this.container)
//
//         for (let product of this.goods) {
//             const prod = new lists [this.constructor.name] (product)
//             this.allProducts.push (prod)
//             block.insertAdjacentHTML('beforeend', prod.render ())
//         }
//     }
// }
//
// class Item {
//     constructor (el, img = image) {
//         this.product_name = el.product_name;
//         this.id_product = el.id_product;
//         this.price = el.price;
//         this.img = img
//     }
//     render () {
//         return `<div class="product-item" data-id="${this.id_product}">
//                          <img src="${this.img}" alt="Some img">
//                          <div class="desc">
//                              <h3>${this.product_name}</h3>
//                              <p>${this.price} $</p>
//                              <button class="buy-btn"
//                               data-id="${this.id_product}"
//                              data-name="${this.product_name}"
//                              data-image="${this.img}"
//                              data-price="${this.price}">Купить</button>
//                          </div>
//                      </div>`
//     }
// }
//
// class ProductItem extends Item {}
//
// class CartItem extends Item {
//     constructor (el, img = cartImage) {
//         super (el, img);
//         this.quantity = el.quantity;
//     }
//     render () {
//         return `<div class="cart-item" data-id="${this.id_product}">
//  					<div class="product-bio">
//  						<img src="${this.img}" alt="Some image">
//  						<div class="product-desc">
//  							<p class="product-title">${this.product_name}</p>
//  							<p class="product-quantity">Quantity: ${this.quantity}</p>
//  							<p class="product-single-price">$${this.price} each</p>
//  						</div>
//  					</div>
//  					<div class="right-block">
//  						<p class="product-price">${this.quantity * this.price}</p>
//  						<button class="del-btn" data-id="${this.id_product}">&times;</button>
//  					</div>
//  				</div>`;
//     }
// }
//
// class ProductsList extends List {
//     constructor (cart, url = '/catalogData.json', container = '.products') {
//         super (url, container);
//         this.cart = cart;
//         this.getJSON()
//             .then (data => this.handleData(data));
//     }
//     _init () {
//         document.querySelector(this.container).addEventListener('click', evt => {
//             if (evt.target.classList.contains('buy-btn')) {
//                 evt.preventDefault();
//                 this.cart.addProduct (evt.target);
//             }
//         })
//     }
// }
//
// class Cart extends List {
//     constructor (url = '/getBasket.json', container = '.cart-block') {
//         super (url, container);
//         this.getJSON()
//             .then (data => this.handleData(data.contents));
//     }
//     addProduct (element) {
//         this.getJSON (`${API}/addToBasket.json`)
//             .then (data => {
//                 if (data.result) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find (product => product.id_product === productId);
//
//                     if (!find) {
//                         let product = {
//                             product_name: element.dataset['name'],
//                             id_product: productId,
//                             price: +element.dataset['price'],
//                             quantity: 1
//                         }
//                         this.goods = [product];
//                         this.render();
//                     } else {
//                         find.quantity++;
//                         this._updateCart(find);
//                     }
//                 } else {
//                     debugger;
//                     console.log ('err');
//                 }
//             })
//     }
//     removeProduct (element) {
//         this.getJSON (`${API}/deleteFromBasket.json`)
//             .then (data => {
//                 if (data.result) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find (product => product.id_product === productId);
//
//                     if (find.quantity > 1) {
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice (this.allProducts.indexOf(find), 1);
//                         document.querySelector (`.cart-item[data-id="${productId}"]`).remove ();
//                     }
//                 } else {
//                     console.log ('err');
//                 }
//             })
//     }
//     _updateCart (product) {
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
//         block.querySelector('.product-price').textContent = `${product.quantity * product.price}`;
//     }
//     _init () {
//         document.querySelector(this.container).addEventListener('click', evt => {
//             if (evt.target.classList.contains('del-btn')) {
//                 this.removeProduct (evt.target);
//             }
//         })
//     }
// }
//
// let lists = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// }
//
// let cart = new Cart ();
// let products = new ProductsList (cart);
//
// document.querySelector ('.btn-cart').addEventListener ('click', () => {
//     document.querySelector ('.cart-block').classList.toggle ('invisible');
// })