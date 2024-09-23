![Favicon](src/app/favicon.ico)

# FF14 Marketplace Dashboard

A responsive and interactive dashboard for managing player inventories and offers in a marketplace for Final Fantasy XIV (FF14). The application allows users to impersonate players, search for items, create buy/sell offers, and manage their inventories.

## Features

- **Player Impersonation**: Select and impersonate any player from the list.
- **Item Search**: Search for items using a live search input.
- **Offer Management**: Create buy or sell offers with validation.
- **Inventory Overview**: View current inventories and offers.
- **Responsive Design**: The dashboard adapts to different screen sizes.

## Technologies Used

- **React**: For building the user interface.
- **Framer Motion**: For animations and transitions.
- **Lucide Icons**: For iconography.
- **Tailwind CSS**: For styling components.
- **TypeScript**: For type safety.
- **React Query**: For managing server state and data fetching.
- **Shadcn**: For building accessible and reusable components.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MarcosVini9999/ff14-market-board-front
   ```
2. Navigate into the project directory:
   ```bash
   cd ff14-marketplace-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a .env file in the root directory and add the following variable:
   ```bash
   NEXT_PUBLIC_API_BASE_URL='http://localhost:3000'
   ```
5. Run the application:
   ```bash
   npm run dev
   ```

## Usage

- Start the application to view the dashboard.
- Select a player from the impersonation dropdown to manage their inventory.
- Use the item search feature to find specific items.
- Create offers by filling out the form in the "Create Offer" modal.

## Developer

- Marcos Vinicius Andrade de Sousa <marcosviniciusandradedesousa@hotmail.com>
