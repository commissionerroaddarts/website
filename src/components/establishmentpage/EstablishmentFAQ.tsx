import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FAQ } from "@/types/business";

type EstablishmentFAQProps = Readonly<{
  faqs: FAQ[];
}>;

export default function EstablishmentFAQ({ faqs }: EstablishmentFAQProps) {
  return (
    <div className="mt-6">
      <Typography variant="h6" className="text-white mb-4">
        FAQs
      </Typography>
      {faqs.map((faq) => (
        <Accordion
          key={faq.q}
          sx={{
            backgroundColor: "#2B1330",
            color: "white",
            mb: 2,
            borderRadius: "8px",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            sx={{ backgroundColor: "#C4C4C41A", borderRadius: "8px" }}
          >
            <Typography sx={{ fontWeight: "bold" }}>{faq.q}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "white",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            <Typography
              sx={{
                color: "black",
              }}
            >
              {faq.a}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
