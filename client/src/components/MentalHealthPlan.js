import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
//import { withCookies, Cookies } from 'react-cookie';
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Card,
  Button,
} from "react-bootstrap";
import { Redirect } from "react-router";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import favorites from "../images/favorites.jpg";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasB } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farB } from "@fortawesome/free-regular-svg-icons";
import Popup from "../common/Popup";
import CommonNav from "../common/CommonNav";
import { useGlobalConfigContext } from "../App";
import Pagination from "react-bootstrap/Pagination";

function MentalHealthPlan() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState("");
  const [unit_org, setUnitOrgData] = useState([]);
  const [active, setActive] = useState(false);
  const [favData, setFavData] = useState([]);

  Axios.defaults.withCredentials = true;
  const cookieExists = (document.cookie.match(
    /^(?:.*;)?\s*userId\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];
  /* add by dinhle */
  // const for paging
  const [offset, setOffset] = useState(0);
  const [orgData, setOrgData] = useState([]);
  const [perPage] = useState(3);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setselectedPage] = useState(1);
  const [totalOrg, setTotalOrg] = useState(0);
  const nextClickPaging = (e) => {
    setOffset(offset + perPage);
    setselectedPage(selectedPage + 1);
  };
  const lastClickPaging = (e) => {
    if (totalOrg % perPage == 0) {
      setOffset(totalOrg - perPage);
    } else {
      setOffset(totalOrg - (totalOrg % perPage));
    }
    setselectedPage(pageCount);
  };

  const preClickPaging = (e) => {
    setOffset(offset - perPage);
    setselectedPage(selectedPage - 1);
  };
  const firstClickPaging = (e) => {
    setOffset(0);
    setselectedPage(1);
  };
  // end const for paging

  const logoutUser = () => {
    Axios.post( serverDomain+"/logout", {}, { withCredentials: "true" });
    history.push("/login");
    window.location.reload();
  };

  const getOrganizations = (id) => {
    Axios.get( serverDomain+"/favorites/" + id).then((response) => {
      setActive(id);
      setUnitOrgData(response.data[0]);
    });
  };

  const checkActive = (id) => {
    return id === active;
  };


  useEffect(() => {
    document.title = "Mental Health Plan";
    Axios.get( serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].username);
        setData(response.data);
        Axios.get( serverDomain+"/favorites/mentalHealthPlanAll/").then((response) => {
          console.log("size " + response.data.length)
          setTotalOrg(response.data.length);
          setPageCount(Math.ceil(response.data.length / perPage));
        });
        Axios.post( serverDomain+"/favorites/mentalHealthPlanPaging/", {
          offset: offset,
          perPage: perPage,
        }).then((response) => {
          setOrgData(response.data);
          console.log(response.data);
        });
      } else {
        history.push("/login");
      }
    });
  }, [offset]);
  return (
    <div className="container home">
      <CommonNav />
      <div className="row justify-content-center">
        <div className="">
          <Card style={{ cursor: "pointer" }} onClick="">
            <Card.Body>
              <Card.Title className="cardTitleCustom">Mental Health Plan</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
      {totalOrg > 0 ? (
        <div className="homeDisplay">
          <div className="disp1">
            <h5>Total Organizations: {totalOrg}</h5>
            {orgData.map(function(org) {
              if (loggedInUser.length == 0) {
                history.push("/login");
              }
              return (
                <div
                  onClick={() => getOrganizations(org.org_id)}
                  className={classNames({
                    ldisp: true,
                    active: checkActive(org.org_id),
                  })}
                >
                  <div className="ttl">{org.name}</div>
                  <div className="subSecond">{org.address}</div>
                  <div className="subttl">{org.type}</div>
                </div>
              );
            })}
            <div className="pagingWrap">
              <Pagination>
                {selectedPage <= 1 ? (
                  <Pagination.First disabled />
                ) : (
                  <Pagination.First onClick={() => firstClickPaging()} />
                )}

                {selectedPage <= 1 ? (
                  <Pagination.Prev disabled />
                ) : (
                  <Pagination.Prev onClick={() => preClickPaging()} />
                )}
                <Pagination.Item>
                  page {selectedPage} of {pageCount}
                </Pagination.Item>

                {selectedPage >= pageCount ? (
                  <Pagination.Next disabled />
                ) : (
                  <Pagination.Next onClick={() => nextClickPaging()} />
                )}

                {selectedPage >= pageCount ? (
                  <Pagination.Last disabled />
                ) : (
                  <Pagination.Last onClick={() => lastClickPaging()} />
                )}
              </Pagination>
            </div>
          </div>
          <div className="disp2">
          <h3>Finding Potential Emplyment in the Future</h3>
            <p>
            <b><h5>Maintain a Proper Work Ethic!</h5></b>
            <p>
            A work ethic is a set of moral principles an employee uses in his/her job. <b>These are 
            five factors that indicate a strong work ethic:</b>
            <ul>
              <li><u>Integrity</u>
              <ul>
                <li>Reward yourself! When you are honest with yourself about something that 
                  you did wrong, that is personal growth!
                </li>
                <li>Check in with yourself! Do a scan of your own behaviors and actions 
                  regularly to see how you are doing. Examine yourself and your efforts.
                </li>
                <li>Reinforce others! Sometimes other people will let you know something you did, 
                  or are about to do, is not right. 
                  Thank these people sincerely. They are giving you the potential for personal growth!
                </li>
              </ul>
              </li>

              <li><u>Sense of Responsibility</u>
              <ul>
                <li>A strong sense of responsibility affects how an employee works. 
                  The more responsible an employee feels for their job performance, 
                  the more effort and time they will put into making sure they are doing a good job.
                </li>
                </ul>
              </li>

              <li><u>Emphasis on Quality</u> Employees with a strong work ethic care about their work. They do their best to produce the best 
              quality of work that they can.
              <ul>
                <li>Don’t just do the bare minimum to get by. You may be completing 
                  your work but putting in the effort shows that you care about the 
                  work you are doing.
                </li>
                <li>Producing the best quality can help improve your company’s overall quality! 
                  This can make you feel 
                  good about yourself, and your employer will appreciate the effort!
                </li>
                </ul>
              </li>

              <li><u>Discipline</u> Discipline helps you stay focused on your goals and 
              tasks needed to complete assignments.
              <ul>
                <li>Remove temptations! Sometimes a messy workspace may cause you to be distracted. 
                  Tidy up a little so you can focus on your work!
                </li>
                <li>Schedule breaks, treats, and rewards for yourself! If you can’t take a break 
                  during work, bring a treat for yourself or a little reward like a piece of chocolate. 
                  Take a second for you and then get back to work!
                </li>
                <li>Forgive yourself and move forward! Sometimes we slip up. We are late to work, 
                  we are unable to finish a project, or other instances come up. Learn from this 
                  experience! See what you did or what you should have done and move forward. 
                  We are all humans and are constantly learning and growing!
                </li>
                </ul>
              </li>

              <li><u>Sense of Teamwork</u>
              <ul>
                <li>Many jobs require working together in teams. 
                  Building trust and respect between team members is important for quality work.
                  You don’t have to be best friends with your team, but remember to 
                  treat them with respect and they’ll treat you with respect. This will make work go much smoother 
                  and help keep you focused on the tasks!
                </li>
                </ul>
              </li>
            </ul>
            </p>

            <b><h5>Creating a Resume</h5></b>
            <p>
              <ul>
                <li><u>What is a resume?</u> A document that outlines your skills, 
                  experiences and accomplishments. This allows potential employers to see 
                  if you are a good fit for the job.
                </li>
                <li><u>What does a resume look like?</u>
                    Resumes do not all look alike, but here are some general guidelines that 
                    you should follow to make sure your resume looks professional. 
                    This includes printing on white paper with black text and using 
                    standard fonts such as Times New Roman or Arial.
                </li>
                <li><u>What goes on a resume?</u> Your name and contact information,
                  Your objective explaining what type of position you are looking for 
                  and your employment goals OR a summary statement that describes a 
                  short description of your qualifications for the job opening. Work experience, 
                  Education, Skills, Volunteer and other experience</li>
                <li><u>What if I don’t have work experience?</u> Don’t worry! Just because you have not 
                  had a job in the past does not mean you do not have experience. 
                  Experience can come from many different places, such as recreational 
                  activities and volunteering, as well as work within the home.
                </li>
                <li>
                <u>What if I already have a resume?</u>
                Great! You are one step closer to applying for a job. 
                Make sure your resume is up to date with your most recent employment, 
                contact information, and references.
                Proofread your resume and make sure grammar and spelling is correct.
                It is always
                helpful to have someone else read your resume and give you some feedback!
                </li>
                <li>
                <u>Any other resume tips?</u>
                When providing contact information, give your full name, phone number, 
                and use a professional email.
                Make sure your resume is easy to read. Use a size 10 or 12 font with standard 
                fonts such as Times New Roman or Arial.
                Keep your resume plain and simple. Use only black text no multiple colors.
                Divide the sections or headings of your resume with larger text, sized 14 or 16. 
                This will make it clear where each section (such as employment, education, skills) begins and ends.
                Information in each section should be in chronological order, with the most recent 
                information first, all the way down to the oldest information. This will show how you have 
                grown and progressed over time

                </li>
              </ul>
            </p>

            <b><h5>Applying to Jobs</h5></b>
            <p>
            <u>Apply to 5-10 jobs per week!</u> The more job applications you submit, 
            the more opportunities you have for gaining employment. Here are some helpful tips:
            <ul>
                  <li>Read each job posting carefully to determine how you should apply. Some have online 
                    applications and 
                    others want you to email them your resume.</li>
                  <li>Go to places of employment in person. This is a great opportunity to make 
                    a good first impression and allows employers to put a face with your resume. 
                    Even if they are not currently hiring, many employers will put your resume on file. 
                    When a job opens up, they will be more likely to remember you if they have met 
                    you already!</li>
            </ul>
            <u>Follow-up on your job applications!</u>
            </p>
            <p>One week after sending in your application, call and ask about the status of your application.
              <ul>
                <li>Don’t get discouraged if you don’t hear from a potential employer right away! 
                  Business owners can be very busy and it may take a few weeks to go 
                  through all of the applications they receive.</li>
                  <li>Following-up on your application is a <b>GREAT</b> way 
                  to show employers that you are serious about the position.</li>
              </ul>
            </p>
            <b><h5>Addressing a period of incarceration/criminal history</h5></b>
            <p>
            It is important to make your resume as effective as possible so that 
            you can get a job interview and the job you are applying for. 
            It is important to be honest on your resume, application, and in your 
            face-to-face interview.
            <ul>
              <li>When completing job applications you will be asked about your criminal record. 
                Remember to be honest and select “yes” when asked if you have ever been arrested. 
                In the details section, you can write “will explain in interview.”.</li>
                <li>If the person you are interviewing with asks you a legal question about 
                  your criminal history, explain what happened, but keep it positive and 
                  let the individual know you are interested in making a positive contribution 
                  and change to your family, community, and the employer.</li>
                <li>It is important to highlight related training and work experience 
                  even if this work was completed while in prison or jail. In your 
                  resume’s Work Experience section, write the name of the facility, 
                  your title, the dates you worked in this position, and your responsibilities.</li>
            </ul>
            </p>

            <b><h5>Preparing for a Job interview</h5></b>
            <p> You got a job interview...what’s next?</p>
            <p> Congratulate yourself! You should be very proud.</p>
            <p>Interviews are not easy but each one will help prepare you for the next.
                Do not be discouraged if you do not hear back after the interview. 
                Employers often interview many people for only one position.
                <u>Treat each interview as a learning experience.</u>
            </p>

            <p>Here are some great tips on how to prepare for job interviews. 
              Feel free to try one or all of them to help prepare you for the big day.
              <ul>
                <li>
                  <u>Personal hygiene is key!</u>
                  <ul>
                    <li>Personal hygiene is always important, but it is extremely 
                      important during a job interview. First impressions matter, 
                      so showing up to the interview clean, fresh, and ready to go 
                      will help you make a great first impression. Here are some tips 
                      for maintaining personal hygiene! Bathe regularly, Trim your nails, 
                      Brush and floss your teeth, Wash your hands regularly
                    </li>
                  </ul>
                </li>

                <li>
                  <u>Dress for Success</u>
                  <ul>
                    <li>Dressing professionally for a job interview can set a great first impression. 
                    </li>
                  </ul>
                </li>

                <li>
                  <u>Prepare for interview questions!</u> One of the best ways to prepare 
                  for an interview is to practice answers to commonly asked questions. 
                  Below is a list of ten of the most commonly asked interview questions asked 
                  by employers. Write down your responses
                  <ul>
                    <li>Tell me about yourself.</li>
                    <li>Why do you want to work for us?</li>
                    <li>What do you know about our company?</li>
                    <li>Why did you leave your past job?</li>
                    <li>Tell me about your experience at your last job</li>
                    <li>What experience do you have doing ______ (fill 
                      in the major responsibilities of the job you are applying for)?</li>
                    <li>Tell me about your strengths or things you are good at.</li>
                    <li>Tell me about your weaknesses or things that you are not so good at.</li>
                    <li>Tell me about a time you had to handle a difficult situation at work.</li>
                    <li>What questions do you have for me?</li>
                  </ul>
                </li>
              </ul>
            </p>

              <p>Asking potential employers questions shows that you are interested in their 
                company. Write down at least 3 questions you can ask employers. Examples include 
                questions like “What qualities are you looking for in potential employees?” or 
                more technical questions like “What are the hours for this position?”.</p>
              
              <p><u>Congrats! You completed a job interview… What's next?</u></p>
              <p>After your interview, make sure to stand out. Stand out from the crowd 
                and send a thank you note to employers after your interview. 
                You can send a handwritten thank you note, or if you know their email address, 
                you can e-mail it to them. Thanking employers for their time and consideration 
                will give you a step up above the rest of the applicant pool.</p>

                <b><h5>Maintaining Employment</h5></b>
            <p> Tips for Maintaining Employment
              <ul>
                <li><u>Understand your role and expectations</u>
                  <ul>
                    <li>
                    You may feel as though you are doing a fantastic job, but 
                    if your expectations differ from those of your manager or boss, 
                    there is going to be conflict. Have a good understanding of what is expected 
                    of you. If you feel that the expectations are unrealistic, then you need 
                    to approach your supervisor and explain the situation.
                    </li>
                  </ul>
                </li>

                <li><u>Be a team player</u>
                  <ul>
                    <li>
                    One of the most important aspects of maintaining a professional 
                    image is being a good team player and contributing fairly to the team 
                    objectives. No one likes a colleague who does not do their fair share of 
                    the work. Be willing to share your expertise, but also be willing to 
                    learn new skills.

                    </li>
                  </ul>
                </li>

                <li><u>Be visible</u>
                  <ul>
                    <li>
                    Leaving early every day and not attending social gatherings is 
                    not the right way to maintain a professional image. Being visible is 
                    all part of being a good team player. This does not mean you have 
                    to be best friends with every person you work with, but there is 
                    no need to isolate yourself either.

                    </li>
                  </ul>
                </li>

                <li><u>Ask for feedback; learn from your supervisor and don’t be afraid to 
                  ask for help</u>
                  <ul>
                    <li>
                    Do not be afraid to ask for feedback. To grow and improve ourselves, 
                    we need feedback on how we are performing in our jobs. Positive feedback 
                    is always fantastic, however don’t be put down by negative feedback and 
                    certainly do not hold grudges. Learn from your mistakes and strive to do 
                    better going forward.

                    </li>
                  </ul>
                </li>

                <li><u>Be on time</u>
                  <ul>
                    <li>
                    Whether it is with showing up for work, returning from breaks, 
                    going to meetings, or turning in assignments.
                    </li>
                  </ul>
                </li>

                <li><u>Keep your supervisor informed</u>
                  <ul>
                    <li>
                    If you are running late, having a difficult time getting to 
                    work, or will be absent, let your supervisor know. This is part of 
                    gaining his/her confidence.
                    </li>
                  </ul>
                </li>

                <li><u>Try your best</u>
                  <ul>
                    <li>
                    Always finish an assignment, no matter how much you would 
                    rather be doing something else. It is always good to have something 
                    to show for the time you have spent.
                    </li>
                  </ul>
                </li>

                <li><u>Show a positive attitude</u>
                  <ul>
                    <li>
                    The more you stay positive, even if you're in a tough situation, 
                    the better you'll be able to manage.
                    </li>
                  </ul>
                </li>

                <li><u>Follow the rules</u>
                  <ul>
                    <li>
                    The rules are there to give the greatest number of people the best 
                    chance of working together well and getting the job done.
                    </li>
                  </ul>
                </li>

                <li><u>Avoid the temptation to criticize your company, coworkers, or customers online</u>
                  <ul>
                    <li>
                    Social networking sites like TikTok, Facebook, Twitter, and blogs offer many 
                    opportunities to spout off - remember that anyone in the world can find what 
                    you put online and that employers may be able to take action against any 
                    employee whose online actions hurt the company or its business in some way.
                    </li>
                  </ul>
                </li>

                <li><u>Try to avoid ever saying "that's not my job”</u>
                  <ul>
                    <li>
                    Many, if not most, managers earned their positions by doing work 
                    turned down by coworkers who were in the habit of saying that, and they 
                    appreciate employees who help get the job done, whatever it is.
                    </li>
                  </ul>
                </li>

                <li><u>Show pride in yourself and respect toward others</u>
                  <ul>
                    <li>
                    Never let yourself be heard uttering minority-related slurs or other 
                    derogatory terms in reference to yourself or to others. Use of such 
                    terms perpetuates undesirable stereotypes and inevitably disturbs others. 
                    It also tends to make others doubt your maturity and competence. The best 
                    way to get respect is to show respect toward yourself and others.
                    </li>
                  </ul>
                </li>

                <li><u>Distinguish yourself</u>
                  <ul>
                    <li>
                    Pick out one or more things in your job to do better than anyone else. 
                    Become known as the "go-to" person for such things. That will help managers 
                    remember you favorably at times when you really need to be remembered.
                    </li>
                  </ul>
                </li>

              </ul>

                  

            </p>

            </p>
          </div>
        </div>
      ) : (
        <div className="singleDisplay">
          <h3>There is no favorites</h3>
        </div>
      )}
      <div>
        
      </div>
    </div>
  );
}

export default MentalHealthPlan;
