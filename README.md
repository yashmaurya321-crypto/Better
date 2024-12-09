# Project Name

[![Expo Badge](https://img.shields.io/badge/Expo-%20%3E%3D%20v40.0-blue)](https://expo.dev)

A mobile application built with React Native and Expo

## Table of Contents
1. [Description](#description)
2. [How to Run the Project](#how-to-run-the-project)
3. [Design Choices Made](#design-choices-made)
4. [Assumptions and Limitations](#assumptions-and-limitations)
5. [Technologies Used](#technologies-used)
6. [License](#license)


## How to Run the Project

To run this project locally, follow these steps:

### 1. Clone the repository  
Clone the repository to your local machine using Git:
```bash
git clone https://github.com/yourusername/project-name.git
```

### 2. Install dependencies
Navigate to the project folder and install the dependencies:
```bash
cd Better
npm install
```

### 3. Start the project
Launch the Expo development server by running:
```bash
npx expo start --lan
```
### 4. Install Expo go app to run project in personal mobile 
[![Expo App]([https://img.shields.io/badge/Expo-%20%3E%3D%20v40.0-blue)](https://expo.dev](https://g.co/kgs/f3JqV2u))

### 5. Design Choices Made
##State Management:
We use [Redux/Context API/Any other library] to manage the global state of the application. This ensures that all components are kept in sync and the app’s state remains consistent.

## Routing:
React Navigation is used to handle navigation between screens. We use a stack navigator to manage navigation between the main screens and ensure a smooth flow throughout the app.

## Async Storage:
For persistent local storage, AsyncStorage is used to save user data, preferences, and session information locally on the device. This allows users to remain logged in or maintain preferences even after the app is closed.


### Assumptions and Limitations

## Assumptions:
The app is designed to work on both Android and iOS devices.
Currently, the app support offline mode. A network connection is not required.

## Limitations:
Currently, the app does not support offline mode. A network connection is required for full functionality.
Some UI elements may not display correctly on all screen sizes, especially for very large or small devices.


### Technologies Used

# React Native: Framework for building mobile apps using JavaScript and React.
# Expo: A toolchain for building and running React Native apps.
# React Navigation: A library for routing and navigation in React Native apps.
# AsyncStorage: Used for storing data locally on the device.
# BouncyCheckbox: A library to add animated checkboxes to React Native apps.
