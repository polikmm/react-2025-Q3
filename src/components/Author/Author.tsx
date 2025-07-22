import './styles.css';
import profile from '../../assets/avatar.jpeg';
import githubLogo from '../../assets/github-logo.svg';
import rssLogo from '../../assets/rs_school_js.svg';

export default function Author() {
  return (
    <div className="author">
      <header>
        <div className="container">
          <nav className="nav">
            <button className="burger" id="burger"></button>
            <ul className="nav-list">
              <li className="nav-list__item">
                <a href="#contacts">Contacts</a>
              </li>
              <li className="nav-list__item">
                <a href="#skills">Skills</a>
              </li>
              <li className="nav-list__item">
                <a href="#education">Education</a>
              </li>
              <li className="nav-list__item">
                <a href="#english">English</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="grid">
        <div className="left-side">
          <section className="section" id="profile">
            <div className="container">
              <img
                src={profile}
                alt="Danilova Mariia"
                className="profile__img"
              />
              <h1 className="heading">Danilova Mariia</h1>
              <p className="profile__text">Junior Front-End Developer</p>
            </div>
          </section>

          <section className="section" id="contacts">
            <div className="container">
              <h2 className="contacts__heading heading">Contacts</h2>
              <ul className="section-contacts-items">
                <li className="section-contacts__item">
                  <span>Location:</span> Georgia, Tbilisi
                </li>
                <li className="section-contacts__item">
                  <span>Phone:</span>
                  <a href="tel:+995591093773">+995 591 093 773</a>(ge)
                  <br />
                  <a href="tel:+7(985)8026969"> +7 (985) 802 69 69</a>(ru)
                </li>
                <li className="section-contacts__item">
                  <span>Email:</span>
                  <a href="mailto:polikmm@mail.ru">polikmm@mail.ru</a>
                </li>
                <li className="section-contacts__item">
                  <span>GitHub:</span>
                  <a href="https://github.com/polikmm">polikmm</a>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="right-side">
          <section className="section" id="education">
            <div className="container">
              <h2 className="education__heading heading">Education</h2>
              <ul className="section-education-items">
                <li>
                  Self-Education
                  <ul className="section-education-items-self-education">
                    <li className="section-education-items-self-education__item">
                      <a href="https://rs.school/courses/javascript-preschool-ru">
                        JS / Front-end Pre-school RU Course
                      </a>
                    </li>
                    <li className="section-education-items-self-education__item">
                      EPAM ST 2025Q1
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <section className="section" id="skills">
            <div className="container">
              <h2 className="skills__heading heading">Skills</h2>
              <ul className="section-skills-items">
                <li className="section-skills__item">HTML</li>
                <li className="section-skills__item">CSS</li>
                <li className="section-skills__item">JavaScript(Basic)</li>
                <li className="section-skills__item">Git</li>
                <li className="section-skills__item">React</li>
                <li className="section-skills__item">Jest+RTL</li>
              </ul>
            </div>
          </section>

          <section className="section" id="english">
            <div className="container">
              <h2 className="english__heading heading">English</h2>
              <p className="section-english__text">B1+</p>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="container footer">
          <a href="https://github.com/polikmm" className="footer__git">
            <img src={githubLogo} alt="gitHub" />
          </a>
          <p className="footer__year">2025</p>
          <a
            href="https://rs.school/courses/javascript-ru"
            className="footer__rsschool"
          >
            <img src={rssLogo} width="86" height="32" alt="RsSchool" />
          </a>
          <p className="course-info">
            This project was created as part of the{' '}
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              RS School React course
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
