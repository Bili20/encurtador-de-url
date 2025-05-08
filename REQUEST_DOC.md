# Documentação da API

## Endpoints

### 1. Encurtar URL

**POST** `/url`

**Request Body:**

````json
{
  "original_url": "https://exemplo.com"
}

**Response (201 Created):**
```json
{
 "http://localhost:3000/abc123"
}
````

### 2. Busca URL

**GET** `/url/:url_short`

**Response (301 Moved Permanently):**
