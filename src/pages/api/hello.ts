// ===== API ROUTE: HELLO =====

/**
 * Next.js API Route Handler
 * 
 * Documentation: https://nextjs.org/docs/api-routes/introduction
 * 
 * API routes provide a serverless solution for building API endpoints
 * in your Next.js application without requiring a separate backend server.
 * 
 * This file creates an API endpoint at: /api/hello
 * 
 * Usage:
 * - GET request to /api/hello returns { name: "John Doe" }
 * - Can be called from frontend: fetch('/api/hello')
 * 
 * Features:
 * - Runs on the server (Node.js runtime)
 * - Access to full Node.js APIs
 * - Can connect to databases
 * - Can call external APIs securely (API keys stay on server)
 * - Automatically handled as serverless function in production
 */

// ===== IMPORTS =====

/**
 * Next.js types for API routes
 * - NextApiRequest: Extends Node.js IncomingMessage with Next.js features
 * - NextApiResponse: Extends Node.js ServerResponse with helper methods
 */\nimport type { NextApiRequest, NextApiResponse } from \"next\";\n\n// ===== TYPE DEFINITIONS =====\n\n/**\n * Data - Response type definition\n * \n * Defines the shape of the JSON response\n * TypeScript ensures we return data matching this structure\n * \n * Current structure:\n * - name: string field\n * \n * In a real application, this might be:\n * ```typescript\n * type UserData = {\n *   id: number;\n *   name: string;\n *   email: string;\n * }\n * ```\n */\ntype Data = {\n  name: string;\n};\n\n// ===== HANDLER FUNCTION =====\n\n/**\n * handler - API route handler function\n * \n * This function is called whenever a request is made to /api/hello\n * \n * Handles all HTTP methods (GET, POST, PUT, DELETE, etc.)\n * To handle specific methods, check req.method:\n * ```typescript\n * if (req.method === 'POST') { ... }\n * if (req.method === 'GET') { ... }\n * ```\n * \n * Request object (req) contains:\n * - req.method: HTTP method (GET, POST, etc.)\n * - req.body: Parsed request body (for POST/PUT requests)\n * - req.query: Query string parameters\n * - req.cookies: Parsed cookies\n * - req.headers: Request headers\n * \n * Response object (res) methods:\n * - res.status(code): Set HTTP status code\n * - res.json(data): Send JSON response\n * - res.send(data): Send response\n * - res.redirect(url): Redirect to another URL\n * \n * Example with multiple methods:\n * ```typescript\n * export default function handler(req, res) {\n *   if (req.method === 'GET') {\n *     res.status(200).json({ message: 'Hello' });\n *   } else if (req.method === 'POST') {\n *     const { name } = req.body;\n *     res.status(201).json({ message: `Created ${name}` });\n *   } else {\n *     res.status(405).json({ error: 'Method not allowed' });\n *   }\n * }\n * ```\n * \n * @param req - The incoming HTTP request\n * @param res - The HTTP response object\n */\nexport default function handler(\n  req: NextApiRequest,\n  res: NextApiResponse<Data>,\n) {\n  // Send 200 OK status with JSON response\n  // The response matches the Data type definition\n  res.status(200).json({ name: \"John Doe\" });\n  \n  // 🔴 TODO: Replace this example with your actual API logic\n  // Examples:\n  // - Fetch data from database\n  // - Call external API\n  // - Process form submissions\n  // - Handle authentication\n  // - Perform calculations\n}
