# Discord Clone 

This is a clone of the Discord web application built using Next.js 14 with a wide range of features and technologies to provide users with a robust chat and communication platform. It offers real-time messaging, multimedia support, voice and video calls, member management, server customization, and more.


## Features

The application has following features:

- Real-time messaging using Socket.io
- Send attachments as messages using UploadThing
- Delete & Edit messages in real time for all users
- Create Text, Audio and Video call Channels
- 1:1 conversation between members
- 1:1 video calls between members
- Member management (Kick, Role change Guest / Moderator)
- Unique invite link generation & full working invite system
- Infinite loading for messages in batches of 10 (@tanstack/query)
- Server creation and customization
- Beautiful UI using TailwindCSS and ShadcnUI
- Full responsivity and mobile UI
- Light / Dark mode
- Websocket fallback: Polling with alerts 
- ORM using Prisma
- MySQL database using Aiven
- Authentication with Clerk


## Getting Started

1. Clone this repository to your local machine.

   ```shell
   git clone https://github.com/harrismalik98/Discord-Clone.git
   ```
2. Install the dependencies.
   ```shell
   cd Discord-Clone
   npm install
   ```
3. Configure environment variables for database, authentication, and other settings.
   ```shell
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=

   DATABASE_URL=

   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=

   LIVEKIT_API_KEY=
   LIVEKIT_API_SECRET=
   NEXT_PUBLIC_LIVEKIT_URL=
   ```

4. Setup the prisma.
   ```shell
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server.
   ```shell
   npm run dev
   ```
6. Access the application in your web browser at http://localhost:3000.


## Technologies Used

The Discord clone website is built using the following technologies and tools:

- **Next.js 14:** A popular JavaScript framework for building modern web applications, offering server-side rendering and a great developer experience.

- **Socket.io:** A library for real-time, bidirectional communication between clients and the server, enabling instant messaging.

- **UploadThing:** Used for sending attachments as messages within the chat application.

- **Prisma:** An Object-Relational Mapping (ORM) tool for working with databases, simplifying database interactions.

- **MySQL (Aiven):** A relational database used for storing and managing data, hosted on Aiven for scalability and reliability.

- **Clerk:** Provides user authentication and user management features to enhance security and user experiences.

- **Tanstack/Query:** Used for efficient message pagination, fetching data in batches for a smooth chat experience.

- **TailwindCSS:** A utility-first CSS framework for creating beautiful and responsive user interfaces.

- **ShadcnUI:** A UI component library or framework used to enhance the aesthetics and user experience of the website. 