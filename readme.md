## **Tech Stack**  
- **Node.js** - Runtime environment  
- **Express.js** - Backend framework  
- **TypeScript** - Type-safe JavaScript  
- **Axios** - HTTP client for API requests  
- **dotenv** - Environment variable management
### Question-1

#### **1️⃣ GET `/api/numbers/:numberid`**
- **Description**:  
  Fetches numbers from an external API based on `numberid`, updates the sliding window, and returns previous state, current state, new numbers, and average.  

- **Allowed `numberid` values**:
  - `p` → Prime numbers  
  - `f` → Fibonacci numbers  
  - `e` → Even numbers  
  - `r` → Random numbers
  
### Question-2
This project is an Express.js API built with TypeScript that interacts with an external API to fetch and analyze user posts. It provides endpoints to retrieve the top users based on post count and fetch posts based on popularity or recency. The API is designed to efficiently process and structure the data before responding.  
#### **API Routes**
- `/posts?type=popular`
- `/posts?type=latest`
- `/users/top-users`

## Compile and Run
```
npx tsc (compile the typescript files)
node dist/script.js --OR-- node dist/app.js
```
