# Pokemon Explorer

A React application that allows users to explore Pokemon data using the Pokemon API. This app demonstrates modern React development with TypeScript, routing, and API integration.

## Features

### 🔍 Search View
- **Search Functionality**: Real-time search as you type
- **Sorting Options**: Sort by name, ID, height, or weight (ascending/descending)
- **Pokemon Cards**: Display Pokemon with images, names, and types
- **Responsive Design**: Works on desktop and mobile devices

### 🖼️ Gallery View
- **Visual Gallery**: Browse Pokemon with high-quality artwork
- **Type Filtering**: Filter Pokemon by their types (fire, water, grass, etc.)
- **Select All/Clear All**: Quick filter management
- **Grid Layout**: Responsive grid that adapts to screen size

### 📋 Detail View
- **Comprehensive Information**: View detailed Pokemon stats and abilities
- **Navigation**: Previous/Next buttons to browse through Pokemon
- **URL Routing**: Direct links to specific Pokemon (e.g., `/pokemon/25`)
- **Visual Stats**: Animated stat bars with color coding

## Technical Implementation

### 🛠️ Technologies Used
- **React 19** with TypeScript
- **React Router** for client-side routing
- **Axios** for API calls
- **CSS3** with modern features (Grid, Flexbox, animations)

### 🏗️ Architecture
- **Component-based**: Modular, reusable components
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Graceful fallbacks and loading states
- **API Integration**: Pokemon API with mock data fallback

### 🎨 Design Features
- **Modern UI**: Clean, professional design
- **Responsive**: Mobile-first approach
- **Accessibility**: Semantic HTML and keyboard navigation
- **Animations**: Smooth transitions and hover effects

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm start
```

### Build for Production
```bash
npm run build
```

## API Integration

The app uses the [Pokemon API](https://pokeapi.co/) which is:
- ✅ Free to use
- ✅ No API key required
- ✅ Comprehensive Pokemon data
- ✅ High-quality images

### Fallback Strategy
If the API is unavailable, the app includes mock data to ensure functionality continues.

## Project Structure

```
src/
├── components/          # React components
│   ├── PokemonList.tsx     # Search and list view
│   ├── PokemonGallery.tsx  # Gallery view with filtering
│   ├── PokemonDetail.tsx   # Detailed Pokemon view
│   └── *.css              # Component styles
├── services/           # API integration
│   └── pokemonApi.ts      # Pokemon API calls
├── types/             # TypeScript definitions
│   └── pokemon.ts         # Pokemon data interfaces
├── App.tsx            # Main app component with routing
└── index.tsx          # App entry point
```

## Features Demonstrated

### ✅ Requirements Met
- [x] **List View**: Search with real-time filtering and sorting
- [x] **Gallery View**: Visual gallery with type filtering
- [x] **Detail View**: Comprehensive Pokemon information with navigation
- [x] **React Router**: Client-side routing with URL parameters
- [x] **Axios**: HTTP requests for API integration
- [x] **TypeScript**: Full type safety throughout the application

### 🎯 Additional Features
- **Responsive Design**: Works on all device sizes
- **Loading States**: User feedback during API calls
- **Error Handling**: Graceful error management
- **Modern UI**: Professional, accessible design
- **Performance**: Optimized rendering and API calls

## Deployment

The app is configured for GitHub Pages deployment with the correct basename (`/mp2`) for routing to work properly.

## License

This project is for educational purposes as part of CS409 coursework.