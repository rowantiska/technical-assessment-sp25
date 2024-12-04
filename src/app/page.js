import React from 'react'
import Link from 'next/link';

export default function page() {

  return (
    <div>
      <Link href="/song"><p className='text-3xl m-10 md:m-20 md:mt-10'>Song</p></Link>
    </div>
  )
}
