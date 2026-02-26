# Setting Up Google Maps API for Reviews Integration

This guide will help you set up the Google Maps API to integrate Google Reviews into your Top Cut Tree Felling website.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top of the page
3. Click on "New Project"
4. Enter a name for your project (e.g., "Top Cut Tree Felling")
5. Click "Create"

## Step 2: Enable the Places API

1. In your new project, go to the "APIs & Services" > "Library" section
2. Search for "Places API"
3. Click on "Places API" in the search results
4. Click "Enable"

## Step 3: Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy your new API key

## Step 4: Restrict Your API Key (Recommended)

1. In the Credentials page, find your API key and click "Edit"
2. Under "Application restrictions", choose "HTTP referrers (websites)"
3. Add your website domain (e.g., `*.topcut.co.za/*`)
4. Under "API restrictions", select "Restrict key"
5. Select "Places API" from the dropdown
6. Click "Save"

## Step 5: Find Your Google Place ID

1. Go to the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Enter your business name and location (e.g., "Top Cut Tree Felling South Africa")
3. Click on your business in the results
4. Copy the Place ID that appears in the info window

## Step 6: Update Environment Variables

1. Open the `.env.local` file in your project
2. Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key
3. Replace `YOUR_GOOGLE_PLACE_ID` with your actual Place ID
4. Save the file

## Step 7: Test the Integration

1. Run your development server: `npm run dev`
2. Open your website and navigate to the home page
3. Scroll down to the Google Reviews section
4. Verify that the reviews are loading correctly

## Troubleshooting

- If reviews aren't loading, check the browser console for errors
- Ensure your API key has the Places API enabled
- Verify that your Place ID is correct
- Make sure your billing is set up in Google Cloud Console (required for API usage)

## Production Deployment

When deploying to production, make sure to:

1. Add the environment variables to your hosting platform (e.g., Vercel)
2. Ensure your API key restrictions allow your production domain
3. Monitor your API usage to avoid unexpected charges 