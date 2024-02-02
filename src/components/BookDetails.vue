<template>
  <div v-if="isLoading" class="loading-spinner">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else-if="book" class="book-detail-card">
    <div v-if="book.covers?.[0]">
      <img
        :src="'https://covers.openlibrary.org/b/id/' + book.covers[0] + '-L.jpg'"
        :alt="book.title + ' Cover'"
        class="book-cover"
      />
    </div>

    <div class="book-details">
      <h1>{{ book.title }}</h1>
      <h2 v-if="authors.length > 0">
        <strong>Authors:</strong> {{ authors.join(", ") }}
      </h2>
      <p v-if="book.created">
        <strong>Created:</strong> {{ formatDate(book.created.value) }}
      </p>
      <p>
        <strong>Last Modified:</strong> {{ formatDate(book.last_modified.value) }}
      </p>
      <p v-if="book.description">
        <strong>Description:</strong> {{ book.description.value }}
      </p>
    </div>
  </div>
</template>

<script>
import { getBookDetails } from "@/services/BookService";
import { getAuthorDetails } from "@/services/BookService";

export default {
  name: "BookDetails",
  data() {
    return {
      book: null,
      authors: [],
      isLoading: false,
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString("en-US", options);
    }
  },
  computed: {
    coverImageUrl() {
      return this.book && this.book.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${this.book.covers[0]}-L.jpg`
        : "";
    },
  },
  async created() {
  this.isLoading = true;
  try {
    let bookId = this.$route.params.id;
    if (!bookId.startsWith('/')) {
      bookId = '/' + bookId;
    }
    console.log("Angepasste Book ID:", bookId); // Debugging
    this.book = await getBookDetails(bookId);
    if (this.book && this.book.authors) {
      this.authors = await Promise.all(
        this.book.authors.map(async (authorRef) => {
          const authorDetails = await getAuthorDetails(authorRef.author.key.replace('/authors/', ''));
          return authorDetails.name;
        })
      );
    }
  } catch (error) {
    console.error("Fehler beim Laden der Buchdetails", error);
  } finally {
    this.isLoading = false;
  }
}

};
</script>

<style scoped>
.book-detail-card {
  display: flex;
  margin: 20px;
  background-color: #424242;
  border-radius: 5px;
}

.book-details {
  padding: 20px 0;
}

.book-cover {
  width: 300px;
  height: 100%;
  margin-right: 20px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>