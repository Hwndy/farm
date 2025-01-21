// import React from "react";
import styled from "styled-components";
import { Users, Leaf, Heart, } from "lucide-react";

const teamMembers = [
  {
    name: "SULAIMON IBRAHIM SEMAKO",
    role: "Full Stack Developer",
    image: "https://res.cloudinary.com/df5zacepv/image/upload/v1733943586/Ibrahim_exl4nj.jpg",
  },
  {
    name: "BLESSING ENE UDEBUANI",
    role: "Frontend Developer",
    image: "https://res.cloudinary.com/df5zacepv/image/upload/v1730437040/profile_zqrc6m.jpg",
  },
  {
    name: "OWONUBI TOLUWASE ITUNUOLUWA",
    role: "Frontend Developer",
    image: "https://res.cloudinary.com/df5zacepv/image/upload/v1733750364/tolu_y6l8xv.jpg",
  },
  {
    name: "OGUNSINA TAIWO DOLAPO",
    role: "Frontend Developer",
    image: "https://res.cloudinary.com/df5zacepv/image/upload/v1733750286/taiwo_n1lfsy.jpg",
  },
  {
    name: "OLUWAFEMI OPEOLUWA OLUWASEUN",
    role: "Frontend Developer",
    image: "https://res.cloudinary.com/df5zacepv/image/upload/v1733750220/femi_wamqzf.jpg",
  },
  {
    name: "OBASI CHUKWWUEMEKA UDE",
    role: "Full Stack Developer",
    image: "https://res.cloudinary.com/df5zacepv/image/upload/v1737401985/WhatsApp_Image_2025-01-20_at_10.49.27_58ddba97_eihwrt.jpg",
  },
  {
    name: "ADEDOKUN FAROUQ ADETUNJI",
    role: "Frontend Developer",
    image: "https://res.cloudinary.com/df5zacepv/image/upload/v1733750220/farooq_bperuq.jpg",
  },
];

// About Component
const About = () => {
  return (
    <AboutContainer>
      {/* Hero Section */}
      <HeroSection>
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80"
          alt="Farm landscape"
        />
        <Overlay />
        <HeroContent>
          <Title>About Farmera</Title>
          <Text className="bout">
            {/* Also, this about Farmera needs to be centralized */}
          Farmera is a platform that connects farmers and buyers, enabling a seamless marketplace for agricultural
          goods. Our mission is to empower farmers and provide fresh, high-quality products to buyers efficiently.     </Text>
        </HeroContent>
      </HeroSection>

      {/* Mission Section */}
      <Section>
        <SectionContent columns={3}>
          
          <Feature>
            <Users className="icon" />
            <SubTitle>Community First</SubTitle>
            <Text>Supporting local farmers and creating sustainable communities.</Text>
          </Feature>
          <Feature>
            <Leaf className="icon" />
            <SubTitle>Sustainable Practices</SubTitle>
            <Text>Promoting eco-friendly farming and distribution methods.</Text>
          </Feature>
          <Feature>
            <Heart className="icon" />
            <SubTitle>Quality Promise</SubTitle>
            <Text>Ensuring the highest quality produce for our customers.</Text>
          </Feature>
        </SectionContent>
      </Section>

      {/* About Us Section */}
      <Section bgColor="#f9fafb">
        <SectionContent columns={1}>
          <StoryContent>
            <SubTitle>Our Story</SubTitle>
            <Text>
              Founded in 2024, Farmera was born from a simple idea: to bridge the gap between local farmers and
              consumers. We believe in creating a sustainable food system that benefits both producers and consumers.
            </Text>
            <Text>
              Our platform hopes to  grow and support hundreds of local farmers, making fresh produce accessible to
              thousands of households while promoting sustainable farming practices.
            </Text>
            <Text>
              Today, we continue to innovate and expand our services, always keeping our core mission at heart:
              supporting local agriculture and providing the freshest produce to our customers.
            </Text>
          </StoryContent>
        </SectionContent>
      </Section>
      <Section>

<SectionContent>

  <SubTitle>Our Mission</SubTitle>
  <Text>
  To create a sustainable ecosystem where farmers can thrive and buyers can access fresh produce effortlessly.
  </Text>
</SectionContent>

</Section>
      {/* Team Section */}
      <Section>
        <SectionContent columns={4}>
          <SubTitle>Our Team</SubTitle>
          <Text>
            We are a group of passionate individuals committed to bridging the gap between farmers and the market using
            innovative technology.
          </Text>
         <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamCard key={index}>
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>

            </TeamCard>
          ))}
         </TeamGrid>
        </SectionContent>
      </Section>

      
    </AboutContainer>
  );
};

export default About;

// Styled Components
const AboutContainer = styled.div`
  padding-top: rem;
  background-color:  #F0FDF4;
`;

const HeroSection = styled.div`
  position: relative;
  height: 280px;


  img {
  position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 0px 0px 8px 8px;
  }
    .bout{
    color: white;
    font-size: 1.2rem;
    justify-content:center;
    

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }

    }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 0.6;
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding:  1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  text-align: center; /* Ensure text is centered */
  color: white;


  font-size: 2rem;
    /* font-weight: ; */
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      font-size: 3rem;
    }

  p {
    font-size: 1.25rem;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
`

const Section = styled.section`
  padding: 4rem 0;
  background-color: ${(props) => props.bgColor || "#FAF9F6"};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #FAF9F6;
  
  `;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  .grid {
    display: grid;
    gap: 3rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(${(props) => props.columns || 1}, 1fr);
    }
  }
`;

const Feature = styled.div`
  text-align: center;

  .icon {
    height: 3rem;
    width: 3rem;
    color: #16a34a;
    margin: 0 auto 1rem;
  }
`;

const StoryContent = styled.div`
  p {
    color: #6b7280;
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #065f46;
  margin-bottom: 1rem;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  color: ${(props) => props.color || "#6b7280"};
  text-align: center;
`;

const TeamGrid = styled.div`
  /* display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  } */

  max-width: 1200px;
  margin: 0 auto;
  /* padding: 0 1rem; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 30px;
`;


const TeamCard = styled.div`
   width: 250px;
   background-color: #e8f5ed;
  padding: 10px;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* border: 1px solid; */
  text-align: center;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
  }
  img {
    width: 230px;
    height: 13rem;
    border-radius: 0.375rem;
    object-fit: cover;
  }

  h3 {
    margin: 0.5rem 0 0.25rem;
    font-size: 1.25rem;
    color: #065f46;
  }

  p {
    font-size: 1rem;
    color: #02050f;
  }
`;

