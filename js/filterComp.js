let filter = {
    data () {
        return {
        }
    },
    methods: {
        filter () {
            let regExp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regExp.test (el.product_name));
        }
    }
}