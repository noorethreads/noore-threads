# Nooré Threads

A premium artisan fashion catalogue website.

This website is designed as a static, fast, and accessible presentation of the Nooré Threads brand. It uses no complex build tools or heavy JavaScript frameworks, ensuring it remains incredibly fast and easy to maintain.

## 📂 Project Structure

```text
├── index.html           # The main webpage structure
├── public/
│   ├── css/
│   │   └── style.css    # All visual styling and layout
│   ├── js/
│   │   ├── products.js  # 👈 Edit this to update your catalogue!
│   │   └── script.js    # The interactive logic (filters, modals)
│   └── images/
│       ├── brand/       # Hero, about, and social images
│       ├── instagram/   # Instagram grid images
│       └── products/    # Product image folders
```

## 🛍️ How to Manage Your Products

All your product information lives in **`public/js/products.js`**. You don't need to touch the HTML or CSS to add new products.

### 1. Add a Product
Open `public/js/products.js`. Copy an existing product block (from `{` to `},`) and paste it into the `products` list. 
Change the `id` to a unique name (e.g., `"new-pink-bag"`).

### 2. Add Product Images
First, create a new folder inside `public/images/products/` matching your product's `id`. Place your images there.
Then, update the `images` list in `products.js`:
```javascript
images: [
    "/images/products/new-pink-bag/01.jpg",
    "/images/products/new-pink-bag/02.jpg"
],
```

### 3. Add Optional Details
You can add or remove details like `dimensions`, `care`, or `colors`. If you don't have this info, just leave it as an empty string `""` or an empty list `[]`. The website will automatically hide empty sections!

### 4. Featured & New Arrivals
- To show a product in the Highlights section: set `featured: true`
- To show the "New" badge and appear in the New Arrivals filter: set `newArrival: true`

## 📸 Updating Brand Images
To update the main images without changing code, simply replace the image files in the `public/images/brand/` and `public/images/instagram/` folders using the exact same filenames (e.g., `hero.jpg`, `about.jpg`).

*Note for best performance: We recommend compressing your images and saving them in WebP or AVIF formats. If you do, update the `.jpg` extensions in `index.html` and `products.js` to match.*

## 💬 Instagram Accounts
To change your Instagram account, open `index.html` and update the `href` links pointing to `https://www.instagram.com/noore.threads`.

## 🚀 How to Deploy

Because this is a pure static website, you can host it anywhere for free! You do not need to run a build step.

**To deploy to Netlify, Vercel, or GitHub Pages:**
1. Upload or push this folder to a GitHub repository.
2. Connect the repository to your chosen host.
3. Your site is live! There's no build command necessary. It serves `index.html` directly from the root.

*Enjoy your beautiful artisan catalogue!*

