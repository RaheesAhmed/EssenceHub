# Fragrance App Structure and Flow

## Main Components

1. **Fragrance Creation Interface**
   - Menu of Fragrances
   - Fragrance Selection Display
   - Fragrance Customization
   - AI Description Display
   - Recommended Notes Section

2. **Customer Profile Management**
   - New Customer Registration
   - Existing Customer Search
   - Customer Profile Display/Edit

3. **Admin Interface**
   - Fragrance Database Management
   - Customer Profile Management
   - Data Export

## Component Details and Flow

### 1. Fragrance Creation Interface

#### a. Menu of Fragrances
- Displays a list of available fragrances
- Each fragrance item includes:
  - Image
  - Name (e.g., "Sea Water")
  - Category (e.g., "Top")
  - Aroma type (e.g., "Oceanic Aroma")
  - "More" button to show description
- Organized by categories (Top, Heart, etc.)

#### b. Fragrance Selection Display
- Shows currently selected fragrances (up to 3 initially)
- For each selected fragrance:
  - Display name
  - "+" and "-" buttons for adjusting intensity
- "Edit" button to return to the Menu of Fragrances

#### c. Fragrance Customization
- Allows fine-tuning of fragrance intensities
- Displays selected fragrances with intensity indicators (e.g., "+++", "-")

#### d. AI Description Display
- Shows a 40-word or less description of the created fragrance
- Description is generated in an "elegant, cheeky manner"

#### e. Recommended Notes Section
- Displays up to 5 AI-recommended notes
- Each recommendation includes:
  - Note name
  - Description of what it brings to the fragrance
  - "Add this Note" button

### 2. Customer Profile Management

#### a. New Customer Registration
- Form with fields:
  - Required: First Name, Last Name
  - Optional: Phone Number, Email Address, Mailing Address

#### b. Existing Customer Search
- Search functionality by Name, Email, or Phone Number

#### c. Customer Profile Display/Edit
- Shows customer information
- Lists created fragrances
- Options to edit contact details
- Ability to add new fragrances
- Options to edit or copy existing fragrances

### 3. Admin Interface

#### a. Fragrance Database Management
- Interface to edit the fragrance database

#### b. Customer Profile Management
- Ability to view and edit customer profiles

#### c. Data Export
- Functionality to export customer data as a CSV file

## Application Flow

1. **Start**: User begins at the Fragrance Creation Interface

2. **Fragrance Selection**:
   - User browses the Menu of Fragrances
   - Selects up to 3 fragrances initially
   - Each selection updates the Fragrance Selection Display

3. **Fragrance Customization**:
   - User adjusts fragrance intensities using "+" and "-" buttons
   - Changes reflect in real-time on the Fragrance Selection Display

4. **AI Recommendations**:
   - System generates and displays up to 5 recommended notes
   - User can add recommended notes to their selection

5. **Finalize Fragrance**:
   - User reviews their customized fragrance
   - System generates a 40-word description using AI

6. **Customer Profile**:
   - For new customers:
     - User fills out the New Customer Registration form
   - For existing customers:
     - User searches for their profile
     - System loads the existing profile

7. **Attach Fragrance to Profile**:
   - The created fragrance is saved to the customer's profile

8. **Profile Management** (optional):
   - User can edit their contact information
   - View, edit, or copy existing fragrances
   - Create new fragrances

9. **Admin Functions** (for staff):
   - Access to edit the Fragrance Database
   - Ability to manage Customer Profiles
   - Option to export contact data to CSV

## Technical Considerations

- Implement using Next.js 14 for the frontend framework
- Utilize shadcn/ui components for consistent UI elements
- Apply the provided Tailwind CSS theme for styling
- Ensure responsive design for both in-store tablet use and potential e-commerce functionality
- Implement state management for handling complex interactions and data flow between components
- Set up API integrations for AI-powered features (descriptions and recommendations)
- Use server-side rendering where appropriate for improved performance and SEO