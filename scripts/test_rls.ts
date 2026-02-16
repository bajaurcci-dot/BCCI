
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qjppucedebegvpgdqyyz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcHB1Y2VkZWJlZ3ZwZ2RxeXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTE0NzgsImV4cCI6MjA4NjYyNzQ3OH0.zZ9nXOFOnJUnkUtql7eAfeXjxAGVfrsRVnALmiMMNEM'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testRLS() {
    console.log('Testing Public Access (Vacancies)...')
    const { data: vacancies, error: vacError } = await supabase
        .from('vacancies')
        .select('*')

    if (vacError) {
        console.error('Vacancies Error:', vacError.message)
    } else {
        console.log('Vacancies Count:', vacancies.length)
    }

    console.log('Testing Protected Access (Registrations)...')
    const { data: regs, error: regError } = await supabase
        .from('registrations')
        .select('*')

    if (regError) {
        console.error('Registrations Error (Expected if RLS denies):', regError.message)
    } else {
        console.log('Registrations Count (Should be 0 or error):', regs.length)
    }
}

testRLS()
