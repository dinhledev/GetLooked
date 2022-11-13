import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
//import { withCookies, Cookies } from 'react-cookie';
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import CommonNav from "../common/CommonNav";

function About() {
  useEffect(() => {
    document.title = "About Us";  
  }, []);
  return (
    <>
    <CommonNav />
    <div className="container about">
      <h2>About Us</h2><br />
      <div>
        <h4><u>Mission Statement</u></h4>
          <p>Here at GetLooked we are looking towards a new an improved way of connecting 
          athletes with coaches and recruiters. We strive to provide a simple way of interaction for althetes and an even simplier way for recruiters and coaches to scout talent that has been overlooked. </p>
        <h4><u>Vision</u></h4>
          <p>GetLooked is not simpliy a viewing and messageing platform but a platform where you are your own sales person, cutting out cost that comes with in person recruiting.We envision a place where simple connections can be made with the click of a button.</p>
      </div>
      <h2>Contact Us</h2><br />
      <div>
        <form>
        <label for="firstN">Full Name:</label><br />
        <input placeholder="Full Name" required></input><br />
        <br /><label for="email">Email:</label><br />
        <input type="email" id="email" name="email" placeholder="Email" required></input><br />
        <br /><label for="mess">Message:</label><br />
        <textarea name="message" id="mess" rows="10" cols="50" placeholder="Type Message Here" required></textarea><br />
        <br /><input type="submit"  />
        <input type="reset"/>
        </form>
      </div>
	<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.043615175345!2d-77.31393578518951!3d38.831461958434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64e607b427ebd%3A0xd766a653e6557544!2sGeorge%20Mason%20University!5e0!3m2!1sen!2sus!4v1664320715882!5m2!1sen!2sus" width="100%" height="100%"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    </>
  );
}

export default About;
