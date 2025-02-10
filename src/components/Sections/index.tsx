import { services_info } from "../../const/servicesInfo";
import "./style.css";

const Sections = () => {
  return (
    <>
      {services_info &&
        services_info.map((el, ind) => {
          return (
            <div key={ind} className={`homepage-service${ind + 1}`}>
              <div className={`homepage-service-about${ind + 1}`}>
                <img src={el.image} alt="" />
                <div className="homepage-service-about-text">
                  <h2>{el.main_title}</h2>
                  <p>{el.main_text}</p>
                </div>
              </div>
              <div className="homepage-service-advantages">
                <h2>{el.advantage_title}</h2>
                <div className="homepage-service-advantage-sections">
                  <div className="homepage-service-advantage-section">
                    <svg
                      width="273"
                      height="244"
                      viewBox="0 0 273 244"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="136.312"
                        cy="122"
                        rx="136.312"
                        ry="122"
                        fill={el.circle_color1}
                      />
                    </svg>
                    <img
                      className="homepage-service-advantage-section-image"
                      src={el.image1}
                      alt=""
                    />
                    <p>{el.advantage_text1}</p>
                  </div>
                  <div className="homepage-service-advantage-section">
                    <svg
                      width="273"
                      height="244"
                      viewBox="0 0 273 244"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="136.312"
                        cy="122"
                        rx="136.312"
                        ry="122"
                        fill={el.circle_color2}
                      />
                    </svg>
                    <img
                      className="homepage-service-advantage-section-image"
                      src={el.image2}
                      alt=""
                    />
                    <p>{el.advantage_text2}</p>
                  </div>
                  <div className="homepage-service-advantage-section">
                    <svg
                      width="273"
                      height="244"
                      viewBox="0 0 273 244"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="136.312"
                        cy="122"
                        rx="136.312"
                        ry="122"
                        fill={el.circle_color3}
                      />
                    </svg>
                    <img
                      className="homepage-service-advantage-section-image"
                      src={el.image3}
                      alt=""
                    />
                    <p>{el.advantage_text3}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Sections;
