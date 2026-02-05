import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { supabase } from '../supabase.js';

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  const userId = req.user.sub;

  const result = await supabase
    .from('users')
    .select('id, username, email, created_at')
    .eq('id', userId)
    .single();

  if (result.error) {
    return res.status(500).json({ error: result.error.message });
  }

  res.json(result.data);
});

export default router;
