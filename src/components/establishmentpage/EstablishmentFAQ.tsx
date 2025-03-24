import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FAQ } from "../../types/business";

type EstablishmentFAQProps = Readonly<{
  faqs: FAQ[];
}>;

export default function EstablishmentFAQ({ faqs }: EstablishmentFAQProps) {
  return (
    <div className="mt-6">
      <Typography variant="h6" className="text-white mb-4">
        FAQs
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          className="bg-[#2B1330] text-white mb-2 rounded-lg"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-white" />}
            className="bg-[#C4C4C41A] rounded-lg"
          >
            <Typography className="font-semibold">{faq.q}</Typography>
          </AccordionSummary>
          <AccordionDetails className="bg-white text-black rounded-b-lg">
            <Typography>{faq.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
