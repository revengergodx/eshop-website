<template>
  <main class="overflow-hidden ">
    <!--Start Breadcrumb Style2-->
    <section class="breadcrumb-area"
             style="background-image: url(http://localhost:8000/assets/images/inner-pages/breadcum-bg.png);">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="breadcrumb-content text-center wow fadeInUp animated">
              <h2>Cart</h2>
              <div class="breadcrumb-menu">
                <ul>
                  <li><a href="index.html"><i class="flaticon-home pe-2"></i>Home</a></li>
                  <li><i class="flaticon-next"></i></li>
                  <li class="active">Cart</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--End Breadcrumb Style2-->
    <!--Start cart area-->
    <section class="cart-area pt-120 pb-120">
      <div class="container">
        <div class="row wow fadeInUp animated">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div class="cart-table-box">
              <div class="table-outer">
                <table class="cart-table">
                  <thead class="cart-header">
                  <tr>
                    <th class="">Product Name</th>
                    <th class="price">Price</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th class="hide-me"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="product in products">
                    <td>
                      <div class="thumb-box"><a href="shop-details-1.html" class="thumb">
                        <img :src="product.image_url" alt="">
                      </a> <a href="shop-details-1.html" class="title">
                        <h5> {{ product.title }} </h5>
                      </a></div>
                    </td>
                    <td>${{ product.price }}</td>
                    <td>
                      <div style="width: 50px; height: 50px"
                           :style="`background-color: #${product.color[0].hex}`"></div>
                    </td>
                    <td>{{ product.size[0].title }}</td>
                    <td class="qty">
                      <div class="qtySelector text-center">
                        <span @click.prevent="decreaseQty(product)" class="decreaseQty"><i class="flaticon-minus"></i> </span>
                        <input type="number" class="qtyValue" :value="product.qty"/>
                        <span @click.prevent="increaseQty(product)" class="increaseQty"> <i class="flaticon-plus"></i> </span>
                      </div>
                    </td>
                    <td class="sub-total">${{ product.qty * product.price }}</td>
                    <td>
                      <div @click.prevent="removeProduct(product.cart_id)" class="remove"><i class="flaticon-cross"></i>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12">
            <div class="cart-button-box">
              <div class="cart-button-box-right wow fadeInUp animated">
                <router-link :to="{name: 'product.index'}">
                  <button class="btn--primary mt-30"
                          type="submit">Continue Shopping
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-120">
          <div class="col-xl-6 col-lg-7 wow fadeInUp animated">
            <div class="cart-total-box">
              <div class="inner-title">
                <h3>Cart Totals</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt--30">
          <div class="col-xl-6 col-lg-7 wow fadeInUp animated">
            <div class="cart-total-box mt-30">
              <div class="table-outer">
                <table class="cart-table2">
                  <thead class="cart-header clearfix">
                  <tr>
                    <th colspan="1" class="shipping-title">Enter your info to confirm order</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>
                    <div class="row" style="width: 75%;">
                      <input type="text" v-model="first_name" placeholder="First Name">
                      <input type="text" v-model="last_name" placeholder="Last Name">
                      <input type="text" v-model="email" placeholder="Email">
                      <input type="text" v-model="address" placeholder="Address">
                      <input @click.prevent="storeOrder" type="submit" class="btn btn-primary" value="Order">
                    </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-5 wow fadeInUp animated">
            <div class="cart-check-out mt-30">
              <h3>Check Out</h3>
              <ul class="cart-check-out-list">
                <li>
                  <div class="left">
                    <p>Subtotal</p>
                  </div>
                  <div class="right">
                    <p>${{ total_price }}</p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <p>Shipping</p>
                  </div>
                  <div class="right">
                    <p><span>Flat rate:</span> $0</p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <p>Total Price:</p>
                  </div>
                  <div class="right">
                    <p>${{ total_price }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--End cart area-->
  </main>
</template>

<script>
export default {
  name: "Show",

  props: {
    data: Object,
  },

  mounted() {
    this.getCartProducts()
    this.countCartSubtotal()
  },

  data() {
    return {
      products: [],
      total_price: null,
      first_name: '',
      last_name: '',
      email: '',
      address: ''
    }
  },

  methods: {

    storeOrder() {
      this.axios.post('http://localhost:8876/api/orders', {
        'products': this.products,
        'first_name': this.first_name,
        'last_name': this.last_name,
        'email': this.email,
        'address': this.address,
        'total_price': this.total_price,
      }).then(res => {
        if (res.status = 201) {
          alert('Successfully ordered')
        } else {
          alert('Invalid order')
        }
      }).catch(err => {
        console.log(err);
      })
    },

    getCartProducts() {
      this.products = JSON.parse(localStorage.getItem('cart'))
    },

    countCartSubtotal() {
      if (this.products !== null) {
        let sum = 0
        this.products.forEach(productSubtotal => {
          sum += productSubtotal.qty * productSubtotal.price
        })
        this.total_price = sum
      } else {
        this.total_price = null
      }
    },

    decreaseQty(product) {
      if (product.qty === 0) return
      product.qty--
      this.updateCart()
    },

    increaseQty(product) {
      product.qty++
      this.updateCart()
    },

    removeProduct(id) {
      this.products = this.products.filter(product => {
        return product.cart_id !== id
      })
      this.updateCart()
    },

    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.products))
      this.countCartSubtotal()
    }
  }
}
</script>

<style scoped>

</style>