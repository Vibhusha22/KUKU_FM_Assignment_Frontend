function Header() {
  return (
    <>
      <header className="header py-3 mb-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-center align-items-center">
          <a
            href="/"
            className="header-link d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-decoration-none"
          >
            <svg className="bi me-2" width="40" height="32">
              <use xlinkHref="#bootstrap"></use>
            </svg>
            <span className="fs-4 header-title">Audio Books</span>
          </a>
        </div>
      </header>
    </>
  );
}

export default Header;
