import { Typography } from "@mui/material";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import PlaceIcon from "@mui/icons-material/Place";
import * as classes from "./restaurant.component.styles";
import { RestaurantInfo, Items, PriceByRation } from "./restaurant.vm";
import { AccordionSummaryStyled } from "common/components";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { CleaningServices } from "@mui/icons-material";

interface PropsRation {
  ration: PriceByRation[];
}

const RationComponent: React.FC<PropsRation> = (props) => {
  const theme = useTheme();
  const { ration } = props;

  return (
    <>
      {ration.map((item) => (
        <div key={item.rationName} className={classes.dishContainer(theme)}>
          <div className={classes.rationText(theme)}>
            <Typography className={classes.rationIndent(theme)}>
              {item.rationName}
            </Typography>
          </div>
          <div className={classes.dishPrice(theme)}>
            <Typography>{item.price} €</Typography>
          </div>
        </div>
      ))}
    </>
  );
};

interface PropsItemsComponent {
  items: Items[];
}
export const DishesComponent: React.FC<PropsItemsComponent> = (props) => {
  const { items } = props;
  const theme = useTheme();

  return (
    <div className={classes.dishesContainer(theme)}>
      {items.map((item) => (
        <div className={classes.dishContainer(theme)}>
          <div key={item.name} className={classes.fullWidth(theme)}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {item.name}
            </Typography>
            {item.description ? (
              <Typography>{item.description}</Typography>
            ) : null}
            {item.priceByRation ? (
              <RationComponent ration={item.priceByRation} />
            ) : null}
          </div>
          {item.price ? (
            <div className={classes.dishPrice(theme)}>
              <Typography>
                {item.price} €{item.unit}
              </Typography>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

interface Props {
  restaurantName: string;
  restaurantMenuInfo: RestaurantInfo;
}

export const RestaurantComponent: React.FC<Props> = (props) => {
  const theme = useTheme();
  const { restaurantMenuInfo } = props;
  const { name, phone, address, locationUrl, description, menu } =
    restaurantMenuInfo;

  return (
    <div className={classes.headingContainer}>
      <div className={classes.headerIndent}>
        <div className={classes.rowIndent}>
          <Typography
            variant="subtitle1"
            component="h2"
            className={classes.typographyHeader}
          >
            {phone}
          </Typography>
          <PhoneEnabledIcon sx={{ color: "secondary.main" }} />
        </div>
        <div className={classes.rowIndent}>
          <Typography
            variant="subtitle2"
            component="h2"
            className={classes.typographyHeader}
          >
            {address}
          </Typography>
          <Link href={locationUrl}>
            <a target="_blank">
              <PlaceIcon sx={{ color: "secondary.main" }} />
            </a>
          </Link>
        </div>
        <Typography variant="h3" component="h1">
          {name}
        </Typography>
        <Typography variant="subtitle2" component="h2">
          {description}
        </Typography>
      </div>
      <div className = {classes.accordion}>
        {menu.map((item) => (
          <Accordion>
            <AccordionSummaryStyled>
              <Typography>{item.name}</Typography>
            </AccordionSummaryStyled>
            <AccordionDetails>
              <DishesComponent items={item.items} />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
