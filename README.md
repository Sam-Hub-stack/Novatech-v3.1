# 💎 NovaTech — Luxury Tech E-Commerce Website

NovaTech is a modern, fully responsive e-commerce website for electronics and accessories.  
It combines **a sleek UI, smooth animations, and a frosted glass luxury design** — creating a premium user experience.

---

## 🚀 Overview
NovaTech allows users to browse, view, and add tech products to a dynamic shopping cart.  
It features **theme toggling (light/dark)**, animated modals, and a persistent **cart drawer** powered by localStorage.

> **Goal:** Deliver a minimalist yet elegant store experience — where style meets power.

---

## ✨ Features
- 🛍️ **Product Categories** (Smartphones, Sound Systems, Accessories, etc.)
- 🧊 **Cart Drawer** (fade + slide animation, frosted glass design)
- 💾 **Persistent Cart** (items saved via localStorage)
- 🔄 **Add / Remove / Clear Cart** buttons
- 🌗 **Light & Dark Theme** with smooth 1-second transitions
- ⚙️ **Dynamic Navbar** with icons and toggle animations
- 📱 **Fully Responsive Design** for all devices
- 📍 **Embedded Google Map** (store location)
- ⚡ **Luxury Feel:** subtle shadows, animations, and glassmorphism

---

## 🧠 Technologies Used
| Category | Tools / Libraries |
|-----------|-------------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **UI Framework** | Pure CSS (custom grid/flex) |
| **Icons** | Font Awesome |
| **Fonts** | Poppins (Google Fonts) |
| **Storage** | localStorage API |
| **Hosting** | GitHub Pages |

---

## 🎨 Design Language
| Element | Style |
|----------|-------|
| **Primary Accent** | Teal Blue (`#00bcd4`) |
| **Background** | White / Charcoal Black |
| **Transitions** | Smooth fade & slide (1s) |
| **Shadows** | Soft, layered for luxury effect |
| **Frosted Glass** | Backdrop blur for cart drawer & modals |

---

## 🧩 Folder Structure
novatech-store/
│
├── index.html # Main landing page
├── main.css # Stylesheet (responsive + animations)
├── main.js # Core functionality (cart, toggle, modals)
│
├── /images # Product images (placeholder assets)
│ ├── smartphones/
│ ├── speakers/
│ ├── accessories/
│
└── README.md # Project documentation

markdown
Copy code

---

## 👨‍💻 Developer Guide

### 🔹 Core JavaScript Functions

| Function | Description |
|-----------|-------------|
| `addToCart(item)` | Adds a product to cart and updates localStorage. |
| `removeItem(index)` | Removes a specific product from the cart. |
| `clearCart()` | Clears all items and resets localStorage. |
| `toggleTheme()` | Switches between light and dark themes (1s fade). |
| `toggleCartDrawer()` | Opens or closes the cart drawer (slide + blur). |
| `updateCartUI()` | Renders all current cart items dynamically. |

### 🧱 Components

- **Product Cards:** Display image, name, price, and “Add to Cart” button.  
- **Cart Drawer:** Frosted glass panel sliding from the right.  
- **Theme Toggle:** Sun/Moon icons that animate on click.  
- **Toast Notifications:** Top-right alerts for add/remove/clear cart.  

### ⚠️ Known Limitations
- Cart does not sync across multiple tabs.  
- No backend API (demo uses localStorage).  
- Placeholder images used (unsplash.com, picsum.photos).

---

## 🧭 User Guide

### 🛒 Shopping
1. Browse through product categories.  
2. Click any **product card** to view more details in a modal.  
3. Click **🛒 Add to Cart** to add the product.  
4. Click the **cart icon** (top-right) to open your cart drawer.  
5. Use:
   - **🗑️ Remove** → Delete a single item  
   - **🧹 Clear Cart** → Empty everything  

### 🌗 Theme
- Click the **☀️ / 🌙 icon** to toggle between light and dark mode.  
- The transition is smooth (1 second), with icon rotation.  

### 📍 Contact
- Visit our store or view our embedded Google Map.  
- Email: `support@novatech.com`  
- Phone: `+254 794 247 366`  

---

## ⚙️ Setup & Deployment

### Local Setup
1. Clone or download this repository:
   ```bash
   git clone https://github.com/Sam-Hub-stack/Novatech-v3.1
Open the folder:

bash
Copy code
cd novatech-store
Run locally:

Simply open index.html in your browser.
(No server needed — fully front-end.)

Deploy on GitHub Pages
Go to Repository → Settings → Pages

Under Source, select:

css
Copy code
Deploy from branch → main → /root
Save → Wait a few seconds → Your live site link will appear:

arduino
Copy code
https://sam-hub-stack.github.io/Novatech-v3.1/
🧾 License
This project is licensed under the MIT License — you’re free to use, modify, and distribute with credit.

👨‍💻 Author
Developed by: Mbere (🇰🇪 Kenya)
Role: Front-End Web Developer & Designer
Version: v3.3 – Luxury Interactive Edition
GitHub: github.com/yourusername

“Where Style Meets Power.”

yaml
Copy code

---

### ✅ Next Steps (How to Upload to GitHub)
1. Copy this entire block into a file named **`README.md`**  
2. Save it in your **project’s root folder** (same place as your HTML & JS).  
3. Then open your terminal inside that folder and run:
   ```bash
   git add README.md
   git commit -m "Added full project documentation"
   git push
Refresh your GitHub repo — the documentation will appear beautifully at the bottom of your page.
