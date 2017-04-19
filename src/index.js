import express from 'express';
import contacts from './contacts';
import _ from 'lodash';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ contacts: contacts });
});

export default router;