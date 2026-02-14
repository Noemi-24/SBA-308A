# Dog Lovers - The Ultimate Dog Gallery (SBA 308A - ADV JAVASCRIPT)

A single-page web application that allows users to explore different dog breeds from around the world and vote for their favorites using The Dog API.

## 📝 Description

Dog Lovers is an interactive web application built with vanilla JavaScript that demonstrates modern web development practices including asynchronous programming, API integration, and modular code organization. Users can browse through a paginated gallery of dog breeds, view their images, and cast votes for their favorite breeds. The application provides a clean, responsive interface powered by Bootstrap 5 and implements real-time data manipulation through RESTful API calls.

## 🎯 Learning Objectives

This project demonstrates proficiency in the following areas:

- **Asynchronous JavaScript**: Implementation of `async/await` syntax and Promise handling for API communication
- **RESTful API Integration**: Using Axios to perform GET and POST requests to an external API
- **ES6 Modules**: Organizing code into separate modules with proper import/export patterns
- **Event Loop Understanding**: Managing asynchronous operations without race conditions or timing issues
- **DOM Manipulation**: Dynamic rendering of content based on API responses
- **User Experience Design**: Creating an engaging, responsive interface with Bootstrap and custom CSS
- **Event Delegation**: Efficient event handling for dynamically generated content
- **Data Validation**: Implementing input validation before API calls
- **Error Handling**: Graceful error management with try/catch blocks and user feedback

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom styling and layout
- **Bootstrap 5.3.8** - Responsive design framework
- **JavaScript ES6+** - Modern JavaScript features including modules, async/await, and arrow functions
- **Axios** - HTTP client for API requests
- **The Dog API** - External data source for dog breed information
- **Font Awesome 6** - Icon library for UI elements
- **Git** - Version control

## 📁 Project Structure
```
dog-lovers-app/
├── index.html          # Main HTML file with application structure
├── app.js             # Main application logic and event handlers
├── api.js             # API communication module (GET/POST requests)
├── ui.js              # UI helper functions for rendering cards
├── styles.css         # Custom CSS styles
├── README.md          # Project documentation
└── .gitignore         # Git ignore file
```

### File Descriptions

- **`index.html`**: Contains the page structure, Bootstrap grid layout, and pagination controls
- **`app.js`**: Handles application initialization, pagination logic, event delegation for votes, and page rendering
- **`api.js`**: Exports functions for API communication including `getBreeds()` and `createVote()`
- **`ui.js`**: Exports UI helper functions like `createBreedCard()` for modular HTML generation
- **`styles.css`**: Custom styles to enhance Bootstrap's default appearance

## ✨ Features

### Core Features
- **Browse Dog Breeds**: View 200+ dog breeds with high-quality images
- **Paginated Gallery**: Navigate through breeds with Previous/Next buttons (6 breeds per page)
- **Vote System**: Click the thumbs-up button to vote for your favorite breeds
- **Real-time Updates**: Vote counts update instantly in the UI without page refresh
- **Responsive Design**: Mobile-friendly interface that adapts to different screen sizes
- **Error Handling**: User-friendly error messages if API calls fail

### Technical Features
- Modular ES6 code organization
- Asynchronous data fetching with Axios
- RESTful API integration (GET and POST)
- Event delegation for optimal performance
- Data validation before API submission
- Race condition prevention with button state management

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection (for API access and CDN resources)
- A text editor (VS Code, Sublime Text, etc.)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/your-username/dog-lovers-app.git
   cd dog-lovers-app
```

2. **Get an API Key**
   - Visit [The Dog API](https://thedogapi.com)
   - Sign up for a free account
   - Copy your API key

3. **Configure API Key**
   - Open `api.js`
   - Replace the placeholder with your API key:
```javascript
     const API_KEY = 'your_api_key_here';
```

4. **Run the Application**
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server (recommended):
```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
```
   - Navigate to `http://localhost:8000` in your browser


## 🔌 API Endpoints Used

### GET `/breeds`
Retrieves all dog breeds with their information and images.

**Parameters:**
- `limit`: Number of breeds to return (default: 200)
- `order`: Sort order (DESC for newest first)

### POST `/votes`
Submits a vote for a specific dog breed image.

**Request Body:**
```json
{
  "image_id": "string",
  "value": 1
}
```

## 👤 Author

**Noemi Delgadillo Roldan**

- GitHub: [Noemi-24](https://github.com/Noemi-24)




**Built with ❤️ for dog lovers everywhere**
