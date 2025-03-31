import { IoCall } from "react-icons/io5";
import { IoMailUnreadSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import styled from "styled-components";

const Contact = () => {
  return (
 
    <ContactPage>

        <ContactWrapper>

            <ContactHeader>
                <h1>Contact Us</h1>
            </ContactHeader>

            <ContactPadding>

                <Contacts>

                    <div className="generalInq">
                        <p id="fontSize-20px">General Inquiries</p>

                        <div className="flexDiv">
                            <IoCall size={25} color="green"/>
                            <div>
                            <p><a href="tel:+2349000000000">(+234) 09000 0000 00</a></p>
                            <p><a href="tel:+2349000000000">(+234) 09000 0000 00</a></p>
                            </div>
                        </div>

                        <div className="flexDiv">
                            <IoMailUnreadSharp size={25} color="green"/>
                            <div>
                                <p><a href="mailto:hellofarmera@gmail.com">hellofarmera@gmail.com</a></p>
                                <p><a href="mailto:hellofarmera@gmail.com">hellofarmera@gmail.com</a></p>
                            </div>
                        </div>

                        <p id="fontSize-20px">Our Location</p>

                        <div className="flexDiv">
                            <FaLocationDot size={25} color="green"/>
                            <div>
                                <p>Senator Abiru Innovations Labs</p>
                                <p>SAIL Labs, Ikorodu, Lagos</p>
                            </div>
                        </div>

                    </div>

                    <Request>
                        <p id="fontSize-20px">Send Us A Message</p>
                        <form action="" method='POST'>
                            <div className='names'>
                                <input className='john' type="text" name='FirstName' placeholder='FirstName' required/>
                                <input className='john' type="text" name='LastName' placeholder='LastName'  required/>
                            </div>
                            <input id='email' name='email' type="email" placeholder='yourname@mail.com'  required/>
                            <textarea name="Message" id="tA" placeholder='Your Message'  required></textarea>
                            <button id='button' type='submit' formTarget="blank">SEND MESSAGE</button>
                        </form> 

                    </Request>

                </Contacts>

            </ContactPadding>

        </ContactWrapper>

    </ContactPage>

  )
}

export default Contact

const ContactPage = styled.div`

`

const ContactWrapper = styled.div`
    
`

const ContactHeader = styled.div`
    height: 229px;
    background-color: blue;
    background-image: url("/Farmera-helpPage-background-image.jpg");
    background-size: cover; // Changed from contain to cover
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        font-size: 70px;
        color: white;
        text-align: center;

        @media (max-width: 768px) {
            font-size: 40px;
        }

        @media (max-width: 480px) {
            font-size: 32px;
        }
    }
`

const ContactPadding = styled.div`
    padding-top: 100px;
    padding-bottom: 100px;
    background-color: #F4F4F4;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Contacts = styled.div`
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    padding: 40px;
    background-color: white;
    width: 900px;

    @media (max-width: 1050px) {
        width: 90%; // Use percentage instead of fixed width
    }

    @media (max-width: 750px) {
        flex-direction: column; // Stack elements vertically on mobile
        width: 90%;
        gap: 30px;
        padding: 20px;
    }

    .generalInq {
        display: flex;
        flex-direction: column;
        gap: 20px; // Consistent spacing

        @media (max-width: 750px) {
            align-items: center; // Center content on mobile
            text-align: center;
        }
    }

    #fontSize-20px {
        font-size: 20px;
        margin-bottom: 10px;
        
        @media (max-width: 750px) {
            font-size: 18px;
        }
    }

    .flexDiv {
        display: flex;
        align-items: center;
        gap: 15px;

        @media (max-width: 750px) {
            justify-content: center; // Center items on mobile
        }

        p {
            font-size: 15px;
            
            @media (max-width: 750px) {
                font-size: 14px;
            }
        }
    }
`

const Request = styled.div`
    width: 500px;
    margin-top: 18px;

    @media (max-width: 1050px) {
        width: 100%; // Use full width on smaller screens
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .names {
        display: flex;
        justify-content: space-between;
        gap: 15px;

        @media (max-width: 750px) {
            flex-direction: column;
        }

        .john {
            height: 20px;
            width: 100%; // Use full width
            border-radius: 5px;
            padding: 15px;
        }
    }

    #email, #tA {
        width: 100%; // Use full width
        padding: 15px;
        border-radius: 5px;
    }

    #tA {
        height: 100px;
    }

    #button {
        width: 150px;
        height: 50px;
        background-color: #16a34a;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        transition: transform 0.2s ease;

        @media (max-width: 750px) {
            width: 120px;
            height: 40px;
            font-size: 14px;
        }

        &:hover {
            transform: scale(1.05);
            background-color: #15803d;
        }
    }
`



