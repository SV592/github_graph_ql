# GitHub GraphQL Explorer App

This project is a **React-based web application** that interfaces with the GitHub GraphQL API, allowing users to search and retrieve detailed information about GitHub repositories. It provides an intuitive interface for exploring repository data using GraphQL queries.

---

## 🚀 Features

### **Implemented Features**
1. **GitHub Token Integration**
   - Users can enter their GitHub tokens for authenticated requests.
   - Supports drag-and-drop upload of `.txt` or `.csv` files containing multiple tokens.
   - Validates tokens using the GitHub API, with error and success indicators:
     - Errors are displayed with a red box and message.
     - Valid tokens are confirmed with a green success message.

2. **Search Functionality**
   - Users can search for repositories using:
     - GitHub repository links (e.g., `https://github.com/user/repo`).
     - Direct slugs (e.g., `user/repo`).
   - Drag-and-drop support for uploading `.txt` or `.csv` files with multiple repository URLs.

3. **Data Parsing and Validation**
   - Repository links are parsed to extract slugs (`owner/repo` format).
   - Validates input data to ensure only GitHub URLs or valid slugs are processed.

4. **GraphQL Queries**
   - Retrieves repository information using GitHub's GraphQL API.
   - Query data includes:
     - Repository name
     - Description
     - Fork count
     - Star count
     - Creation date
     - Archived status
     - Visibility level
     - URL

5. **Rate-Limit Warning**
   - Displays a note to unauthenticated users about the GitHub API rate limit (60 requests per hour).
   - Encourages token usage for higher request limits.

6. **Responsive Design**
   - Ensures seamless usage across desktop and mobile devices.
   - Media queries handle layout adjustments for smaller screens.

---

## 📌 Planned Features
1. **Pagination for Results**
   - Handle large result sets by allowing users to navigate through pages.

2. **Enhanced Query Builder**
   - Include more customizable options for users to select specific fields from the GraphQL API.

3. **Save and Export Results**
   - Allow users to download the fetched repository information as a `.csv` or `.json` file.

4. **Multi-Token Management**
   - Enable rotating between multiple GitHub tokens to avoid rate limits.

5. **Advanced Error Handling**
   - Provide detailed error messages for API failures, such as rate limit errors or invalid repository inputs.

6. **User Authentication**
   - Implement GitHub OAuth for a seamless and secure login process.

7. **Visualize Repository Data**
   - Add charts and graphs to display repository statistics like stars, forks, and activity trends.

---

## 💻 Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/en/)
- A GitHub token with `read` permissions.

### **Installation**
1. Clone this repository:
   ```bash
   git clone https://github.com/SV592/github_graph_ql.git
   cd github_graph_ql
   npm install
   npm start

### Usage 
- Enter your GitHub token or upload a file containing tokens.
- Input GitHub repository links or slugs into the search bar or upload a file with repository links.
- Click "Search" to retrieve and display repository information.

### 🛠 Technologies Used
- Frontend: React.js
- API: GitHub GraphQL API
- Styling: CSS with media queries for responsiveness
- File Handling: React Dropzone
- Error Handling: Client-side validation and API response management
