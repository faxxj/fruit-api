let latestStock = {}; // ← tempat menyimpan data terkini dari Roblox

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let body = req.body;

      // KRNL kadang kirim string, parse dulu
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      if (body && Array.isArray(body.stock)) {
        const parsed = {};

        for (const line of body.stock) {
          const [name, raw] = line.split(" = ");
          const value = (raw or ""):gsub(" Stock", ""):gsub("X", ""):gsub("%s+", "")
          parsed[name] = tonumber(value) or 0;
        }

        latestStock = parsed;

        return res.status(200).json({ message: "✅ Data updated", data: latestStock });
      } else {
        return res.status(400).json({ error: "Invalid format, expected { stock: [...] }" });
      }
    } catch (e) {
      return res.status(500).json({ error: "Server error", detail: e.message });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json(latestStock);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
