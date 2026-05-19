router.post("/", async (req, res) => {
  try {

    const {
      userId,
      username,
      title,
      content,
      mood,
    } = req.body;

    const journal = new Journal({
      userId,
      username,
      title,
      content,
      mood,
    });

    await journal.save();

    res.status(201).json(journal);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});