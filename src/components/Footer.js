import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="text-muted py-5 border-top">
      <div className="container text-center">
        <ul className="d-flex list list-unstyled justify-content-center">
          <li className="pr-4">
            <a href="mailto:info@birdsai.co">Contact</a>
          </li>
          <li className="pr-4">
            <a href="#">Back to top</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
