# Timezoner

**Legal:** <br />
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) <br />
**Dev Stack:** <br />
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) <br />
**Server Stack:** <br />
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) [![Netlify Status](https://api.netlify.com/api/v1/badges/d51b9212-40aa-45c3-8a50-b4a9d25315c0/deploy-status)](https://app.netlify.com/sites/tymzone/deploys)

A beautiful and intuitive timezone comparison tool built with React, TypeScript, and Vite. Simplify coordination across global teams and never miss a meeting due to timezone confusion again.

## 🌟 Features

- **Visual Comparison**: Compare multiple timezones side by side with an intuitive timeline interface
- **Timezone Groups**: Create and manage timezone collections for different teams or projects
- **Shareable Links**: Generate compact URLs to share your exact timezone configuration
- **Interactive Timeline**: Beautiful visualization that makes finding overlapping hours easy
- **Dark/Light Themes**: Comfortable viewing in any lighting condition
- **Internationalization**: Support for 40+ languages with automatic detection
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Offline Support**: Use the app even without an internet connection
- **Privacy-Focused**: No account required, no data collection

## 📋 Overview

Timezoner is a modern web application designed to simplify timezone comparisons. Whether you're coordinating with international teams, planning global events, or just keeping track of friends and family across different time zones, Timezoner provides an elegant solution with its intuitive visual interface.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or newer)
- npm (v7 or newer)

### Installation

```bash
# Clone the repository
git clone https://github.com/Coppnic/timezoner.git
cd timezoner

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## 💻 Development

```bash
# Install dependencies
npm install

# Start development server with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint
```

## 🔧 Tech Stack

- **React 18**: For building the user interface
- **TypeScript**: For type-safe code
- **Vite**: For fast development and optimized builds
- **date-fns & date-fns-tz**: For timezone handling and date manipulation
- **i18next**: For internationalization with support for 40+ languages
- **SCSS**: For styling with a modular approach
- **Lucide React**: For beautiful, consistent icons
- **LZ-String**: For URL compression when sharing timezone comparisons
- **Lottie**: For smooth animations

## 📁 Project Structure

```
src/
├── assets/         # Static assets like images
├── components/     # React components
│   ├── EditableTitle.tsx    # Editable title component
│   ├── Footer.tsx           # Footer component
│   ├── GroupSelector.tsx    # Timezone group selector
│   ├── LanguageSelector.tsx # Language selection component
│   ├── MobileTimeline.tsx   # Mobile-optimized timeline view
│   ├── Timeline.tsx         # Main timeline visualization
│   └── ...                  # Other components
├── context/        # React context providers
├── data/           # Timezone data and constants
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization setup and translations
├── styles/         # SCSS styles
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## 🎯 Key Features Explained

### Timezone Comparison

Visualize multiple timezones side by side with an intuitive timeline interface that makes it easy to find overlapping hours. The timeline highlights working hours, making it simple to identify the best times for meetings across different regions.

### Timezone Groups

Create and save groups of timezones for different teams, projects, or scenarios. Switch between them with a single click. Perfect for managing multiple distributed teams or recurring international events.

### Sharing

Share your timezone comparisons with others via a compressed URL that preserves your exact configuration. Recipients can view your timezone setup without needing to recreate it manually.

### Internationalization

The application is available in over 40 languages, automatically detecting the user's preferred language. This makes Timezoner accessible to users worldwide.

### Responsive Design

Works seamlessly on desktop, tablet, and mobile devices with a responsive layout that adapts to different screen sizes. The mobile view provides a specialized interface optimized for smaller screens.

## 🌐 Browser Support

Timezoner supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚢 Deployment

The application is configured for easy deployment on Netlify, but can be deployed on any static hosting service.

```bash
# Build the application
npm run build

# The build output will be in the 'dist' directory
# which can be deployed to any static hosting service
```

## 🔍 Troubleshooting

### Common Issues

- **Timezone data appears incorrect**: Ensure your system clock is correctly set
- **Sharing URL doesn't work**: Check that you're copying the entire URL
- **Development server won't start**: Make sure all dependencies are installed with `npm install`

## 👥 Contributing

Contributions are welcome! Please check out our [Contribution Guidelines](CONTRIBUTION.md) for details on how to get started.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy

Timezoner is designed with privacy in mind. No user data is collected or stored on servers. All timezone configurations are stored locally in your browser or encoded in shareable URLs. For more information, see our [Privacy Policy](PRIVACY.md).

## 🛡️ Security

If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md) for responsible disclosure.

---

Made with ❤️ by [marvinpoo](https://github.com/marvinpoo)
