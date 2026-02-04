import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

app.use(cors());
app.use(express.json());

// register
app.post( '/auth/register', async (req, res) => {
    const { email, password, username } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const userId = data.user.id;

    const { error: insertError } = await supabase
        .from('users')
        .insert({
            id: userId,
            email: email,
            username: username,
            password_hash: 'managed_by_supabase_auth'
        });

    if (insertError) {
        return res.status(400).json({ error: insertError.message });
    }

    await supabase.from('scores').insert({
        user_id: userId,
        total_points: 0
    });

    res.status(201).json({
        message: 'Utilisateur cree avec succes',
        user: {
            id: userId,
            email: email,
            username: username
        }
    });
});

// login
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username')
        .eq('id', data.user.id)
        .single();

    if (userError) {
        return res.status(500).json({ error: 'Erreur lors de la recuperation du profil' });
    }

    res.status(200).json({
        message: 'Connexion reussie',
        user: {
            id: data.user.id,
            email: data.user.email,
            username: userData.username
        },
        session: data.session
    });
});

//logout
app.post('/auth/logout', async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Deconexion reussie' });
});


app.get('/', (req, res) => {
  res.send('Backend API');
});


app.listen(PORT, () => {
  console.log(`Server on: http://localhost:${PORT}`);
});