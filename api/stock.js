export default function handler(req, res) {
  if (req.method === 'POST') {
    // Ambil data dari body
    const stockData = req.body;

    console.log('Diterima dari Roblox:', stockData);

    // Simpan, proses, atau sekadar balas
    return res.status(200).json({
      message: 'Berhasil menerima data dari Roblox!',
      received: stockData
    });
  }

  // Default untuk GET
  res.status(200).json({
    Coconut: 5,
    Apple: 2,
    Pinecone: 7
  });
}
