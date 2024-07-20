import "./Dashboard.module.css";
import Wrapper from "../components/Wrapper";

const Dashboard = () => {
  const cardData = [
    {
      icon: "bx bxl-mailchimp",
      company: "Mailchimp",
      daysAgo: "1 day ago",
      badge: "Design",
      heading: "Senior Product Designer - Singapore",
      progressWidth: "50%",
      applied: "32",
      capacity: "50",
    },
    {
      icon: "bx bxl-dribbble",
      company: "Dribbble",
      daysAgo: "4 days ago",
      badge: "Product",
      heading: "Junior Product Designer - Singapore",
      progressWidth: "50%",
      applied: "42",
      capacity: "70",
    },
    {
      icon: "bx bxl-reddit",
      company: "Reddit",
      daysAgo: "2 days ago",
      badge: "Design",
      heading: "Software Architect Java - USA",
      progressWidth: "50%",
      applied: "52",
      capacity: "100",
    },
  ];

  return (
    <Wrapper>
      <nav aria-label="breadcrumb" className="mx-3">
        <ol className="breadcrumb pt-3">
          <li className="breadcrumb-item active" aria-current="page">
            DashBoard
          </li>
        </ol>
      </nav>

      <div className="container">
        <div className="row">
          {cardData.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="card p-3 mb-2">
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <div className="icon">
                      <i className={card.icon}></i>
                    </div>
                    <div className="ms-2 c-details">
                      <h6 className="mb-0">{card.company}</h6>
                      <span>{card.daysAgo}</span>
                    </div>
                  </div>
                  <div className="badge">
                    <span>{card.badge}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="heading">{card.heading}</h3>
                  <div className="mt-5">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: card.progressWidth }}
                        aria-valuenow={parseInt(card.progressWidth)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <div className="mt-3">
                      <span className="text1">
                        {card.applied} Applied{" "}
                        <span className="text2">
                          of {card.capacity} capacity
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
