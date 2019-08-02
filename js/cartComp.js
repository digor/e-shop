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
  						<p class="product-price"> {{ cartItem.quantity * cartItem.price }}</p>
  						<button class="del-btn" :data-id=" cartItem.id_product">&times;</button>
  					</div>
  				</div>`
}

let cart = {
    props: [],
    data () {
        return {

        }
    },
    methods: {

    },
    template: `
        
    `,
    components: {
        'cart-item': cartItem
    },
    mounted () {
        this.$parent.getJSON(`${API_URL + this.catalogUrl}`)
            .then (data => {
                for (let el of data) {
                    this.products.push (el)
                    this.filtered.push (el)
                }
            })
    }
}