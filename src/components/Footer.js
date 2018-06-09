import React from 'react';
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="text-muted py-5 border-top">
      <div className="container">
        <p className="float-right">
          <a href="#">Back to top</a>
        </p>
        <Link to="/about">About</Link>
      </div>
    </footer>
  )
}
