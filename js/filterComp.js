let filterEl = {
    data () {
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" class="search-form" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`,
    methods: {
        filter () {
            let regExp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regExp.test (el.product_name));
        }
    }
};
