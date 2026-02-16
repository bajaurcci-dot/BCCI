
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qjppucedebegvpgdqyyz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcHB1Y2VkZWJlZ3ZwZ2RxeXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTE0NzgsImV4cCI6MjA4NjYyNzQ3OH0.zZ9nXOFOnJUnkUtql7eAfeXjxAGVfrsRVnALmiMMNEM'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdmin() {
    const email = 'admin@example.com'
    const password = 'Xy9#mKp$2vLq'

    console.log('Attempting to create user:', email)

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error('Error creating user FULL OBJECT:', JSON.stringify(error, null, 2))
    } else {
        console.log('User created ID:', data.user?.id)
    }
}

createAdmin()
