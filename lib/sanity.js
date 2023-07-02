import {createClient} from '@sanity/client'

 const client = createClient({
    projectId: 'xwh0hdbg',
    dataset: 'production',
    apiVersion: '2023-06-29',
    token: 'sk3Ace5sPy4rmXqfQw0akLHwIEsSp6q0tmO95drpQOn8LeA2M9HKMOiT9JgGxfZD2htmCy50yDyqMgrPEkRLFUjTZYVtaFcZs4AyXToA5Yfwh9kdRCwf22JWIfPhTXvqe385Vuf9Ruf9YETbeyZgliYtGrCZMcxOONE5m39ETQnVyO5jJHux',
    useCdn: false,
})

export default client