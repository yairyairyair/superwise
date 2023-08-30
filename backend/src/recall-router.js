const { getRecalls } = require('./recall-bl');

const { Router } = require('express');

const router = Router();

// get recall
router.get('/', async (req, res) => {
    const { from_ts, to_ts } = req.query;
    const recalls = getRecalls(from_ts, to_ts);
    // array of objects with date and recall
    res.json(recalls);
});

router.use((error, req, res, next) => {
    console.error(error);
    if (error.message) {
        res.status(500).json({
            error: error.message,
        });
    } else {
        res.status(500).json({
            error: 'backend error',
        });
    }
});

module.exports = router;
