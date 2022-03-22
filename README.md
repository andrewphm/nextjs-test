Authentication flow
-> Log in/Sign in signs JWT token and sets cookie from the server. Front-end never receieves JWT token.
-> Next.js middleware checks and verifies JWT on every request
