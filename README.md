# IEEE SB CEK WEBSITE

Development setup for IEEE SB CEK website.

1. Create a vercel account
2. Create a storage using postgresql
3. Keep the credentials ready

3. git clone https://github.com/retr0717/ieee-cek.git
4. cd ieee-cek
5. Create a .env file in the root folder (ieee-cek/).
6. Copy the credentials of the step 3 to the .env file.
7. Create env variable called NEXTAUTH=
8. You have to create a secret key for it which can be done using the below commands
    openssl rand -base64 32
    or
    npx auth secret
   
9.paste the generated auth secret as the value of the step 7
   NEXTAUTH=< generated key>
   
10.Run the command : npm i

11.Run the command : npm run seed

12.Run the command : npm run dev
   to start the dev server.
   
13.Create a different branch of the upcoming changes that you do.
   
 
