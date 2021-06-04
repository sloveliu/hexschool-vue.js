export default {
    template: `
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': !pages.has_pre}">
          <a class="page-link" href="#" @click.prevent="changePage(pages.current_page-1)">Previous</a>
        </li>
        <li v-for="page in pages.total_pages" :key="page" class="page-item">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pages.has_next}">
          <a class="page-link" href="#" @click.prevent="changePage(pages.current_page+1)">Next</a>
        </li>
    </ul>
  </nav>
    `,
    props:{
      pages:{
        type: Object,
        default: {}
      }
    },
    methods:{
      changePage(page){
        this.$emit('get-product-list', page)
      }
    }
}