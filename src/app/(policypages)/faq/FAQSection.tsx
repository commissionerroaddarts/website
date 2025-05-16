"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
const venueFaqs = [
  {
    question:
      "What are the official height and throwing distance for a dartboard?",
    answer: `The correct height for your dartboard is 5’8” from the ground to the center of your dartboard or bullseye. This is the same whether you are using a bristle or electronic dartboard.\n\nIn accordance with the World Darts Federation, the correct distance from your dartboard for steel tip darts is 7’9 1/4” (292 cm) from the bullseye (diagonal measurement) to the oche (throw line).\n\nThe most commonly used regulation distance for soft tip (or electronic dartboards) is a distance of 9’9 3/4” (299 cm) diagonal measurement from the bullseye to the oche.`,
  },

  {
    question: "How does listing my venue on Road Darts help my business?",
    answer:
      "Road Darts connects your venue with dart players actively looking for places to throw. Whether you host leagues, tournaments, or casual games, a listing helps increase foot traffic, drive sales, and build a loyal community of throwers.",
  },
  {
    question: "What kind of venues can be listed?",
    answer:
      "Any location that offers steel tip or soft tip dartboards – including bars, restaurants, clubs, halls, and even dart cafés. We also support online dart leagues and tournaments.",
  },
  {
    question: "How much does it cost to list my venue?",
    answer:
      "We offer flexible pricing, including a basic free listing and upgraded promotional packages. Contact us for special launch offers.",
  },
  {
    question: "Can I advertise dart events like leagues or tournaments?",
    answer:
      "Absolutely! You can promote events, happy hours, specials, and more. Upgraded plans include event promotion on our home page, social feeds, and newsletters.",
  },
  {
    question: "How do I update or manage my venue listing?",
    answer:
      "After signing up, you’ll receive access to a dashboard where you can manage your venue profile, update board types, upload images, and post event details.",
  },
  {
    question: "What makes Road Darts different from other platforms?",
    answer:
      "We’re 100% dart-focused. Our platform was built by players, for players, with an emphasis on local discovery, social interaction, and real-time community engagement.",
  },
];

const playerFaqs = [
  {
    question: "Do I need to pay to create a player profile?",
    answer:
      "No! Signing up as a player is free. This allows you to search for venues, rate boards, post reviews, and connect with others in the dart community.",
  },
  {
    question: "What’s the benefit of creating a player account?",
    answer:
      "Creating an account lets you track your favorite spots, rate venues, share match requests, and participate in local and online dart conversations.",
  },
  {
    question: "Can I post photos or videos?",
    answer:
      "Yes — as long as they follow our content guidelines (no offensive, graphic, or disrespectful material). Show off great throwing lanes, league nights, or fun gatherings.",
  },
  {
    question: "Is my information shared with anyone?",
    answer:
      "No. We take privacy seriously and never sell or share your personal data. Payment info is processed securely through Stripe and never stored by us.",
  },
  {
    question: "Can I use Road Darts to find other players or set up a match?",
    answer:
      "Yes! You can post requests for casual matches, league partners, or just meet up with others on the road. It’s a great way to stay sharp and meet new friends.",
  },
  {
    question: "How do I report inappropriate content or users?",
    answer:
      "We’re a community of good people with a good vibe. You can report content or users via your dashboard or by emailing support@roaddarts.com.",
  },
];

const renderAccordion = (data: { question: string; answer: string }[]) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: [0, 20, 0],
        transition: {
          duration: 0.5,
          staggerChildren: 0.2,
          delayChildren: 0.2,
        },
      },
    }}
  >
    {data.map((item) => (
      <motion.div
        key={item.question}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <Accordion
          sx={{
            background: "#8224E3",
            color: "white",
            mb: 2,
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-white" />}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: "1.2rem" }}
            >
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" sx={{ fontSize: "1rem" }}>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </motion.div>
    ))}
  </motion.div>
);

export default function FaqSection() {
  return (
    <Container maxWidth="lg" className="pb-10">
      <Box className="text-center mb-10">
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.5rem", md: "2rem", marginTop: "20px" } }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography variant="subtitle1" className="text-white">
          Everything you need to know about Road Darts
        </Typography>
      </Box>

      <Box className="flex flex-col items-center ">
        <Box className="mb-5 border-b-2 border-dashed pb-5">
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "1.2rem",
                md: "1.7rem",
                marginBottom: "10px",
                textAlign: { xs: "center", md: "left" },
              },
            }}
          >
            Venue Marketing FAQs
          </Typography>

          {renderAccordion(venueFaqs)}
        </Box>

        <Box className="mb-5">
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1rem", md: "1.7rem", marginBottom: "10px" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Player & Social Sign-Up FAQs
          </Typography>
          {renderAccordion(playerFaqs)}
        </Box>
      </Box>
    </Container>
  );
}
