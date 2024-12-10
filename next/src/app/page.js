import React from 'react'
import Link from 'next/link';

export default function page() {

  return (
    <div>
      <Link href="/song"><button className='p-3 border border-[#929292] rounded-md text-xl m-10'>Today's Song</button></Link>
      <br></br>
      <Link href="/archived"><button className='p-3 border border-[#929292] rounded-md text-xl m-10 mt-0'>Archived Song</button></Link>
    </div>
  )
}
