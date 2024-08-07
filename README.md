# YouTube SEO Tool

Welcome to the YouTube SEO Tool! This project is designed to help YouTube content creators optimize their channels and videos for better search engine visibility. This tool leverages the YouTube API to provide essential functionalities like channel overview, keyword research, and video upload capabilities.

## Features

1. **User Login with Google Authentication**:
   - Users can securely log in to their YouTube channels using Google Authentication.

2. **Channel Overview Dashboard**:
   - Displays an overview of the user's YouTube channel using the channel ID and YouTube API. This includes metrics like total views, subscribers, and number of videos.

3. **YouTube Keyword Research Tool**:
   - Provides relevant SEO keywords/tags based on user input keywords using the YouTube API. This helps users to enhance their video visibility on YouTube.

4. **Video Upload to YouTube Channel**:
   - Allows users to upload videos directly to their YouTube channels using the YouTube API.

## Installation

To get started with this project, follow the steps below:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ahd-Kabeer-Hadi/youtube-seo-tool.git
   cd youtube-seo-tool
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Set Up Google API Credentials**:
   - Go to the [Google Developers Console](https://console.developers.google.com/).
   - Create a new project and enable the YouTube Data API v3.
   - Set up OAuth 2.0 credentials and download the `client_secret.json` file.
   - Place the `client_secret.json` file in the root directory of the project.

4. **Run the Application**:
   ```bash
   npm start
   ```

## Usage

1. **Login to YouTube Channel**:
   - On the homepage, click on the "Login with Google" button.
   - Authorize the application to access your YouTube account.

2. **View Channel Overview**:
   - After logging in, you will be redirected to the dashboard.
   - The dashboard displays an overview of your YouTube channel, including total views, subscribers, and number of videos.

3. **Keyword Research**:
   - Navigate to the "Keyword Research" tab.
   - Enter a keyword or phrase and click on the "Search" button.
   - The tool will display relevant SEO keywords/tags based on the YouTube API.

4. **Upload Video**:
   - Go to the "Upload Video" tab.
   - Fill in the required fields (video title, description, tags, etc.).
   - Select the video file to upload and click on the "Upload" button.
   - The video will be uploaded to your YouTube channel using the YouTube API.

## Contributing

We welcome contributions to improve this project! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to open an issue on GitHub or contact the project maintainer:

- **Name**: Ahd Kabeer Hadi
- **GitHub**: [Ahd-Kabeer-Hadi](https://github.com/Ahd-Kabeer-Hadi)

Thank you for using the YouTube SEO Tool!