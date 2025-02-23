# LevelUp

## Description  
**LevelUp:** A fun, ADHD-friendly mobile app to build your ASL skills through gaming!

**Purpose:** ADHD makes it hard to form habits due to issues regulating dopamine. LevelUp is a mobile app that helps individuals learn ASL in a gamified manner. Through ADHD-friendly design, our app offers dopamine to the players in the form of awards when progress is made, ensuring the new habit sticks!

**App Type:** Cross-platform mobile app 

## Technologies Used  

### EndeavorOTC (https://www.endeavorotc.com/blog/adult-learning-techniques-when-you-have-adhd/)
- Use Visual Aids: i.e. diagrams to retain info more effectively
- Hands-On Learning: Tasks using senses/physical engagement
- Take Active Breaks: When getting restless, reset to stay focused
- Reward Yourself for Completing Tasks: Helps stay motivated 
and on track by regulating dopamine levels

### ADDA (https://add.org/understimulated-adhd/)
- Introduce Novelty Into Your Routine: “Switching your routine can improve focus and productivity”

### ADHDNeuro (https://adhdneuro.com/blog/what-is-the-adhd-color)
- Blue: calming effects — for relaxation and concentration
- Green: harmony/balance — efficiency, less strain for tasks 
- Yellow: uplifting — stimulates mental activity 


## Technologies Used  

### Frontend  
React Native, Expo, Typescript, WithFrame UI Kit, Pixilart 

### Backend  
- Database: Flask, MongoDB Atlas
- Machine Learning: Flask, Python, Tensorflow, CNN Model, scikit-learn, NumPy, pandas, ASL Dataset (Kaggle: https://www.kaggle.com/datasets/grassknoted/asl-alphabet)  

### More Tools:
- OS level a11y APIs: Text-to-Speech/Voiceover, WAVE

## Installation & Setup  

### Prerequisites  
- Install **npm** on your machine: https://nodejs.org/en/download  
- Install latest version of Python

### Steps to Install & Run  

## Frontend
1. Clone the GitHub repository:  
   ```sh
   git clone https://github.com/{username}/chipi-chipi.git
    ```

2. Navigate to the project folder:  
   ```sh
    cd chipi-chipi
    cd levelUp
    ```

3. Install dependencies:  
   ```sh
    npm install expo-cli
    ```

4. Start the app:
   ```sh
    npx expo start
    ```
    If you receive a "connectivity" error, try:
    ```sh
    npx expo start --tunnel
    ```

## Backend

1. Install necessary dependencies:
   ```sh
    pip install -r requirements.txt
    pip install flask
    pip install flask_jwt_extended
    pip install pymongo
    pip install bcrypt
    pip install pillow
    pip install numpy
    pip install tensorflow
    ```

2. Start the backend by executing:
  ```sh
  python app.py
  ```

### Acknowledgements

## Student Developers:
- Victoria Miteva: Team Captain, Frontend, Documentation
- Alberto Rubalcava: Frontend, UI/UX Design, Researcher
- Alberto Sandoval: Backend, Databases, Game Designer
- Arman Akhondzadeh: Game Designer, Artist, Sound
- Dylan Oseida: Game Developer & Designer, Frontend
- Hayk Mirzakhanyan: Game Designer, Artist, Haptics
- Vaishnavi Sen: Backend, Machine Learning, Frontend

## Organization:
California State University, Northridge
College of Engineering and Computer Science

## Competition:
2025 SS12 Code for a Cause Accessibility Hackathon

