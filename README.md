# Retail Catalog 

A full-stack TypeScript project with an Express backend and React frontend. Allows searching, browsing, and viewing product details from a mock catalog.

---

## 🧩 Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, TypeScript, Vite
- **Search**: Fuzzy & partial matching with Damerau–Levenshtein
- **Dev Workflow**: `concurrently` for running frontend and backend from the root folder

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### 🧱 Setup

```bash
# Install root dev tools
npm install

# Install backend & frontend deps
cd backend && npm install
cd ../frontend && npm install
cd ..

# Development
npm run dev
```
Backend runs on http://localhost:5000
Frontend runs on http://localhost:5173 by default

### 🔁 Available Scripts
| Script                   | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `npm run server`  | Starts backend server with hot-reload |
| `npm run client` | Starts React (Vite) dev server                  |
| `npm run dev`            | Runs both concurrently                            |

### 💡 Usage
- Browse: View paginated products on the Home page.

- Search: Fuzzy, partial, typo-tolerant search via a _Damerau–Levenshtein distance_ based algorithm.

- Details: Click a product to view extended information. 

- Assets: Includes fallback/default images.

The mock products are loaded on start and are found in the backend/src/data folder. In the Product Detail View, a default image is used as a fallback. Feel free to replace the mock data with data pointing to a real imageUrl. This will be displayed in the Detail View when available.

### 🧪 Testing & Data
- In-Memory Data: Backend serves a mock JSON catalog.

- Products Endpoint:

  - ``` /v1/api/products?page=&limit= ```

- Search Endpoint:

  - ``` /v1/api/search?name= returns { count, results: [{ product, score }, ...] } ```

### 🔧 Configuration
-  Adjust maxDistance for search fuzziness

- Add more mock products by editing ``` backend/src/data/products.json```