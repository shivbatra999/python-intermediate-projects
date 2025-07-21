# Airbnb Clone

A fully responsive React application that clones the Airbnb homepage, built with modern web technologies.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with breakpoints at 640px and 1024px
- **Modern UI**: Built with Tailwind CSS for beautiful, consistent styling
- **Accessibility**: ARIA labels, alt text for images, and proper semantic HTML
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Component Architecture**: Well-organized, reusable components

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Heroicons** for beautiful icons
- **React Testing Library** for testing

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header with search
│   ├── Banner.tsx          # Hero section with CTA
│   ├── SmallCard.tsx       # Location cards
│   ├── MediumCard.tsx      # Category cards
│   ├── LargeCard.tsx       # Featured content card
│   ├── Footer.tsx          # Site footer
│   └── Layout.tsx          # Page layout wrapper
├── pages/
│   └── HomePage.tsx        # Main homepage
├── data/
│   └── locations.json      # Sample location data
└── App.tsx                 # Main app component
```

## 🎨 Components Overview

### Header
- Logo, search input, and user menu
- Responsive design with mobile search bar
- Date picker and guest selector icons

### Banner
- Full-width hero image
- Centered call-to-action
- "I'm flexible" button with hover effects

### SmallCard
- Displays location image, name, and distance
- Grid layout: 1-4 columns based on screen size
- Hover effects with scaling and background changes

### MediumCard
- Category cards with titles
- Horizontal scrolling on mobile
- Hover scaling effects

### LargeCard
- Featured content with overlay text
- Call-to-action button
- Background image with text overlay

### Footer
- Multi-column link organization
- Copyright and legal links
- Responsive grid layout

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The project includes:
- Header component tests
- Logo and search input validation
- Accessibility attribute testing

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd airbnb-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🌐 Deployment to Netlify

### Step-by-Step Instructions:

1. **Prepare Your Repository**
   - Push your code to GitHub
   - Ensure your `package.json` has the correct build script
   - Verify the build works locally with `npm run build`

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/log in
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your airbnb-clone repository

3. **Configure Build Settings**
   - **Branch to deploy**: `main` (or your default branch)
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - You'll get a unique URL (e.g., `https://amazing-site-name.netlify.app`)

5. **Custom Domain (Optional)**
   - Go to Site Settings > Domain Management
   - Add your custom domain
   - Follow DNS configuration instructions

### Automatic Deployments
- Every push to your main branch will trigger a new deployment
- Pull request previews are available with Netlify's branch deploys
- Build logs help debug any deployment issues

### Environment Variables (if needed)
- Add environment variables in Site Settings > Environment Variables
- Use `REACT_APP_` prefix for client-side variables

## 🎯 Future Enhancements

- [ ] Add search functionality
- [ ] Implement date picker
- [ ] Add property detail pages
- [ ] User authentication
- [ ] Booking system
- [ ] Map integration
- [ ] Real data integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React and Tailwind CSS
