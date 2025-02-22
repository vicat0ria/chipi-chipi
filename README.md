# LevelUp ASL (Subject to Change)

## Description  
**LevelUp ASL** is a fun, ADHD-friendly mobile app designed to help users build their ASL (American Sign Language) skills through gaming. The app is tailored for young adults with ADHD, leveraging gamification techniques to reinforce learning habits in an engaging and accessible way.  

**App Type:** Cross-platform mobile app (ADA Accessible)  

## Technologies Used  

### Frontend  
- React Native  
- Expo  

### Backend  
- Flask  
- FastAPI  

### Database  
- MongoDB Cloud  

### Machine Learning  
- TensorFlow  
- Python  

### Data  
- [Kaggle Link](#) _(Replace with actual dataset link)_  

### Design/Graphic Tools  
- Figma  

## UI Description  

- **Login Screen**  
- **Levels Homepage** – "Start Lesson"  
- **Lesson Module**  
- **Teaching Summary**  
- **"Test Your Knowledge"** – Earn points based on correct sign recognition  
  - Initially, prompt letter and check if user signed properly  
  - Potential expansion to time-based challenges  
- **Game Page**  
  - Based on points earned, in-game events trigger  
  - **Leaderboard?** _(Future feature)_  
  - **User Profile Page?** _(Future feature)_  

## Game & ADHD Considerations  

- **Daily Boss Battles**  
  - Users can fight a boss **once per day**  
  - A new boss appears daily to encourage habit formation  
  - Users can earn up to **10 points per day**  

- **Gamification for ADHD Engagement**  
  - Dopamine-boosting mechanics to reinforce learning  
  - **Learning Module:** Immediate feedback on ASL sign correctness  
  - **Game Mode:** Use earned currency to battle daily bosses  
  - **Visual & UI Stimulation:**  
    - **Status Bar** for progress indication  
    - **Level-Up System** with skill points  
    - **Customizable Character Class**  

## Installation & Setup  

### Prerequisites  
- Install **npm** on your machine: https://nodejs.org/en/download  

### Steps to Install & Run  

1. Clone the GitHub repository:  
   ```sh
   git clone https://github.com/{your-username}/chipi-chipi.git
    ```

2. Navigate to the project folder:  
   ```sh
    cd chipi-chipi
    cd levelUp
    ```

3. Install dependencies:  
   ```sh
    npm install expo-cli
    npx expo install expo-camera
    npx expo install expo-image
    ```

4. Start the app:
   ```sh
    npx expo start
    ```
    If you receive a "connectivity" error, try:
    ```sh
    npx expo start --tunnel
    ```