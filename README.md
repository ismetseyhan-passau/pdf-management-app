

![alt text](https://ismetseyhan.com/documents/pdf-web-app.png)
**Quick Access**

**Method 1: Local Development**

1. Clone the Repository: Clone the application's repository from the GitHub repository. 

   ```bash
   https://github.com/ismetseyhan-passau/pdf-management-app.git 
2. Install Dependencies: Navigate to the project directory using a terminal and run npm install to install the necessary dependencies.

   ```bash
   npm install 
3. Start the Development Server: Run npm run dev to start the development server.
    ```bash
     npm run dev
4. Access the Application: Open your web browser and navigate to the local address (usually http://localhost:3000) to access the application.

### Method 2: Docker Container (Docker Hub)

1. **Pull Docker Image:** The application's Docker image is available on Docker Hub. Pull the image using the following command:
   
   ```bash
   docker pull ismetseyhan/pdf-management-app 

2. **Run Docker Container:** Start a Docker container using the pulled image with the following command:
    ```bash
    docker run -p 8080:80 ismetseyhan/pdf-management-app

Access the Application: Open your web browser and navigate to http://localhost:8080 to access the application running within the Docker container.

**Method 3: Online Deployment**

 Published Version: The application is published online and accessible at https://pdfapp.ismetseyhan.com/
1. Direct Access: Open your web browser and navigate to the provided URL to access the live version of the application.

2. Demo Access (Optional): Automated Demo Login: For a quick experience, you can use the automated demo login link: 
https://pdfapp.ismetseyhan.com/login?demo=active.

Pre-loaded Data: The demo link will automatically fill in login credentials and provide you with access to a demo account with pre-loaded documents.



# PDF Management Web Application


## Table of Contents

- [1. Introduction](#1introduction)
- [2. User Stories](#2user-stories)
- [3. User Authentication](#3user-authentication)
- [4. Application Components](#4application-components)
- [5. Document Management](#5document-management)
- [6. PDF Viewer and Annotation](#6pdf-viewer-and-annotation)
- [7. Routing and Access Control](#7routing-and-access-control)
- [8. Deployment Options](#8deployment-options)
- [9. Dependencies and Libraries](#9dependencies-and-libraries)
- [10. Services](#10services)
- [11. Technical Details](#11technical-details)
- [12. Conclusion](#12conclusion)



# 1. Introduction

Welcome to the documentation for the PDF Management Web Application. This web application is designed to provide users with an experience for note-taking and document management. Developed using ReactJS with TypeScript, Vite, Material-UI (MUI), and Firebase cloud services, this application offers comprehensive features to enhance your document organization and accessibility.

### Key Features:

- User Registration and Authentication: Users can create accounts and log in securely using the provided authentication system.
- Dashboard and Document Management: The dashboard serves as your central hub for managing notes and documents.
- Document Support: The application supports various document formats, including PNG, JPG, and PDF.
- PDF Viewer: Easily view and interact with PDF documents using the integrated PDF viewer.
- Annotation and Notes: Add notes annotations and mark important sections directly onto PDF documents.
- Security: The application ensures your documents are secure by implementing various security measures.



# 2. User Stories


**User Story 1 - User Registration:**

As a new user, I want to create an account on the PDF Management Web Application so that I can access and manage my documents securely. I should be able to provide my email address and a strong password during the registration process.

**User Story 2 - User Login:**

As a registered user, I want to log in to the application using my credentials (email and password). After successful login, I expect to be directed to the application's dashboard where I can access my documents.

**User Story 3 - Dashboard Overview:**

As a logged-in user, I want to see an organized dashboard that provides an overview of my document management options. This includes tabs for accessing my documents, notes, and settings.

**User Story 4 - Adding a Document:**

As a user, I want to be able to add new documents to my account. I should be able to upload PNG, JPG, or PDF files. Once added, I expect to see the new document listed in the "Documents" tab.

**User Story 5 - Viewing Documents:**

As a user, I want to view my documents within the application. For images, I expect them to be displayed using the image viewer. I want to access the PDF viewer for PDF documents to explore the contents.

**User Story 6 - Adding Notes to PDFs:**

While viewing a PDF document, I want to add notes and annotations to specific sections of the document. This will help me keep track of important information within the PDF.

**User Story 7 - Managing Notes:**

As a user, I want to be able to manage my notes and annotations. This includes editing, deleting, or updating notes' content and positions on the PDF.

**User Story 8 - Navigating PDF Pages:**

While viewing a PDF document, I want to navigate between its pages using the "Previous Page" and "Next Page" buttons. This feature should enhance the readability of the document.

**User Story 9 - PDF Viewer Enhancements:**

When viewing a PDF, I want to have options to hide or show pins and annotations on the PDF. I also want the ability to focus on a single note by hiding other pins, allowing for better focus.

**User Story 10 - PDF Security:**

If I attempt to print a PDF document, I expect the PDF's visibility will be disabled to ensure its security. Instead of viewing the PDF's content, I should see a blank page.

**User Story 11 - Password Recovery:**

As a user who has forgotten their password, I want to be able to reset my password using the "Forgot Password" feature. I should receive a password reset link via email to create a new password.

**User Story 12 - Secure Logout:**

After using the application, I want to log out securely by clicking the "Logout" button in the top-right corner of the user interface.

# 3. User Authentication

The User Authentication process is a fundamental aspect of the PDF Management Web Application. It ensures the security of user data and restricts access to authorized users only. Here's how the authentication process works:

**Registration Process:**

Users navigate to the Register page by clicking on the "Register" link.
Users are prompted to provide their email address and set a strong password on the registration page.
After entering the required information, users submit the registration form.
The application validates the provided data and creates a new user account in Firebase Authentication.
Upon successful registration, users receive a confirmation message and are redirected to the login page.


**Login Process:**

Registered users access the Login page by clicking on the "Login" link.
Users enter their registered email address and password into the respective fields.
The application authenticates the provided credentials using Firebase Authentication.
Users are redirected to the application's dashboard if the credentials are valid.
In case of invalid credentials, an error message is displayed to inform the user.


**Forgotten Password Recovery:**

Users who forget their passwords click on the "Forgot Password" link on the login page.
They are directed to the Forgot Password page, where they enter their registered email address.
Upon submission, the application sends a password reset email to the provided email address.
The email contains a unique link that leads the user to a password reset form.
Users can set a new password through this form, and upon submission, the password is updated in Firebase Authentication.

**Session Management and Security:**

After successful login, the application creates an authenticated session for the user.
The user's authentication status is maintained using Firebase's authentication state observer.
User data, including their unique user ID and email, is stored in the local storage for seamless navigation within the application.
For security purposes, sensitive user information such as passwords is never stored in local storage.

The user authentication process ensures that only registered and authorized users can access the application's features and manage their documents and notes. It contributes to the overall security and user experience of the PDF Management Web Application.


# 4. Application Components

The PDF Management Web Application is composed of several key components that work together to provide users with a seamless experience for document management and interaction. These components are organized to create a structured and user-friendly application structure.

**Main Components:**

- **SidebarLayout:** This component serves as the main layout for the application. It includes the sidebar navigation and content area.

- **PrivateRoute:** A custom route component that ensures access to protected routes is restricted to authenticated users.

- **DocumentManagement:** The component responsible for displaying the user's documents, including filtering, sorting, and interaction options.

- **PdfProvider:** Integrates the PDF viewer functionality into the application, allowing users to view and interact with PDF documents.

- **Authentication:** Contains components related to user authentication, including registration, login, and password recovery forms.

**Application Structure:**

The application's structure follows a modular design, with each component responsible for specific functionality. This design approach enhances maintainability and scalability, making adding or modifying new features easier.

By leveraging these components, the PDF Management Web Application offers users a user-friendly interface for managing their documents and notes effectively.

# 5. Document Management

##  Documents Tab

The Documents tab within the dashboard provides users with a comprehensive suite of tools to manage their documents effectively. This tab is designed to facilitate the management of a variety of document formats, including PNG, JPG images, and PDF files. Here are the key functionalities offered in the Documents tab:


**Viewing Documents:**

- Users can navigate to the Documents tab from the dashboard.
- A list of uploaded documents is displayed, showcasing the document thumbnails and titles.
- Clicking on a document's title or thumbnail opens the respective document for viewing and interaction.


**Uploading New Documents:**

- Users can easily upload new documents by clicking the "Upload" button.
- A file picker dialog allows users to select image files (PNG, JPG) or PDF files from their local devices.
- Once uploaded, the document is added to the list of documents on the tab.

**Deleting Documents:**

- For each document listed, a "Delete" button is available.
- Users can click the "Delete" button to remove the document from their account.
- A confirmation prompt ensures that users don't accidentally delete documents.

**Filtering:**

- Users can use filter options to narrow their document list.
- The drop box allows users to filter documents based on document types


**Image Viewer for Images:**

- An image viewer opens when viewing image documents (PNG, JPG).
- Users can view the image.


**PDF Viewer for PDFs:**

- PDF documents are opened using the PDF viewer component.
- Users can navigate through the pages of the PDF and view its contents.
- Annotations and notes can be added directly onto the PDF, enhancing document interactivity.




**Editing Documents:**

- Users can edit certain properties of documents.



The Documents tab serves as a centralized hub for users to manage and interact with their uploaded documents efficiently. Whether it's viewing, uploading, or deleting documents, this tab provides a seamless and user-friendly experience for document management.


# 6. PDF Viewer and Annotation

The PDF Viewer is divided into three main sections:

### 1. PDF Viewer Component

The first section utilizes a PDF viewer based on the simple React library, pdfjs. It is responsible for displaying the PDF that the user opens. Its primary task is to showcase the content of the selected PDF.



### 2. PDF Wrapper Canvas

The second section involves the PDF File Widget, which is enclosed by the PDF Wrapper Canvas. This component closely monitors interactions like mouse movements and text selection on the PDF. It captures user actions such as clicking on a specific point or selecting text, enabling the creation of associated notes. This dynamic functionality is updated based on user actions and selections.



### 3. Notes Drawer

The third section is the Notes Drawer, a side drawer that opens from the right-hand side of the page. This drawer presents the user's existing notes. Users can view their note locations, content, edit notes, and even delete them. This cohesive system empowers users to manage their notes efficiently.



###  - Other Features

The PDF Security feature is designed to enhance the protection of sensitive document content within the PDF Management Web Application. It aims to prevent unauthorized printing of PDF documents and ensures that the document's contents remain secure.

**Disabling PDF Printing:**


When a user attempts to print a PDF document within the PDF Viewer, the PDF Security feature comes into play.
Upon initiating the print action, the PDF viewer detects this action and activates the security measure.
As a result, the PDF's visibility is disabled, and the user does not see the actual content of the PDF.


**Displaying an Empty Page:**

Instead of displaying the PDF's content, the user is shown an empty page.
This empty page prevents users from accessing or viewing the content of the PDF while attempting to print it.
The blank page serves as a security measure, ensuring that the document's sensitive information remains protected.


# 7. Routing and Access Control

The Routing and Access Control mechanism in the PDF Management Web Application ensures that users can navigate through the application's various pages securely and that access to certain pages is restricted based on authentication status.

**React Router for Navigation:**

The application utilizes the React Router library to handle navigation between different pages.
Routing is managed through a structured hierarchy of routes, making it easy to organize and maintain the application's navigation flow.

**Hide Router for Access Control:**

Access to certain pages, such as the dashboard, should only be restricted to authenticated users.
The application implements the Hide Router pattern to ensure that unauthenticated users are redirected away from protected pages.
Users who attempt to access a protected page without being authenticated are automatically redirected to the login page.

**Organized Routes and Paths:**

Routes and paths are organized in a modular manner to maintain clarity and structure.
For example, the router.tsx file may include a HideRouterLayout component that encapsulates the entire application layout for authenticated users.
Different pages such as SidebarLayout, DocumentsPage, PdfViewerPage, etc., are nested within this layout.

**Handling Unmatched Paths:**

To handle unmatched paths (404 errors), the application includes a default route that redirects users to a custom 404 page.
This enhances the user experience by providing a clear message when a requested page does not exist.

By implementing routing and access control, the PDF Management Web Application ensures that users can navigate through the application seamlessly while maintaining security and privacy. The use of the React Router and the Hide Router pattern contributes to a smooth and controlled user experience.



# 8. Deployment Options

Accessing the Application


The PDF Management Web Application can be accessed through different methods, allowing users to conveniently interact with their documents and notes.

**Method 1: Local Development**

1. Clone the Repository: Clone the application's repository from the GitHub repository. 

   ```bash
   https://github.com/ismetseyhan-passau/pdf-management-app.git 
2. Install Dependencies: Navigate to the project directory using a terminal and run npm install to install the necessary dependencies.

   ```bash
   npm install 
3. Start the Development Server: Run npm run dev to start the development server.
    ```bash
     npm run dev
4. Access the Application: Open your web browser and navigate to the local address (usually http://localhost:3000) to access the application.

### Method 2: Docker Container (Docker Hub)

1. **Pull Docker Image:** The application's Docker image is available on Docker Hub. Pull the image using the following command:
   
   ```bash
   docker pull ismetseyhan/pdf-management-app 

2. **Run Docker Container:** Start a Docker container using the pulled image with the following command:
    ```bash
    docker run -p 8080:80 ismetseyhan/pdf-management-app

Access the Application: Open your web browser and navigate to http://localhost:8080 to access the application running within the Docker container.

**Method 3: Online Deployment**

 Published Version: The application is published online and accessible at https://pdfapp.ismetseyhan.com/..
1. Direct Access: Open your web browser and navigate to the provided URL to access the live version of the application.

2. Demo Access (Optional): Automated Demo Login: For a quick experience, you can use the automated demo login link: 
https://pdfapp.ismetseyhan.com/login?demo=active.

Pre-loaded Data: The demo link will automatically fill in login credentials and provide you with access to a demo account with pre-loaded documents.



# 9. Dependencies and Libraries

## Dependencies and Libraries

The PDF Management Web Application utilizes various dependencies and libraries to enhance its functionality, user experience, and aesthetics:

- **@mui/material and @mui/icons-material:**
  - **Significance:** These libraries provide Material-UI components and icons for creating a consistent and visually appealing user interface.

- **react-pdf-viewer/core:**
  - **Significance:** This library allows seamless integration of a PDF viewer into the application, enabling users to view and interact with PDF documents.

- **firebase:**
  - **Significance:** Firebase offers a comprehensive suite of services for backend operations, including authentication, database management, and cloud storage. It is used for user authentication, document storage, and database management.

- **formik and yup:**
  - **Significance:** Formik is a library for managing forms and form state, while Yup is used for form validation. Together, they ensure accurate and secure data entry in the application's forms.

- **react-router-dom:**
  - **Significance:** React Router enables navigation and routing between different pages within the application, providing a smooth and controlled user experience.

- **react-toastify:**
  - **Significance:** This library offers customizable toast notifications, allowing the application to display important messages or alerts to users.

- **pdfjs-dist:**
  - **Significance:** pdfjs-dist is a core library for rendering PDF documents. It enables the application to display PDF content within the integrated PDF viewer.

- **react-pdf:**
  - **Significance:** React PDF is used for rendering PDF documents within the application, enhancing the user experience when viewing PDF content.

- **styled-components and @emotion/styled:**
  - **Significance:** These libraries enable the creation of styled components, making it easy to style and customize the user interface components.

- **@vitejs/plugin-react and vite:**
  - **Significance:** Vite is a fast build tool that enhances development efficiency. The plugin enables seamless integration of React with Vite's fast development server and optimized build processes.

- **@types/react, @types/react-dom, @types/react-router-dom, @typescript-eslint/eslint-plugin, @typescript-eslint/parser, typescript:**
  - **Significance:** These TypeScript-related dependencies provide type definitions, enabling the use of TypeScript for static type checking and enhanced development.

- **date-fns and numeral:**
  - **Significance:** These libraries provide utilities for working with dates and numbers, ensuring accurate formatting and manipulation of data in the application.

- **@react-helmet-async:**
  - **Significance:** This library allows the application to manage the document head, including metadata and title, for improved SEO and browser tab customization.

- **react-custom-scrollbars-2:**
  - **Significance:** This library provides customizable scrollbars, enhancing the user experience when scrolling through content within the application.

These libraries play a crucial role in shaping the functionality, user experience, and aesthetics of the PDF Management Web Application. They enable features such as document viewing, form management, authentication, routing, and more, contributing to the overall success of the application.


# 10. Services

### 1. DocumentService

The `DocumentService` handles CRUD operations related to user documents.

- `getDocumentsByUserId(userId: string): Promise<IDocument[]>`: Retrieves a list of documents owned by the given user.
- `getDocumentById(userId: string, documentId: string): Promise<IDocument | null>`: Retrieves a specific document by its ID.
- `addDocument(userId: string, newDocument: IDocument): Promise<void | string>`: Adds a new document to the user's collection.
- `updateDocument(userId: string, documentId: string, updatedDocument: any): Promise<void>`: Updates an existing document's information.
- `deleteDocument(userId: string, documentId: string): Promise<void>`: Deletes a document from the user's collection.

### 2. NoteService

The `NoteService` handles CRUD operations related to notes associated with user documents.

- `getNotesByDocumentId(userId: string, documentId: string): Promise<IDocumentNoteType[]>`: Retrieves notes for a specific document.
- `getNoteById(userId: string, documentId: string, noteId: string): Promise<IDocumentNoteType | null>`: Retrieves a specific note by its ID.
- `addNote(userId: string, documentId: string, newNote: IDocumentNoteType): Promise<void | string>`: Adds a new note to a document.
- `updateNote(userId: string, documentId: string, noteId: string, updatedNote: Partial<IDocumentNoteType>): Promise<boolean>`: Updates a note's content.
- `deleteNote(userId: string, documentId: string, noteId: string): Promise<boolean>`: Deletes a note from a document.

### 3. StorageService

The `StorageService` handles file uploads to Firebase storage.

- `uploadFile(userId: string, file: File, onProgress?: (progress: number) => void): Promise<string>`: Uploads a file to Firebase storage and returns its download URL. It can optionally report upload progress.

### 4. UserService

The `UserService` manages user-related operations.

- `getUsers(): Promise<IUser[]>`: Retrieves a list of users.
- `addUser(newUser: IUser): Promise<void>`: Adds a new user.
- `deleteUser(userId: string): Promise<void>`: Deletes a user.
- `getUser(userId: string): Promise<IUser | null>`: Retrieves a specific user by their ID.
- `getDemoUserCredentials(): Promise<IConfig | null>`: Retrieves demo user credentials from the configuration.

Each service encapsulates specific functionalities and interactions with Firebase services, ensuring a modular and organized approach to managing various aspects of the application.


# 11. Technical Details 

## 1. Authentication 

### 1. Firebase Authentication

Firebase Authentication primarily deals with user authentication and authorization. It manages user authentication state, user profiles, and user-specific information


### 2. Context Api 
   
    const contextValue: AuthContextType = {
    currentUser: currentUser,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    resetPassword: resetPassword,}; 
     return (
         <AuthContext.Provider value={contextValue}>
            {children}
         </AuthContext.Provider>
      );


## 2. Data Structures

### 1. Cloud FireStore NoSQL database

Cloud Firestore is a flexible and scalable NoSQL database from Google Cloud. It stores data in collections of JSON-like documents, enabling efficient querying and real-time synchronization. It's ideal for modern apps needing real-time updates, offline access, and security features.



- **Users** - ${userId}

`/users/MRRZKKwv4eMPeDompnKi0dHylAr2`

- **Documents** - ${userId} - document - ${documentId}

`/documents/MRRZKKwv4eMPeDompnKi0dHylAr2/document/N0h247dcUSFYlwiW7yan`

- **Notes** - ${userId} - documents - ${documentId} - notes -${noteID}

`/userdocumentsnotes/MRRZKKwv4eMPeDompnKi0dHylAr2/documents/N0h247dcUSFYlwiW7yan/notes/6JmHms4mI5gONAnUnBLa`

## 3. Router

### 1. Dynamic Document ID

The route "pdf-viewer/:documentId" allows for on-the-fly rendering of PDFs based on the document ID provided.
 
      `https://pdfapp.ismetseyhan.com/pdf-viewer/N0h247dcUSFYlwiW7yan`
 
### 2. Lazy Loading
The `lazy` function from React is utilized for implementing code splitting and lazy loading of components. This approach enhances application performance by loading components only when they are required.
  
`const PdfProvider = lazy(() => import('./features/pdf-viewer/PdfProvider.tsx'));
`
### 3. UseParam

The URL https://pdfapp.ismetseyhan.com/login?demo=active retrieves demo account information and pre-fills the login form automatically. In this scenario, the "demo" parameter is utilized to trigger the loading of demo account credentials into the login form. ( Config Collection )

`https://pdfapp.ismetseyhan.com/login?demo=active`

### 4. Context, React Router, Private Router 

 *Main.txt

      `ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <AuthProvider>
            <SidebarProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </SidebarProvider>
        </AuthProvider>
    </HelmetProvider>
    )`

 *App.txt

    `const App = () => {
       const content = useRoutes(router);
        return (

        <ThemeProvider>
            <Suspense fallback={<div>Loading...</div>}>
                {content}
            </Suspense>
        </ThemeProvider>

          );
     };`

PrivateRoute.txt

      `const PrivateRoute: FC = () => {
       const location = useLocation();
       const {currentUser} = useAuth();

       return currentUser?.uid ? (
           <Outlet/>
       ) : (
        // Keep the previous navigation stack
           <Navigate to="/login" state={{from: location}} replace/>
        );
    };`



-For more detailed information about how the application handles routing and dynamic behavior, please refer to the `"routes.tsx"` file. 

## 4. Form Validation

Formik - Yup
  
         `export const forgetPassword = yup.object().shape({
          email: yup
        .string()
        .email('Please provide a valid email address')
        .required('Email address is required'),

         });`





# 12. Conclusion

To sum it up, the PDF Management Web Application is a comprehensive solution that simplifies document organization and note management. I've been working on it solo, and even though it's in its early stages, it's already showing promise in making document handling more efficient and user-friendly. Of course, it's completely normal to encounter a few bumps along the way during development.

I'm focusing on improving the mobile user experience and implementing overall system enhancements. Moving forward, I'm excited to bring in features like note-sharing and dynamic interactions within the PDF canvas, which will take the application to the next level for efficient document management.






