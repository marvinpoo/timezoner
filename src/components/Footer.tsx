import React from 'react';
import packageJson from '../../package.json';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-text">
          A project by <a href="https://coppnic.cc/" target="_blank" rel="noopener noreferrer">Coppnic</a> - Made by the love of international gaming together ♥
        </span>
        <span className="version">v{packageJson.version}</span>
      </div>
    </footer>
  );
};