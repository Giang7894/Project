<script>
import BookList from "@/components/book/BookList.vue"
import BookService from "@/services/book.service";
import publisherService from "@/services/publisher.service";

export default {
    components: {
        BookList,
    },
    data() {
        return {
            books: [],
            pubs:[],
            searchText: '',
        };
    },
    watch: {
        
    },
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const { name,author } = book;
                return [name,author].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) => this.bookStrings[index].toLowerCase().includes(this.searchText.toLowerCase()));
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
        pub() {
            return this.pubs;
        }
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
                this.pubs = await publisherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveBooks();
        },

        async gotoAddBook() {
            this.$router.push({ name: "book.add" });
        },
    },
    mounted() {
        this.refreshList();
    }
}
</script>

<template>
    <form action="#" class="searchform order-sm-start order-lg-last">
        <div class="form-group d-flex">
            <input type="text" class="form-control pl-3" placeholder="Search" v-model="this.searchText">
        </div>
    </form>
    <h1 class="text-center">BOOK</h1>
    <a type="button" class="btn btn-primary mb-5" @click="gotoAddBook">Add new book</a>
    <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" :pubs="pub" />
    <p v-else>No book what so ever</p>
</template>


<style>
.page {
    text-align: left;
    max-width: 750px;
}
</style>