import { createClient } from '@supabase/supabase-js'
// Creando la conexión con supabase
const supabaseUrl = 'https://ptnlczuiuaotrscavujw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bmxjenVpdWFvdHJzY2F2dWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNzY2MTAsImV4cCI6MTk5Mjc1MjYxMH0.CaOtS_kudjpUTJlnV4VfNU_5tZn1N8T0Uj9DkNjIecs'

// exportamos la conexión
export const supabase = createClient(supabaseUrl, supabaseKey)
