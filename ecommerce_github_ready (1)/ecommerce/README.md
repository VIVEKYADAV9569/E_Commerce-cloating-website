# Car Sales E-commerce Website

A modern, responsive car sales e-commerce platform built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- Responsive design that works on all devices
- Real-time car search functionality
- Detailed car listings with images and specifications
- Contact form with backend integration
- User authentication (coming soon)
- Admin dashboard (coming soon)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd car-sales-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/car-sales
PORT=5000
JWT_SECRET=your_jwt_secret
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:5000
```

## Project Structure

```
car-sales-ecommerce/
├── server/
│   ├── models/
│   │   └── Car.js
│   ├── routes/
│   │   ├── cars.js
│   │   ├── users.js
│   │   └── contact.js
│   └── index.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── package.json
└── README.md
```

## API Endpoints

### Cars
- GET `/api/cars` - Get all cars
- GET `/api/cars/:id` - Get single car
- POST `/api/cars` - Create new car
- PATCH `/api/cars/:id` - Update car
- DELETE `/api/cars/:id` - Delete car
- GET `/api/cars/search/:query` - Search cars

### Contact
- POST `/api/contact` - Send contact message

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 