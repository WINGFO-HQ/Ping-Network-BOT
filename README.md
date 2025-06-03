# Ping Network BOT 📊

This Node.js application monitors the status and events for multiple accounts from a WebSocket service, typically associated with the Ping Network VPN extension. It displays the latest event for each account in a continuously updating table in your terminal.

## Features ✨

* **Multi-Account Monitoring**: Tracks multiple User IDs simultaneously.
* **Real-time Table Display**: Shows the latest event (connection status, points, errors) per account in a clean, terminal-based table.
* **Auto-Reconnect**: Automatically attempts to reconnect if a WebSocket connection is dropped.
* **User-Friendly Formatting**: Timestamps and event types are formatted for better readability.
* **Modular Codebase**: Organized into separate modules for easier maintenance and understanding.

## Prerequisites 📋

* [Node.js](https://nodejs.org/) (version 12.x or higher recommended)
* npm (usually comes with Node.js)
* Ping Network VPN Chrome Extension: Download from [Chrome Web Store](https://chromewebstore.google.com/detail/ping-network-vpn/geeedmdpncfeomhgbjeafcahepjelimg).

## Setup 🚀

1.  **Clone or Download the Repository:**
    ```bash
    git clone https://github.com/WINGFO-HQ/Ping-Network-BOT.git
    cd Ping-Network-BOT
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Get Your User ID(s):**
    * Install the [Ping Network VPN extension](https://chromewebstore.google.com/detail/ping-network-vpn/geeedmdpncfeomhgbjeafcahepjelimg).
    * Enter the code `MMWJ4N` in the extension to get a 10% boost.
    * Open the extension's pop-up.
    * Right-click on the pop-up and select "Inspect" (or press F12). This will open the Developer Tools.
    * Go to the "Network" tab in the Developer Tools.
    * You might need to interact with the extension (e.g., connect/disconnect) to see network requests.
    * Look for requests to an API endpoint like `https://secretivesentry.com/v1/...`.
    * Examine the **payload** or **response** of these requests to find your User ID. It's often a numerical value.
    * Repeat for each account if you have multiple.

4.  **Configure User IDs:**
    * In the root of your project directory (e.g., `websocket-monitor`), create a file named `data.txt`.
    * Add each User ID you obtained to this file, with each User ID on a new line. For example:
        ```
        1234
        1234
        1234
        ```

## Running the Monitor 🏃‍♂️

From your project's root directory in the terminal, run:

```bash
npm start
```

A banner will appear, followed by a table showing the status for each User ID listed in your `data.txt`. The table will update in real-time as new events occur. Press `Ctrl+C` to stop the script.

## Project Structure 📁

```
websocket-monitor/
├── src/
│   ├── config.js          # Configuration constants
│   ├── formatter.js       # Data formatting utilities
│   ├── tableDisplay.js    # Table display logic
│   ├── websocketClient.js # WebSocket connection logic
│   └── app.js             # Main application entry point
├── data.txt               # Your User IDs
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```