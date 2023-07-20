<template>
  <main class="overflow-hidden ">
    <!--Start Breadcrumb Style2-->
    <div class="breadcrumb-area" style="background-image: url(src/assets/images/inner-pages/breadcum-bg.png);">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="breadcrumb-content pb-60 text-center wow fadeInUp animated">
              <h2>Products</h2>
              <div class="breadcrumb-menu">
                <ul>
                  <li><a href="index.html"><i class="flaticon-home pe-2"></i>Home</a></li>
                  <li><i class="flaticon-next"></i></li>
                  <li class="active">Products</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--End Breadcrumb Style2-->
    <!--Start Product Categories One-->
    <section class="product-categories-one pb-60">
      <div class="container">
        <div class="row wow fadeInUp animated">
          <div class="col-xl-12">
            <div class="product-categories-one__inner">
              <ul>
                <li v-for="category in filterList.categories"><a href="#0" class="img-box">
                  <div class="inner"><img
                      :src="category.category_image"
                      alt=""/></div>
                </a>
                  <div class="title"><a href="#0">
                    <h6>{{ category.title }}</h6>
                  </a></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--End Product Categories One-->
    <!--Start product-grid-->
    <div class="product-grid pt-60 pb-120">
      <div class="container">
        <div class="row gx-4">
          <div class="col-xl-3 col-lg-4">
            <div class="shop-grid-sidebar">
              <button class="remove-sidebar d-lg-none d-block"><i
                  class="flaticon-cross"> </i></button>
              <div class="sidebar-holder">
                <form action="#0" class="footer-default__subscrib-form m-0 p-0 wow fadeInUp animated">
                  <div class="footer-input-box p-0 "><input type="email" placeholder="Email address"
                                                            name="email">
                    <button type="submit" class="subscribe_btn"><i
                        class="flaticon-magnifying-glass"></i></button>
                  </div>
                </form>
                <div class="single-sidebar-box mt-30 wow fadeInUp animated ">
                  <h4>Select Categories</h4>
                  <div class="checkbox-item">
                    <form>
                      <div v-for="category in filterList.categories" class="form-group"><input type="checkbox"
                                                                                               :value="category.id"
                                                                                               v-model="categories"
                                                                                               :id="category.id"> <label
                          :for="category.id">{{ category.title }}</label></div>
                    </form>
                  </div>
                </div>
                <div class="single-sidebar-box mt-30 wow fadeInUp animated ">
                  <h4>Select Sizes</h4>
                  <div class="checkbox-item">
                    <ul class="popular-tag">
                      <li v-for="size in filterList.sizes"><a @click.prevent="addSize(size.id)"
                                                              :class="{'bg-primary': sizes.includes(size.id)}"
                                                              href="#0">{{
                          size.title
                        }}</a></li>
                    </ul>
                  </div>
                </div>
                <div class="single-sidebar-box mt-30 wow fadeInUp animated">
                  <h4>Color Option </h4>
                  <ul class="color-option">
                    <li v-for="color in filterList.colors"><a @click.prevent="addColor(color.id)" href="#0"
                                                              :style="`background:#${color.hex}`"
                                                              class="color-option-single"
                                                              :class="{'rounded-circle': colors.includes(color.id)}">
                      <span> {{ color.name }}</span> </a></li>
                  </ul>
                </div>
                <div class="single-sidebar-box mt-30 wow fadeInUp animated">
                  <h4>Filter By Price</h4>
                  <div class="slider-box">
                    <div id="price-range" class="slider"></div>
                    <div class="output-price"><label for="priceRange">Price:</label> <input
                        type="text" id="priceRange" readonly></div>
                    <button @click.prevent="getProductList" class="filterbtn"
                            type="submit"> Filter
                    </button>
                  </div>
                </div>
                <div class="single-sidebar-box mt-30 wow fadeInUp animated pb-0 border-bottom-0 ">
                  <h4>Tags </h4>
                  <ul class="popular-tag">
                    <li v-for="tag in filterList.tags"><a @click.prevent="addTag(tag.id)"
                                                          :class="{'bg-primary': tags.includes(tag.id)}"
                                                          href="#0">{{ tag.title }}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-8">
            <div class="row">
              <div class="col-xl-12">
                <div
                    class="shop-grid-page-top-info p-0 justify-content-md-between justify-content-center">
                  <div class="left-box wow fadeInUp animated">
                    <p>Showing 1–12 of 50 Results</p>
                  </div>
                  <div
                      class="right-box justify-content-md-between justify-content-center wow fadeInUp animated">
                    <div class="product-view-style d-flex justify-content-md-between justify-content-center">
                      <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button class="nav-link active" id="pills-grid-tab"
                                  data-bs-toggle="pill" data-bs-target="#pills-grid" type="button"
                                  role="tab" aria-selected="true">
                            <i class="flaticon-grid"></i>
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button class="nav-link" id="pills-list-tab" data-bs-toggle="pill"
                                  data-bs-target="#pills-list" type="button" role="tab"
                                  aria-selected="false">
                            <i class="flaticon-list"></i>
                          </button>
                        </li>
                      </ul>
                      <button class="slidebarfilter d-lg-none d-flex"><i class="flaticon-edit"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="tab-content" id="pills-tabContent">
                  <div class="tab-pane fade show active" id="pills-grid" role="tabpanel"
                       aria-labelledby="pills-grid-tab">
                    <div class="row">
                      <div v-for="product in products" class="col-xl-4 col-lg-6 col-6 ">
                        <div class="products-three-single   w-100 ">
                          <div class="products-three-single-img">
                            <a class="d-block">
                              <img :src="product.image_url"
                                   class="first-img" alt=""/>
                              <img src="http://localhost:8000/src/assets/images/home-three/productss3-hover-1.jpg"
                                   alt="" class="hover-img"/>
                            </a>
                            <div class="products-grid-one__badge-box">
                              <span v-if="product.is_new" class="bg_base badge new ">New</span>
                              <span v-if="product.discount" class="bg_black badge discount">-{{
                                  product.discount
                                }}%</span></div>
                            <div class="products-grid__usefull-links">
                              <ul>
                                <li><a href="wishlist.html"> <i class="flaticon-heart">
                                </i> <span>
                                                                            wishlist</span> </a></li>
                              </ul>
                            </div>
                          </div>
                          <div class="products-three-single-content text-center"><span>{{ product.title }}</span>
                            <h5>
                              <router-link :to="{name: 'product.show', params: {id: product.id}}">
                                {{ product.category.title }}
                              </router-link>
                            </h5>
                            <del v-if="product.old_price">${{ product.old_price }}</del>
                            <p>${{ product.price }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="pills-list" role="tabpanel"
                       aria-labelledby="pills-list-tab">
                    <div class="row ">
                      <div v-for="product in products" class="col-12">
                        <div class="product-grid-two list mt-30 ">
                          <div class="product-grid-two__img" style="height: 200px; width: 220px">
                            <a href="shop-details-2.html" class="d-block"> <img
                                :src="product.image_url"
                                class="first-img" alt=""/></a>
                            <div class="products-grid-one__badge-box"> <span
                                class="badge discount">Best</span></div>
                          </div>
                          <div class="product-grid-two-content text-center">
                            <span>{{ product.category.title }}</span>
                            <h5><a href="shop-details-2.html">{{ product.title }} </a></h5>
                            <p>
                              <del v-if="product.old_price">${{ product.old_price }}</del>
                              ${{ product.price }}
                            </p>
                            <p class="text"> {{ product.content }} </p>
                            <div class="product-grid-two__overlay-box">
                              <div class="title">
                                <h6><a href="cart.html">Add To Cart</a></h6>
                              </div>
                              <div class="icon">
                                <ul>
                                  <li><a href="wishlist.html"><i
                                      class="flaticon-heart"></i></a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row" v-if="pagination.last_page > 1">
              <div class="col-12 d-flex justify-content-center wow fadeInUp animated">
                <ul class="pagination text-center">
                  <li class="next" v-if="pagination.current_page !== 1">
                    <a @click.prevent="getProducts(pagination.current_page - 1)" href="#0"><i
                        class="flaticon-left-arrows"
                        aria-hidden="true"></i> </a>
                  </li>
                  <li v-for="link in pagination.links">
                    <template v-if="Number(link.label) &&
                    (pagination.current_page - link.label < 2 &&
                    pagination.current_page - link.label > -2) ||
                    Number(link.label) === 1 || Number(link.label) === pagination.last_page
">
                      <a :class="link.active ? 'active' : ''" @click.prevent="getProducts(link.label)"
                         href="#0">{{ link.label }}</a>
                    </template>
                    <template v-if="Number(link.label) &&
                    pagination.current_page !== 3 &&
                    pagination.current_page - link.label === 2 ||
                    pagination.current_page !== pagination.last_page -2 &&
                    pagination.current_page - link.label === -2
">
                      <a>...</a>
                    </template>
                  </li>
                  <li v-if="pagination.current_page !== pagination.last_page" class="next">
                    <a @click.prevent="getProducts(pagination.current_page + 1)" href="#0"><i class="flaticon-next-1"
                                                                                              aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div> <!--Pagination-->
          </div>
        </div>
      </div>
    </div>
    <!--End product-grid-->
  </main>

</template>

<script>
export default {
  name: "Index",
  mounted() {
    $(document).trigger('changed')
    this.getProducts()
    this.getFilersList()
  },

  data() {
    return {
      products: [],
      filterList: [],
      categories: [],
      colors: [],
      tags: [],
      sizes: [],
      price: [],
      sorting: [],
      pagination: []
    }
  },
  methods: {
    getProductList() {
      let prices = $('#priceRange').val()

      this.prices = prices.replace(/[\s+]|[$]/g, '').split('-')
      this.getProducts()
    },

    addTag(id) {
      if (!this.tags.includes(id)) {
        this.tags.push(id)
      } else {
        this.tags = this.tags.filter(elem => {
          return elem !== id
        })
      }
    },

    addColor(id) {
      if (!this.colors.includes(id)) {
        this.colors.push(id)
      } else {
        this.colors = this.colors.filter(elem => {
          return elem !== id
        })
      }
    },

    addSize(id) {
      if (!this.sizes.includes(id)) {
        this.sizes.push(id)
      } else {
        this.sizes = this.sizes.filter(elem => {
          return elem !== id
        })
      }
    },

    getProducts(page = 1) {
      this.axios.post('http://localhost:8876/api/products', {
        'categories': this.categories,
        'colors': this.colors,
        'tags': this.tags,
        'sizes': this.sizes,
        'prices': this.prices,
        'sorting': this.sorting,
        'page': page,
      }).then(res => {
        // console.log(this.filterList);
        this.products = res.data.data
        this.pagination = res.data.meta
      }).catch(err => {
        console.log(err);
      })
    },

    getFilersList() {
      this.axios.get('http://localhost:8876/api/products/filters')
          .then(res => {
            this.filterList = res.data

            //  Price Filter
            if ($("#price-range").length) {
              $("#price-range").slider({
                range: true,
                min: +this.filterList.price.min,
                max: +this.filterList.price.max,
                values: [this.filterList.price.min, this.filterList.price.max],
                slide: function (event, ui) {
                  $("#priceRange").val("$" + ui.values[0] + " - $" + ui.values[1]);
                }
              });
              $("#priceRange").val("$" + $("#price-range").slider("values", 0) + " - $" + $("#price-range").slider("values", 1));
            }
          }).finally(v => {
        $(document).trigger('changed')
      })
    }
  }
}
</script>

<style scoped>

</style>