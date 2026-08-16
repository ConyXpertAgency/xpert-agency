
import First from '@/components/rbe/First'
import Five from '@/components/rbe/Five'
import Footer from '@/components/rbe/Footer'
import Four from '@/components/rbe/Four'
import Second from '@/components/rbe/Second'
import Third from '@/components/rbe/Third'
import React from 'react'

const page = () => {
  return (
    <main className='AppShell'>
        <First />
        <Second />
        <Third />
        <Four />
        <Five />
        <Footer />
    </main>
  )
}

export default page