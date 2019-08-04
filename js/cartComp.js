let cartItem = {
    props: ['cartItem', 'img'],
    templates:`<div class="cart-item">
  					<div class="product-bio">
  						<img :src="img" alt="Smile product image">
  						<div class="product-desc">
  							<p class="product-title">{{ cartItem.product_name }}</p>
  							<p class="product-quantity">Quantity: {{ cartItem.quantity }}</p>
  							<p class="product-single-price">$ {{ cartItem.price }} each</p>
  						</div>
  					</div>
  					<div class="right-block">
  						<p class="product-price">{{ cartItem.quantity * cartItem.price }}</p>
  						<button @click="$parent.removeProduct (cartItem)" 
  						class="del-btn" 
  						:data-id="cartItem.id_product">&times;</button>
  					</div>
  				</div>`
}

let cart = {
    props: [],
    data () {
        return {
            cartItems: [],
            imgCart: 'https://placehold.it/100x80',
            cartUrl: `/getBasket.json`,
            showCart: false
        }
    },
    methods: {
        addProduct (product) {
            this.$parent.getJSON (`${API}/addToBasket.json`)
                .then (data => {
                    if (data.result) {

                        //console.log(product);
                        let find = this.cartItems.find (el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                            console.log(`find`);
                        } else {
                            let prod = Object.assign ({quantity: 1, product});
                            this.cartItems.push (product);
                            console.log(`add new prod`);
                            console.log(product);
                        }
                    }
                })
        },
        removeProduct (product) {
            this.$parent.getJSON (`${API}/deleteFromBasket.json`)
                .then (data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--;
                        } else {
                            this.cartItems.splice (this.cartItems.indexOf(product), 1);
                        }
                    }
                })
        }
    },
    template: `<div>
                    <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                    <div class="cart-block" v-show="showCart">
                        <cart-item
                        v-for="product of cartItems"
                        :key="product.id_product"
                        :img="imgCart"
                        :cartItem="product"
                        ></cart-item>
                        </div>
                </div>`,
    components: {
        'cart-item': cartItem
    },
    mounted () {
        this.$parent.getJSON(`${API + this.cartUrl}`)
            .then (data => {
                for (let el of data.contents) {
                    this.cartItems.push (el);
                }
            })
    }
}