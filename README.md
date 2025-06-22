# Portfolio API with Creative Works Rating System

A modern portfolio API with interactive creative works featuring star ratings, likes, and view tracking.

## 🌟 Features

### Creative Works with Interactive Elements
- **5-Star Rating System**: Click on yellow stars to rate creative works (1-5 stars)
- **Like System**: Like creative works to show appreciation
- **View Tracking**: Automatic view counting when works are viewed
- **Real-time Updates**: All interactions update immediately
- **Sorting Options**: Sort by rating, likes, views, title, year, or creation date
- **Filtering**: Filter by type and featured status
- **Pagination**: Browse through multiple pages of creative works

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Access the Application
- **API Base URL**: `http://localhost:5000/api`
- **Creative Works Page**: `http://localhost:5000/creative-works`

## 📡 API Endpoints

### Creative Works
- `GET /api/creative` - Get all creative works with filtering and pagination
- `GET /api/creative/:id` - Get specific creative work (increments views)
- `POST /api/creative/:id/rate` - Rate a creative work (1-5 stars)
- `POST /api/creative/:id/like` - Like/unlike a creative work
- `POST /api/creative` - Create new creative work
- `PUT /api/creative/:id` - Update creative work
- `DELETE /api/creative/:id` - Delete creative work

### Query Parameters
- `type` - Filter by type (digital-art, branding, photography, etc.)
- `featured` - Filter by featured status (true/false)
- `sort` - Sort by (rating, likes, views, title, year, createdAt)
- `page` - Page number for pagination
- `limit` - Items per page (max 50)

## 🎨 Creative Works Types
- Digital Art
- Branding
- Photography
- Illustration
- Web Design
- Animation

## 💫 Interactive Features

### Star Rating System
- Click on any of the 5 yellow stars to rate a creative work
- Ratings are averaged and displayed with total number of ratings
- Stars show filled (★) or empty (☆) based on current rating

### Like System
- Click the "❤️ Like" button to like a creative work
- Like count is displayed and updated in real-time

### View Tracking
- Views are automatically incremented when viewing work details
- View count is displayed for each creative work

### Sorting and Filtering
- **Sort by**: Newest, Highest Rated, Most Liked, Most Viewed, Title A-Z, Year
- **Filter by**: Type, Featured status
- **Pagination**: Navigate through multiple pages

## 🎯 Example Usage

### Rate a Creative Work
```bash
curl -X POST http://localhost:5000/api/creative/[work-id]/rate \
  -H "Content-Type: application/json" \
  -d '{"rating": 5}'
```

### Like a Creative Work
```bash
curl -X POST http://localhost:5000/api/creative/[work-id]/like \
  -H "Content-Type: application/json"
```

### Get Creative Works Sorted by Rating
```bash
curl "http://localhost:5000/api/creative?sort=rating&limit=5"
```

## 🎨 Frontend Features

The creative works page includes:
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Beautiful gradient background with glass-morphism effects
- **Interactive Cards**: Hover effects and smooth animations
- **Real-time Updates**: All interactions update without page refresh
- **Filter Controls**: Easy-to-use dropdown filters
- **Pagination**: Smooth navigation between pages

## 🔧 Technical Details

### Data Structure
Each creative work includes:
```javascript
{
  id: "uuid",
  title: "Work Title",
  type: "digital-art",
  description: "Work description",
  images: ["image-urls"],
  technologies: ["tech-stack"],
  year: 2023,
  featured: true,
  rating: 4.5,
  totalRatings: 20,
  likes: 45,
  views: 156,
  createdAt: "2023-12-01T00:00:00.000Z"
}
```

### Rating Algorithm
- Ratings are averaged: `(current_rating * total_ratings + new_rating) / (total_ratings + 1)`
- Total ratings count is incremented with each new rating
- Average rating is displayed with one decimal place

## 🌟 Star Rating Display
- **Filled Stars (★)**: Show the current rating
- **Empty Stars (☆)**: Show remaining stars to reach 5
- **Hover Effect**: Stars highlight on hover
- **Click to Rate**: Click any star to submit a rating

## 📊 Statistics Display
Each creative work card shows:
- **👁️ Views**: Total number of views
- **❤️ Likes**: Total number of likes
- **⭐ Rating**: Average rating with total ratings count

## 🎯 Future Enhancements
- User authentication for personalized ratings
- Comment system
- Social sharing
- Advanced analytics
- Admin dashboard for managing works

## 📝 License
This project is open source and available under the MIT License. 