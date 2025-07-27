let lastStock = null; // Disimpan di memory

export default function handler(req, res) {
  if (req.method === 'POST') {
    lastStock = req.body;
    return res.status(200).json({ message: 'Stock updated', received: lastStock });
  }

  if (req.method === 'GET') {
    return res.status(200).json(lastStock || {
      Coconut: 5,
      Apple: 2,
      Pinecone: 7
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
