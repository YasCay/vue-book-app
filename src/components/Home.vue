<template>
  <div class="home-container">
    <v-card class="welcome-card">
      <v-card-title>Welcome to the Book Search Platform</v-card-title>
      <v-card-text> This is your go-to place for books and reviews. Start searching now! </v-card-text>
    </v-card>

    <div class="book-flex-container">
      <v-card v-for="book in books" :key="book.title" class="book-card" :to="'/details/' + book.key" router>
        <div class="book-cover">
          <img :src="book.cover" alt="Book Cover" />
        </div>
        <div>
          <v-card-title>{{ book.title }}</v-card-title>
          <v-card-subtitle>{{ book.author }}</v-card-subtitle>
          <v-card-text>{{ book.description }}</v-card-text>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeComponent",
  data() {
    return {
      books: [
        {
          title: "All About Love",
          author: "bell hooks",
          description:
            "O que é o amor, afinal? Será esta uma pergunta tão subjetiva, tão opaca? Para bell hooks, quando pulverizamos...",
          cover: "https://covers.openlibrary.org/b/isbn/9780060959470-L.jpg",
        },
        {
          title: "A Game of Thrones",
          author: "George R. R. Martin",
          description:
            "Here is the first volume in George R. R. Martin’s magnificent cycle of novels that includes A Clash of Kings and A...",
          cover: "https://covers.openlibrary.org/b/isbn/9780553381689-L.jpg",
        },
        {
          title: "Red, White & Royal Blue",
          author: "Casey McQuiston",
          description:
            "When his mother became President of the United States, Alex Claremont-Diaz was promptly cast as the American...",
          cover: "https://covers.openlibrary.org/b/isbn/9781250316776-L.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.welcome-card {
  max-width: 600px;
  width: 100%;
  margin: 20px 0;
}

.book-flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin: 20px 0;
}

.book-card {
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.book-cover img {
  width: 100%;
  height: auto;
}

p {
  margin: 0 16px;
}
</style>
