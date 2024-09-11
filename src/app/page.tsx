import React from 'react'
import Sidebar from "@/app/dashboard/page"
import Footer from '@/(components)/footer/page'

export default async function page() {
  return (
      <>
      <div className='min-h-screen'>
        <Sidebar/>
      </div>
      <Footer/>
      </>
  )
}
