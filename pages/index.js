import Head from 'next/head'
import Image from 'next/image'
import SideBars from '../components/SideBars'

export default function Home() {
  return (
    <div>
      <Head>
        <title>WhatApp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"/>
      </Head>
      <SideBars/>
    </div>
  )
}
