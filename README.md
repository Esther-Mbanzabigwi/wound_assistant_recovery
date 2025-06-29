# Wound Assistant Recovery App

An AI-powered wound monitoring and recovery tracking application built with React Native and Expo.

## Features

### No Authentication Required

- **Home Page** - Landing page with app overview and features
- **Onboarding/Login** - User registration and authentication with optional social auth and OTP

### Authentication Required

- **Dashboard** - Track recovery progress, show insights and statistics
- **Capture Wound Photo** - Open camera or gallery for wound documentation
- **Wound History** - Past photos and AI predictions in timeline format
- **Recommendation/Alert Page** - Infection detection alerts with medical guidance
- **Nearby Hospitals** - Find medical facilities based on geolocation

## App Structure

```
app/
├── _layout.tsx                 # Root layout with auth provider
├── (auth)/                     # Authentication screens
│   ├── _layout.tsx            # Auth navigation layout
│   ├── home.tsx               # Public home page
│   ├── index.tsx              # Welcome/onboarding
│   ├── login.tsx              # Sign in screen
│   ├── register.tsx           # Sign up screen
│   └── otp.tsx                # OTP verification
├── (app)/                      # Authenticated app screens
│   ├── _layout.tsx            # Tab navigation layout
│   ├── dashboard.tsx          # Main dashboard
│   ├── capture.tsx            # Photo capture
│   ├── history.tsx            # Wound history
│   ├── hospitals.tsx          # Nearby hospitals
│   └── alert.tsx              # Infection alerts
└── +not-found.tsx             # 404 page

contexts/
└── AuthContext.tsx            # Authentication state management

components/
├── AuthGuard.tsx              # Navigation guard
└── ...                        # Other UI components
```

## Key Features

### 🔐 Authentication System

- Email/password authentication
- Social authentication (Google, Apple) - placeholder
- OTP verification - placeholder
- Persistent login state with AsyncStorage

### 📸 Photo Capture & Analysis

- Camera integration for wound photos
- Gallery selection for existing photos
- AI analysis simulation (placeholder for real ML integration)
- Photo tips and best practices

### 📊 Progress Tracking

- Visual progress indicators
- Timeline of wound photos
- Recovery statistics and insights
- Historical comparison views

### ⚠️ Alert System

- Infection detection alerts
- Severity-based notifications
- Immediate action recommendations
- Emergency contact integration

### 🏥 Medical Resources

- Nearby hospital finder
- Emergency services integration
- Healthcare provider contact
- Medical facility ratings and specialties

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd wound_assistant_recovery
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your preferred platform:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: React Context API
- **Storage**: AsyncStorage for local data
- **UI**: Native components with custom styling
- **Icons**: Expo Vector Icons
- **TypeScript**: Full type safety

## Development Notes

### Authentication Flow

The app uses a custom authentication context that manages user state. The `AuthGuard` component handles navigation between authenticated and non-authenticated states.

### Mock Data

Currently, the app uses mock data for demonstration purposes. In a production environment, you would:

- Integrate with a real backend API
- Implement actual AI/ML models for wound analysis
- Add real camera and image processing capabilities
- Integrate with healthcare provider systems

### Camera Integration

The camera functionality is currently a placeholder. To implement real camera features, you would need to:

- Add `expo-camera` for camera access
- Add `expo-image-picker` for gallery selection
- Implement image processing and upload to backend

### AI Analysis

The AI analysis is simulated. For real implementation:

- Integrate with ML models (TensorFlow, PyTorch, etc.)
- Add image preprocessing
- Implement real-time analysis
- Add confidence scoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This application is for educational and demonstration purposes. It is not intended to replace professional medical advice. Always consult with healthcare providers for proper wound care and medical treatment.
