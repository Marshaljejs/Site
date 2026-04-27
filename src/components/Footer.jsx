import "../styles/Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">© {year} EduPlatform. Барлық құқықтар қорғалған.</p>
        <div className="footer-links">
          <a href="#">Конфиденциалдылық</a>
          <a href="#">Шарттар</a>
          <a href="#">Қолдау</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
