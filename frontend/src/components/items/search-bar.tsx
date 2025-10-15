import { Search } from 'lucide-react'
import React from 'react'
export default function SearchBar({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (val: string) => void }) {
    return (
        <div className='flex items-center text-primary border-2 gap-4 px-2 rounded-md border-border w-full text-sm bg-border'>
            <Search className='text-muted-foreground w-4 h-4' />
            <input type='text' placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className='w-full h-full p-2 border-transparent focus:border-transparent outline-none hover:border-transparent' />
        </div>
    )
}
