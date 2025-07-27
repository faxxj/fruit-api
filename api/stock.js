let latestStock = {
  Coconut: 5,
  Apple: 2,
  Pinecone: 7
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = req.body;

      // Jika body sudah dalam bentuk { stock: [...] }
      if (body && Array.isArray(body.stock)) {
        // Ubah array jadi object
        const updatedStock = {};
        body.stock.forEach((item) => {
          const [name, value] = item.split(" = ");
          updatedStock[name.trim()] = value.trim();
        });

        latestStock = updatedStock; // simpan ke variabel global

        return res.status(200).json({ message: "Stock updated successfully", data: latestStock });
      } else {
        return res.status(400).json({ error: "Invalid stock data" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  // GET method: return latest stock
  if (req.method === 'GET') {
    return res.status(200).json(latestStock);
  }

  // Jika bukan POST atau GET
  return res.status(405).json({ error: "Method not allowed" });
}
