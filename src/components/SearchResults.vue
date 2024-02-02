<template>
  <div class="search-container">
    <v-text-field
      class="search-input"
      v-model="searchQuery"
      label="Search for Book"
      @keyup.enter="search"
      append-icon="mdi-magnify"
      @click:append="search"
      filled
      clearable
    ></v-text-field>

    <div v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else class="books-container">
      <div v-for="book in books" :key="book.key" class="book-card" @click="goToBookDetails(book.key)">
        <div v-if="book.cover_i" class="book-cover">
          <img :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`" alt="Book Cover" />
        </div>
        <div class="book-content">
          <h3>{{ book.title }}</h3>
          <h4>{{ book.author_name?.join(", ") }}</h4>
          <p>{{ book.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchBooks } from "../services/BookService";

export default {
  name: "SearchResults",
  data() {
    return {
      searchQuery: "",
      books: [],
      isLoading: false,
    };
  },
  methods: {
    async search() {
      if (!this.searchQuery) return;
      this.isLoading = true;
      try {
        this.books = await searchBooks(this.searchQuery);
      } catch (error) {
        console.error("Fehler beim Laden der Suchergebnisse", error);
      } finally {
        this.isLoading = false;
      }
    },
    goToBookDetails(key) {
      this.$router.push(`/details/${key.split('/').pop()}`);
    }
  },
};
</script>


<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.search-input {
  width: 100%;
  max-width: 600px;
}

.books-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.book-card {
  display: flex;
  cursor: pointer;
  width: 100%;
  max-width: 800px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #424242;
}

.book-cover img {
  width: 150px;
  height: 100%;
}

.book-content {
  padding: 10px;
}
</style>
