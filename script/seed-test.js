"use strict";

const {
  db,
  models: { User, Product, Review, ProductInCart },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!")
  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      email: "cody.123@gmail.com",
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "IAMTHELAW@icloud.com",
    }),
    User.create({
      username: "emma",
      password: "123",
      email: "outoffakeemails@oops.edu",
    }),
  ]);
  const products = await Promise.all([
    Product.create({
      name: "Dr Pepper",
      price: 1.05,
      description: "The elixir of life",
    }),
    Product.create({
      name: "Mango Smoothie",
      price: 5.99,
      description:
        "A sweet treat for you and your pet amphibian. Best served cold!",
    }),
    Product.create({
      name: "Actual Dinosaur Tears",
      price: 420.69,
      description: "Don't ask where I got this from I won't tell you.",
    }),
    Product.create({
      name: "Blue stuff under my sink",
      price: 0.01,
      description: "Wait you aren't seriously considering buying this are you",
    }),
  ]);
  const reviews = await Promise.all([
    Review.create({
      userId: 1,
      productId: 1,
      rating: 5,
      content: "OH MY GOD MY MOUTH CRIES TEARS OF JOY",
    }),
    Review.create({
      userId: 2,
      productId: 2,
      rating: 2,
      content: "I now know what regret tastes like. bad.",
    }),
    Review.create({ userId: 2, productId: 3, rating: 1, content: "hbelp" }),
    Review.create({ userId: 2, productId: 3, rating: 5, content: "I resent the fact that I do not hate this" }),
  ]);

  const cart = await Promise.all([
    ProductInCart.create({userId: 1, productId: 1, quantity: 6}),
    ProductInCart.create({userId: 1, productId: 2, quantity: 1}),
    ProductInCart.create({userId: 1, productId: 4, quantity: 2}),
    ]);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await db.close();
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
