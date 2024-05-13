import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main>
        <section className='second_header' >
          <Link to={"/auth"}>
            <button>Portal</button>
          </Link>
        </section>
    </main>
  )
}

export default Home